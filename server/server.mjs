// TypeWords 自建服务端:托管静态网站 + 多孩子档案同步 + AI 加词代理
// 零依赖,Node 18+ 即可运行。
import http from 'node:http'
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const PORT = Number(process.env.PORT || 3000)
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data')
const STATIC_DIR = process.env.STATIC_DIR || path.join(__dirname, '..', '.output', 'public')
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || ''
const AI_BASE_URL = (process.env.AI_BASE_URL || '').replace(/\/+$/, '')
const AI_API_KEY = process.env.AI_API_KEY || ''
const AI_MODEL = process.env.AI_MODEL || ''
const MAX_BODY = Number(process.env.MAX_BODY_MB || 50) * 1024 * 1024
const SYNC_TYPES = ['dict', 'setting', 'practice_word', 'practice_article']
const SERVER_VERSION = process.env.APP_VERSION || 'dev'

const PROFILES_FILE = path.join(DATA_DIR, 'profiles.json')
const PROFILE_DIR = path.join(DATA_DIR, 'profiles')

// ---------- 工具 ----------
class HttpError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

function sendJson(res, status, body) {
  const s = JSON.stringify(body)
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(s),
    'Cache-Control': 'no-store',
  })
  res.end(s)
}

async function readJson(req) {
  const chunks = []
  let size = 0
  for await (const c of req) {
    size += c.length
    if (size > MAX_BODY) throw new HttpError(413, '请求体过大')
    chunks.push(c)
  }
  if (!size) return {}
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch {
    throw new HttpError(400, '请求不是合法 JSON')
  }
}

function safeEqual(a, b) {
  const x = Buffer.from(String(a))
  const y = Buffer.from(String(b))
  return x.length === y.length && crypto.timingSafeEqual(x, y)
}

// ---------- 档案 ----------
let profiles = []

async function loadProfiles() {
  await fsp.mkdir(PROFILE_DIR, { recursive: true })
  try {
    profiles = JSON.parse(await fsp.readFile(PROFILES_FILE, 'utf8'))
  } catch {
    profiles = []
  }
}

async function saveProfiles() {
  const tmp = PROFILES_FILE + '.tmp'
  await fsp.writeFile(tmp, JSON.stringify(profiles, null, 2))
  await fsp.rename(tmp, PROFILES_FILE)
}

function getProfile(req) {
  const h = req.headers['authorization'] || ''
  const key = h.startsWith('Bearer ') ? h.slice(7).trim() : ''
  if (!key) throw new HttpError(401, '缺少档案密钥')
  const p = profiles.find(v => safeEqual(v.key, key))
  if (!p) throw new HttpError(401, '档案密钥无效')
  return p
}

function requireAdmin(req) {
  if (!ADMIN_TOKEN) throw new HttpError(503, '未设置 ADMIN_TOKEN,管理功能已关闭')
  const t = req.headers['x-admin-token'] || ''
  if (!safeEqual(t, ADMIN_TOKEN)) throw new HttpError(401, '管理口令错误')
}

// ---------- 同步存储(每个档案每种数据一个文件) ----------
function dataFile(profile, type) {
  if (!SYNC_TYPES.includes(type)) throw new HttpError(400, '未知数据类型: ' + type)
  return path.join(PROFILE_DIR, profile.id, type + '.json')
}

async function readRow(profile, type) {
  try {
    return JSON.parse(await fsp.readFile(dataFile(profile, type), 'utf8'))
  } catch (e) {
    if (e instanceof HttpError) throw e
    return null
  }
}

async function writeRow(profile, row) {
  const f = dataFile(profile, row.type)
  await fsp.mkdir(path.dirname(f), { recursive: true })
  const tmp = f + '.tmp'
  await fsp.writeFile(tmp, JSON.stringify(row))
  await fsp.rename(tmp, f)
}

// 同一档案的写入串行化,避免两台设备同时写同一个文件
const locks = new Map()
function withLock(id, fn) {
  const prev = locks.get(id) || Promise.resolve()
  const next = prev.then(fn, fn)
  locks.set(id, next.catch(() => {}))
  return next
}

async function handleSelect(profile, body) {
  const types = Array.isArray(body.types) && body.types.length ? body.types : SYNC_TYPES
  const withData = body.withData !== false
  const rows = []
  for (const type of types) {
    const r = await readRow(profile, type)
    if (!r) continue
    if (body.notNullVersion && r.data_version == null) continue
    rows.push(
      withData
        ? r
        : { type: r.type, updated_at: r.updated_at, data_version: r.data_version }
    )
  }
  return { data: rows }
}

async function handleUpsert(profile, body, insertOnly) {
  const rows = Array.isArray(body.rows) ? body.rows : []
  return withLock(profile.id, async () => {
    for (const r of rows) {
      if (!r || typeof r.type !== 'string') throw new HttpError(400, '缺少 type')
      if (insertOnly && (await readRow(profile, r.type))) continue
      await writeRow(profile, {
        type: r.type,
        data: r.data ?? null,
        data_version: r.data_version ?? null,
        updated_at: r.updated_at ?? null,
      })
    }
    return { ok: true }
  })
}

// ---------- AI 代理 ----------
const aiHits = new Map() // key -> [timestamps]
function aiRateLimit(profile) {
  const now = Date.now()
  const list = (aiHits.get(profile.id) || []).filter(t => now - t < 60_000)
  if (list.length >= 12) throw new HttpError(429, '请求太频繁,请一分钟后再试')
  list.push(now)
  aiHits.set(profile.id, list)
}

async function callAI(system, user) {
  if (!AI_BASE_URL || !AI_API_KEY || !AI_MODEL) {
    throw new HttpError(503, '服务器未配置 AI(AI_BASE_URL / AI_API_KEY / AI_MODEL)')
  }
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), 180_000)
  let resp
  try {
    resp = await fetch(AI_BASE_URL + '/chat/completions', {
      method: 'POST',
      signal: ctrl.signal,
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + AI_API_KEY },
      body: JSON.stringify({
        model: AI_MODEL,
        temperature: 0.7,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
      }),
    })
  } catch (e) {
    throw new HttpError(502, 'AI 请求失败:' + (e?.name === 'AbortError' ? '超时' : e?.message))
  } finally {
    clearTimeout(timer)
  }
  const text = await resp.text()
  if (!resp.ok) throw new HttpError(502, `AI 返回 ${resp.status}:${text.slice(0, 200)}`)
  let content = ''
  try {
    content = JSON.parse(text)?.choices?.[0]?.message?.content ?? ''
  } catch {
    throw new HttpError(502, 'AI 返回内容无法解析')
  }
  return extractJson(content)
}

function extractJson(s) {
  s = String(s).replace(/```json|```/gi, '')
  const a = s.indexOf('{')
  const b = s.lastIndexOf('}')
  if (a < 0 || b <= a) throw new HttpError(502, 'AI 没有返回 JSON,请重试')
  try {
    return JSON.parse(s.slice(a, b + 1))
  } catch {
    throw new HttpError(502, 'AI 返回的 JSON 不完整,请减少数量后重试')
  }
}

const str = v => (typeof v === 'string' ? v.trim() : '')

const WORD_SYSTEM = `你是资深中小学英语老师,为中国学生制作单词卡。只输出 JSON,不要任何解释。
格式:{"words":[{"word":"apple","phonetic0":"英式音标(不含斜杠)","phonetic1":"美式音标(不含斜杠)","trans":[{"pos":"n.","cn":"苹果"}],"sentences":[{"c":"英文例句","cn":"中文翻译"}],"phrases":[{"c":"短语","cn":"中文"}]}]}
要求:释义简洁准确;例句贴合学生水平、1~2句;phrases 没有合适的可为空数组;单词用原形。`

const ARTICLE_SYSTEM = `你是资深中小学英语老师,为中国学生编写练习用英文材料。只输出 JSON,不要任何解释。
格式:{"articles":[{"title":"英文标题","titleTranslate":"中文标题","text":"英文正文","textTranslate":"中文翻译"}]}
排版硬性要求:text 和 textTranslate 都是「一句一行」,句与句之间用 \\n 分隔,自然段之间空一行(\\n\\n);textTranslate 的行数、段数必须与 text 完全一一对应。`

async function aiWords(body) {
  const topic = str(body.topic)
  const text = str(body.text).slice(0, 6000)
  const count = Math.min(Math.max(parseInt(body.count) || 20, 1), 40)
  const level = str(body.level) || '小学中高年级'
  let user
  if (text) {
    user = `下面是老师给的单词或文章,请把其中需要学习的英文单词整理成单词卡(最多${count}个;若本身是单词列表则全部制作,保持原顺序)。学生水平:${level}。\n---\n${text}`
  } else if (topic) {
    user = `请围绕「${topic}」生成${count}个适合学习的英文单词,学生水平:${level}。`
  } else {
    throw new HttpError(400, '请填写主题,或粘贴单词/文章')
  }
  const r = await callAI(WORD_SYSTEM, user)
  const list = Array.isArray(r.words) ? r.words : []
  const words = list
    .map(w => ({
      word: str(w.word),
      phonetic0: str(w.phonetic0),
      phonetic1: str(w.phonetic1),
      trans: (Array.isArray(w.trans) ? w.trans : [])
        .map(t => ({ pos: str(t.pos), cn: str(t.cn) }))
        .filter(t => t.cn),
      sentences: (Array.isArray(w.sentences) ? w.sentences : [])
        .map(t => ({ c: str(t.c), cn: str(t.cn) }))
        .filter(t => t.c),
      phrases: (Array.isArray(w.phrases) ? w.phrases : [])
        .map(t => ({ c: str(t.c), cn: str(t.cn) }))
        .filter(t => t.c),
    }))
    .filter(w => w.word)
  if (!words.length) throw new HttpError(502, 'AI 没有生成有效单词,请换个说法重试')
  return { words }
}

async function aiArticles(body) {
  const topic = str(body.topic)
  const text = str(body.text).slice(0, 8000)
  const style = body.style === 'sentences' ? 'sentences' : 'passage'
  const count = Math.min(Math.max(parseInt(body.count) || (style === 'sentences' ? 10 : 1), 1), 20)
  const level = str(body.level) || '小学中高年级'
  let user
  if (text) {
    user = `下面是一段英文,请保持原文用词完全不变,只按「一句一行、自然段空一行」重新排版为 text,并给出逐句对应的中文翻译 textTranslate,标题自拟。只生成 1 篇。\n---\n${text}`
  } else if (topic) {
    user =
      style === 'sentences'
        ? `请围绕「${topic}」写 ${count} 个互相独立的英文句子(用于逐句打字练习),全部放进 1 篇里,每句一行,不分段。学生水平:${level}。`
        : `请围绕「${topic}」写 ${count} 篇短文,每篇 5~10 句,适合学生水平:${level}。`
  } else {
    throw new HttpError(400, '请填写主题,或粘贴英文')
  }
  const r = await callAI(ARTICLE_SYSTEM, user)
  const list = Array.isArray(r.articles) ? r.articles : []
  const articles = list
    .map(a => ({
      title: str(a.title),
      titleTranslate: str(a.titleTranslate),
      text: str(a.text),
      textTranslate: str(a.textTranslate),
    }))
    .filter(a => a.text)
  if (!articles.length) throw new HttpError(502, 'AI 没有生成有效内容,请重试')
  return { articles }
}

// ---------- 静态文件 ----------
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.map': 'application/json',
}

async function statFile(p) {
  try {
    const s = await fsp.stat(p)
    return s.isFile() ? s : null
  } catch {
    return null
  }
}

async function serveStatic(req, res, pathname) {
  let rel
  try {
    rel = decodeURIComponent(pathname)
  } catch {
    throw new HttpError(400, '路径错误')
  }
  const root = path.resolve(STATIC_DIR)
  const candidates = [rel, rel.replace(/\/$/, '') + '.html', path.posix.join(rel, 'index.html')]
  for (const c of candidates) {
    const full = path.resolve(root, '.' + path.posix.normalize('/' + c))
    if (!full.startsWith(root)) continue
    const st = await statFile(full)
    if (st) return sendFile(req, res, full, st)
  }
  // SPA 回退
  for (const name of ['200.html', 'index.html']) {
    const full = path.join(root, name)
    const st = await statFile(full)
    if (st) return sendFile(req, res, full, st, true)
  }
  throw new HttpError(404, '未找到页面(是否已构建前端?)')
}

function sendFile(req, res, full, st, fallback = false) {
  const ext = path.extname(full).toLowerCase()
  const headers = {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    'Content-Length': st.size,
    'Cache-Control':
      ext === '.html' || fallback
        ? 'no-cache'
        : /[\\/]_nuxt[\\/]/.test(full)
          ? 'public, max-age=31536000, immutable'
          : 'public, max-age=3600',
  }
  res.writeHead(200, headers)
  if (req.method === 'HEAD') return res.end()
  fs.createReadStream(full).pipe(res)
}

// ---------- 路由 ----------
async function route(req, res) {
  const url = new URL(req.url, 'http://x')
  const p = url.pathname

  if (p === '/api/health') {
    return sendJson(res, 200, {
      ok: true,
      version: SERVER_VERSION,
      ai: Boolean(AI_BASE_URL && AI_API_KEY && AI_MODEL),
      admin: Boolean(ADMIN_TOKEN),
    })
  }

  if (p.startsWith('/api/')) {
    if (p === '/api/me' && req.method === 'GET') {
      const pr = getProfile(req)
      return sendJson(res, 200, { id: pr.id, name: pr.name })
    }
    if (p === '/api/sync/select' && req.method === 'POST') {
      const pr = getProfile(req)
      return sendJson(res, 200, await handleSelect(pr, await readJson(req)))
    }
    if (p === '/api/sync/upsert' && req.method === 'POST') {
      const pr = getProfile(req)
      return sendJson(res, 200, await handleUpsert(pr, await readJson(req), false))
    }
    if (p === '/api/sync/insert' && req.method === 'POST') {
      const pr = getProfile(req)
      return sendJson(res, 200, await handleUpsert(pr, await readJson(req), true))
    }
    if (p === '/api/ai/words' && req.method === 'POST') {
      const pr = getProfile(req)
      aiRateLimit(pr)
      return sendJson(res, 200, await aiWords(await readJson(req)))
    }
    if (p === '/api/ai/articles' && req.method === 'POST') {
      const pr = getProfile(req)
      aiRateLimit(pr)
      return sendJson(res, 200, await aiArticles(await readJson(req)))
    }

    if (p === '/api/admin/profiles') {
      requireAdmin(req)
      if (req.method === 'GET') {
        return sendJson(res, 200, { profiles })
      }
      if (req.method === 'POST') {
        const body = await readJson(req)
        const name = str(body.name).slice(0, 30)
        if (!name) throw new HttpError(400, '请填写名字')
        const pr = {
          id: crypto.randomBytes(6).toString('hex'),
          name,
          key: 'tw_' + crypto.randomBytes(16).toString('hex'),
          createdAt: new Date().toISOString(),
        }
        profiles.push(pr)
        await saveProfiles()
        return sendJson(res, 200, { profile: pr })
      }
    }
    const m = p.match(/^\/api\/admin\/profiles\/([0-9a-f]+)$/)
    if (m) {
      requireAdmin(req)
      const pr = profiles.find(v => v.id === m[1])
      if (!pr) throw new HttpError(404, '档案不存在')
      if (req.method === 'DELETE') {
        profiles = profiles.filter(v => v.id !== pr.id)
        await saveProfiles()
        // 数据保留在磁盘 profiles/<id>/ 下,避免误删;确认不要了可手动删除目录
        return sendJson(res, 200, { ok: true })
      }
      if (req.method === 'PATCH') {
        const body = await readJson(req)
        if (body.rotateKey) pr.key = 'tw_' + crypto.randomBytes(16).toString('hex')
        if (str(body.name)) pr.name = str(body.name).slice(0, 30)
        await saveProfiles()
        return sendJson(res, 200, { profile: pr })
      }
    }
    throw new HttpError(404, '接口不存在')
  }

  if (p === '/admin' || p === '/admin/') {
    const html = await fsp.readFile(path.join(__dirname, 'admin.html'))
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' })
    return res.end(html)
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') throw new HttpError(405, '不支持的方法')
  return serveStatic(req, res, p)
}

const server = http.createServer((req, res) => {
  route(req, res).catch(e => {
    const status = e instanceof HttpError ? e.status : 500
    if (status === 500) console.error(e)
    if (res.headersSent) return res.end()
    sendJson(res, status, { error: { message: e.message || '服务器错误' } })
  })
})
server.requestTimeout = 300_000

await loadProfiles()
server.listen(PORT, () => {
  console.log(`TypeWords server listening on :${PORT}  data=${DATA_DIR}  static=${STATIC_DIR}`)
  if (!ADMIN_TOKEN) console.log('提示:未设置 ADMIN_TOKEN,无法创建孩子档案')
})
