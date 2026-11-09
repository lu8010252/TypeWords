// 构建时补充词库 / 课文库：
// 1) 官方词库：人教版小学三年级起点 8 册、新概念英语 1~4 册
// 2) 官方文章：新概念英语 1~4 册（完整版，替换仓库里被截断的 NCE_1）
// 3) 自建文章：人教版 PEP 三年级起点 8 册的课文句子（见 scripts/data/pep-articles.mjs）
// 4) 自建词库：新概念英语青少版全套（入门级~5B）+ 人教版 PEP 三起 3~6 年级（见 scripts/data/vocab/，
//    由 scripts/tools/xlsx_to_vocab.py 从 lilinji/English 的 Excel 转换，CC BY-NC-SA 4.0，仅限非商业）
// 注意：音标只补充缺失项，绝不覆盖已有音标。
import fs from 'node:fs/promises'
import path from 'node:path'
import { pepArticleBooks } from './data/pep-articles.mjs'
import { phoneticFallback } from './data/phonetics.mjs'

const BASE = process.env.DICT_SOURCE || 'https://files.typewords.cc'
const ROOT = path.resolve(import.meta.dirname, '..')
const WORD_LIST = path.join(ROOT, 'public/list/word.json')
const ARTICLE_LIST = path.join(ROOT, 'public/list/article.json')
const RECOMMEND_WORD_LIST = path.join(ROOT, 'public/list/recommend_word.json')
const WORD_DIR = path.join(ROOT, 'public/dicts/en/word')
const ARTICLE_DIR = path.join(ROOT, 'public/dicts/en/article')

const PEP_3 = /^PEPXiaoXue\d_\d_T\.json$/ // 三年级起点
const NCE_WORD = /^nce-new-\d\.json$/ // 新概念英语 1~4 词库
const NCE_ARTICLE = /^NCE_\d\.json$/

async function getJson(url) {
  for (let i = 1; i <= 3; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(60_000) })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return await res.json()
    } catch (e) {
      if (i === 3) throw new Error(`下载失败 ${url}: ${e.message}`)
      await new Promise(r => setTimeout(r, i * 2000))
    }
  }
}

async function readJson(file) {
  return JSON.parse(await fs.readFile(file, 'utf8'))
}

function upsert(list, entry) {
  const i = list.findIndex(v => v.url === entry.url)
  if (i >= 0) list[i] = { ...list[i], ...entry }
  else list.push(entry)
}

// ---------- 1. 官方词库 ----------
const remoteWordList = await getJson(`${BASE}/list/word.json`)
const extraBooks = remoteWordList.filter(
  d => PEP_3.test(String(d.url)) || NCE_WORD.test(String(d.url))
)
if (!extraBooks.length) throw new Error('官方词库列表中未找到任何需要补充的词库')

const wordList = await readJson(WORD_LIST)
await fs.mkdir(WORD_DIR, { recursive: true })

const downloaded = []
for (const book of extraBooks) {
  const entry = {
    ...book,
    enName: book.enName || String(book.id),
    type: 'word',
    version: book.version || 1,
    hidden: false,
  }
  const words = await getJson(`${BASE}/dicts/en/word/${book.url}`)
  if (!Array.isArray(words) || !words.length) throw new Error(`词库为空：${book.url}`)
  entry.length = words.length
  downloaded.push({ entry, words })
  console.log(`[word] ${entry.name}(${entry.url}) ${words.length} 词`)
}

// 音标索引：用所有已下载词库 + 本地已有词库，给缺失音标的词条补充音标
const phoneticIndex = new Map()
for (const { words } of downloaded) {
  for (const w of words) {
    const k = String(w.word || '').trim().toLowerCase()
    if (!k || phoneticIndex.has(k)) continue
    if (w.phonetic0 || w.phonetic1) phoneticIndex.set(k, { a: w.phonetic0 || w.phonetic1, b: w.phonetic1 || w.phonetic0 })
  }
}
try {
  const localFiles = await fs.readdir(WORD_DIR)
  for (const f of localFiles.filter(v => v.endsWith('.json'))) {
    const words = await readJson(path.join(WORD_DIR, f))
    for (const w of words) {
      const k = String(w.word || '').trim().toLowerCase()
      if (!k || phoneticIndex.has(k)) continue
      if (w.phonetic0 || w.phonetic1) phoneticIndex.set(k, { a: w.phonetic0 || w.phonetic1, b: w.phonetic1 || w.phonetic0 })
    }
  }
} catch {
  // 本地目录为空时忽略
}

const fallbackIndex = new Map(Object.entries(phoneticFallback).map(([k, v]) => [k, { a: v[0], b: v[1] }]))
function lookupPhonetic(word) {
  const k = String(word || '').trim().toLowerCase()
  if (!k) return null
  return phoneticIndex.get(k) || fallbackIndex.get(k) || null
}

let phoneticFixed = 0
function fillPhonetics(words) {
  let n = 0
  for (const w of words) {
    if (w.phonetic0 && w.phonetic1) continue // 已有音标，绝不覆盖
    let hit = lookupPhonetic(w.word)
    if (!hit) {
      // 短语：逐词查音标后拼接（如 teacher's desk / go to bed）
      const tokens = String(w.word || '')
        .toLowerCase()
        .replace(/[.,!?;:]/g, '')
        .split(/\s+/)
        .filter(Boolean)
      if (tokens.length > 1) {
        const uk = []
        const us = []
        let ok = true
        for (const t of tokens) {
          const h = lookupPhonetic(t.replace(/'s$/, ''))
          if (!h) {
            ok = false
            break
          }
          uk.push(h.a)
          us.push(h.b)
        }
        if (ok) hit = { a: uk.join(' '), b: us.join(' ') }
      }
    }
    if (hit) {
      if (!w.phonetic0) (w.phonetic0 = hit.a), n++
      if (!w.phonetic1) (w.phonetic1 = hit.b), n++
    } else if (w.phonetic0 || w.phonetic1) {
      if (!w.phonetic0) (w.phonetic0 = w.phonetic1), n++
      if (!w.phonetic1) (w.phonetic1 = w.phonetic0), n++
    }
  }
  phoneticFixed += n
}

// 官方词库（人教版 PEP / 新概念 1~4）只作为「音标、例句、短语、近义词、词源」的补充来源，
// 不再作为词典发布到网站里（词典全部用 scripts/data/vocab 的自建词表）。
for (const { words } of downloaded) fillPhonetics(words)

// ---------- 2. 官方文章（新概念英语 1~4） ----------
const remoteArticleList = await getJson(`${BASE}/list/article.json`)
const nceArticles = remoteArticleList.filter(d => NCE_ARTICLE.test(String(d.url)))
const articleList = await readJson(ARTICLE_LIST)
await fs.mkdir(ARTICLE_DIR, { recursive: true })

for (const book of nceArticles) {
  const entry = { ...book, type: 'article', hidden: false }
  const articles = await getJson(`${BASE}/dicts/en/article/${book.url}`)
  if (!Array.isArray(articles) || !articles.length) throw new Error(`文章库为空：${book.url}`)
  entry.length = articles.length
  await fs.writeFile(path.join(ARTICLE_DIR, book.url), JSON.stringify(articles))
  upsert(articleList, entry)
  console.log(`[article] ${entry.name}(${entry.url}) ${articles.length} 篇`)
}

// ---------- 3. 自建 PEP 课文句子 ----------
let articleId = 300
for (const book of pepArticleBooks) {
  const articles = book.units.map(unit => ({
    id: articleId++,
    title: unit.title,
    titleTranslate: unit.cn,
    text: unit.lines.map(v => v[0]).join('\n\n'),
    textTranslate: unit.lines.map(v => v[1]).join('\n\n'),
    audioSrc: '',
    lrcPosition: [],
    question: null,
    nameList: null,
    quote: null,
    userId: null,
  }))
  await fs.writeFile(path.join(ARTICLE_DIR, book.url), JSON.stringify(articles))
  upsert(articleList, {
    id: articleId - articles.length, // 仅作占位，真实 id 见上方递增
    enName: book.enName,
    name: book.name,
    description: book.description,
    categoryId: 4,
    url: book.url,
    length: articles.length,
    language: 'en',
    translateLanguage: 'zh_CN',
    version: 1,
    type: 'article',
    isDefault: false,
    recommended: true,
    userId: '00000000-0000-0000-0000-000000000001',
    createdAt: '2026-11-08 00:00:00.000000',
    updatedAt: '2026-11-08 00:00:00.000000',
    cover: null,
    hidden: false,
    category: '文章学习',
    tags: ['人教版'],
  })
  console.log(`[article] ${book.name}(${book.url}) ${articles.length} 篇`)
}

// ---------- 4. 自建词库：新概念青少版全套 + 人教版 PEP 三起 ----------
// 词表来自 scripts/data/vocab/*.json；1A/1B 原有的手写例句保留在 examples.json 里。
// 用已下载的官方词库补充例句/短语/近义词/同根词/词源，自带的释义始终排在最前，官方数据只做追加。
const VOCAB_DIR = path.join(ROOT, 'scripts/data/vocab')
const examples = await readJson(path.join(VOCAB_DIR, 'examples.json'))
const pepRef = downloaded.find(d => PEP_3.test(String(d.entry.url)))?.entry
const manifest = await readJson(path.join(VOCAB_DIR, 'index.json'))
const KIND_META = {
  ncej: { category: '青少年英语', categoryId: 3 },
  textbook: { category: pepRef?.category || '小学英语', categoryId: pepRef?.categoryId ?? 3 },
  other: { category: '青少年英语', categoryId: 3 },
}
// [json 文件名, 词典 id, 分类, categoryId, tags]
const OWN_BOOKS = manifest.map(m => [m.file, m.id, KIND_META[m.kind].category, KIND_META[m.kind].categoryId, [m.tag]])
const ownData = new Map()
for (const [stem] of OWN_BOOKS) ownData.set(stem, await readJson(path.join(VOCAB_DIR, `${stem}.json`)))

// 自建词表本身也加入音标索引，让缺音标的短语能用同表里的单词拼出来
for (const { words } of ownData.values()) {
  for (const w of words) {
    const k = w.word.trim().toLowerCase()
    if (!k || phoneticIndex.has(k)) continue
    if (w.phonetic0 || w.phonetic1) phoneticIndex.set(k, { a: w.phonetic0 || w.phonetic1, b: w.phonetic1 || w.phonetic0 })
  }
}

const officialIndex = new Map()
for (const { words } of downloaded) {
  for (const w of words) {
    const k = String(w.word || '').trim().toLowerCase()
    if (k && !officialIndex.has(k)) officialIndex.set(k, w)
  }
}
let enrichedCount = 0
function mergeOfficial(entry) {
  const off = officialIndex.get(entry.word.trim().toLowerCase())
  if (!off) return
  enrichedCount++
  for (const s of off.sentences || []) {
    if (entry.sentences.length >= 3) break
    if (s?.c && !entry.sentences.some(x => x.c === s.c)) entry.sentences.push({ c: s.c, cn: s.cn || '' })
  }
  if (Array.isArray(off.phrases) && off.phrases.length) entry.phrases = off.phrases.slice(0, 6)
  if (Array.isArray(off.synos) && off.synos.length) entry.synos = off.synos.slice(0, 4)
  if (off.relWords && Array.isArray(off.relWords.rels) && off.relWords.rels.length) entry.relWords = off.relWords
  if (Array.isArray(off.etymology) && off.etymology.length) entry.etymology = off.etymology.slice(0, 2)
}

let wordId = 50000
for (const [stem, dictId, category, categoryId, tags] of OWN_BOOKS) {
  const src = ownData.get(stem)
  const url = `${stem}.json`
  const words = src.words.map(w => {
    const ex = stem.startsWith('NCEJ') ? examples[w.word.toLowerCase()] : null
    const entry = {
      id: wordId++,
      word: w.word,
      phonetic0: w.phonetic0,
      phonetic1: w.phonetic1,
      trans: w.trans,
      sentences: ex ? [{ c: ex[0], cn: ex[1] }] : [],
      phrases: [],
      synos: [],
      relWords: { root: '', rels: [] },
      etymology: [],
    }
    mergeOfficial(entry)
    return entry
  })
  fillPhonetics(words)
  await fs.writeFile(path.join(WORD_DIR, url), JSON.stringify(words))
  // 词典 id 若与官方词典冲突则顺延，避免网站里两本词典共用一个 id
  let finalId = dictId
  while (wordList.some(d => d.id === finalId && d.url !== url)) finalId += 1000
  upsert(wordList, {
    id: finalId,
    enName: src.enName,
    name: src.name,
    description: `${src.name}，共 ${words.length} 词：音标、中文释义（词表整理自 lilinji/English，CC BY-NC-SA 4.0）`,
    categoryId,
    url,
    length: words.length,
    language: 'en',
    translateLanguage: 'zh_CN',
    version: 2,
    type: 'word',
    isDefault: false,
    recommended: true,
    userId: '00000000-0000-0000-0000-000000000001',
    createdAt: '2026-11-08 00:00:00.000000',
    updatedAt: '2026-11-09 00:00:00.000000',
    cover: null,
    hidden: false,
    category,
    tags,
  })
  console.log(`[word] ${src.name}(${url}) ${words.length} 词`)
}

// ---------- 5. 音标发音音频 ----------
const PHONETIC_SOUND_DIR = path.join(ROOT, 'public/sound/phonetics')
try {
  await fs.mkdir(PHONETIC_SOUND_DIR, { recursive: true })
  const phoneticsSource = await fs.readFile(path.join(ROOT, 'app/core/data/phonetics.ts'), 'utf8')
  const ids = [...phoneticsSource.matchAll(/"audioSrc": "\/sound\/phonetics\/([^"]+)\.mp3"/g)].map(m => m[1])
  let downloadedCount = 0
  for (const id of ids) {
    const target = path.join(PHONETIC_SOUND_DIR, `${id}.mp3`)
    try {
      await fs.access(target)
      continue
    } catch {
      // 文件不存在，继续下载
    }
    for (let i = 1; i <= 3; i++) {
      try {
        const res = await fetch(`${BASE}/sound/phonetics/${id}.mp3`, { signal: AbortSignal.timeout(30_000) })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const buf = Buffer.from(await res.arrayBuffer())
        if (buf.length < 5000) throw new Error('文件内容过小')
        await fs.writeFile(target, buf)
        downloadedCount++
        break
      } catch (e) {
        if (i === 3) console.warn(`[phonetics] 跳过 ${id}: ${e.message}`)
        else await new Promise(r => setTimeout(r, i * 1500))
      }
    }
  }
  console.log(`[phonetics] 音频 ${ids.length} 个，本次下载 ${downloadedCount} 个`)
} catch (e) {
  // 音频下载失败不应阻断整个构建
  console.warn(`[phonetics] 音频处理失败: ${e.message}`)
}

// 首页「推荐」位：人教版 PEP 三起 8 册
const recommendWords = wordList.filter(d => /^PEP3Q_/.test(String(d.url)))
await fs.writeFile(RECOMMEND_WORD_LIST, JSON.stringify(recommendWords, null, 2) + '\n')
await fs.writeFile(WORD_LIST, JSON.stringify(wordList, null, 2) + '\n')
await fs.writeFile(ARTICLE_LIST, JSON.stringify(articleList, null, 2) + '\n')
console.log(`[ncej] 用官方词库补充了 ${enrichedCount} 个词条`)
console.log(`[done] 词库 ${wordList.length} 本，文章库 ${articleList.length} 本，补充音标 ${phoneticFixed} 处`)