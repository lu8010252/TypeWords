// 构建时补充人教版 PEP 小学（三年级起点）词库：三年级上 ~ 六年级下
// 词库数据来自 TypeWords 官方资源站，仅下载对应词库文件并在 /list/word.json 里注册书目。
import fs from 'node:fs/promises'
import path from 'node:path'

const BASE = process.env.DICT_SOURCE || 'https://files.typewords.cc'
const ROOT = path.resolve(import.meta.dirname, '..')
const LIST_FILE = path.join(ROOT, 'public/list/word.json')
const WORD_DIR = path.join(ROOT, 'public/dicts/en/word')
// 人教版 PEP 三起小学词库命名：PEPXiaoXue3_1_T.json ~ PEPXiaoXue6_2_T.json
const PEP_URL = /^PEPXiaoXue\d_\d_T\.json$/

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

const remote = await getJson(`${BASE}/list/word.json`)
const books = remote.filter(d => PEP_URL.test(String(d.url || '')))
if (!books.length) throw new Error('官方词库列表中未找到人教版 PEP 小学词库')

const local = JSON.parse(await fs.readFile(LIST_FILE, 'utf8'))
await fs.mkdir(WORD_DIR, { recursive: true })

for (const book of books) {
  const entry = {
    ...book,
    enName: book.enName || book.id,
    type: 'word',
    version: book.version || 1,
    hidden: false,
  }
  const words = await getJson(`${BASE}/dicts/en/word/${book.url}`)
  await fs.writeFile(path.join(WORD_DIR, book.url), JSON.stringify(words))
  const i = local.findIndex(v => v.url === entry.url)
  if (i >= 0) local[i] = { ...local[i], ...entry }
  else local.push(entry)
  console.log(`[dicts] ${entry.name}(${book.url}) ${words.length} 词`)
}

await fs.writeFile(LIST_FILE, JSON.stringify(local, null, 2) + '\n')
