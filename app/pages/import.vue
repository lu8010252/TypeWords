<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { BaseButton, BasePage, Toast, UploadButton } from '@/base'
import Book from '@/components/Book.vue'
import { LIB_JS_URL } from '@/core/config/env.ts'
import { useBaseStore } from '@/core/stores/base.ts'
import { useRuntimeStore } from '@/core/stores/runtime.ts'
import { DictType, getDefaultArticle, getDefaultDict, getDefaultWord } from '@/core/types'
import type { Dict, Word } from '@/core/types'
import { cloneDeep, convertToWord, ensureCustomDictCopy, loadJsLib } from '@/core/utils'
import { nanoid } from 'nanoid'

type ImportType = 'word' | 'article'
type ArticleInput = { title: string; text: string; textTranslate: string }
type ImportResult = { added: number; skipped: number; type: ImportType }

const route = useRoute()
const router = useRouter()
const base = useBaseStore()
const runtimeStore = useRuntimeStore()

const importType = computed<ImportType>(() => (route.query.type === 'article' ? 'article' : 'word'))
const isWord = computed(() => importType.value === 'word')
const targetLabel = computed(() => (isWord.value ? '词典' : '书籍'))
const contentLabel = computed(() => (isWord.value ? '单词' : '句子'))
const source = computed(() => (isWord.value ? base.word : base.article))

const writableTargets = computed(() =>
  source.value.bookList.filter(item => (isWord.value ? item.custom || item.system : item.custom))
)
const readonlyTargets = computed(() =>
  source.value.bookList.filter(item => (isWord.value ? !(item.custom || item.system) : !item.custom))
)

const step = ref<1 | 2 | 3>(1)
const selectedId = ref('')
const showCreate = ref(false)
const newName = ref('')
const newDesc = ref('')
const busy = ref(false)
const result = ref<ImportResult | null>(null)

const target = computed<Dict | null>(
  () => source.value.bookList.find(item => String(item.id) === selectedId.value) ?? null
)
const targetCount = computed(() => {
  if (!target.value) return 0
  return isWord.value ? target.value.words.length : target.value.articles.length
})

watch(importType, () => {
  step.value = 1
  selectedId.value = ''
  showCreate.value = false
  result.value = null
  wordText.value = ''
  articleText.value = ''
  clearWordFile()
  clearCustomFile()
  clearArticleFile()
})

// ---------- 第 1 步：选择/新建目标 ----------

function hasTargetName(name: string) {
  return source.value.bookList.some(item => item.name === name)
}

function uniqueTargetName(name: string) {
  if (!hasTargetName(name)) return name
  let index = 2
  while (hasTargetName(`${name} ${index}`)) index++
  return `${name} ${index}`
}

function selectTarget(item: Dict) {
  selectedId.value = String(item.id)
  result.value = null
  step.value = 2
}

function createTarget() {
  const name = newName.value.trim()
  if (!name) return Toast.error(`请填写${targetLabel.value}名称`)
  if (hasTargetName(name)) return Toast.error(`已存在同名${targetLabel.value}，请换个名字或直接选择它`)

  const data = getDefaultDict({
    name,
    description: newDesc.value.trim(),
    id: (isWord.value ? 'custom-dict-' : 'custom-book-') + nanoid(8),
    custom: true,
    type: isWord.value ? DictType.word : DictType.article,
    length: 0,
  })
  source.value.bookList.push(cloneDeep(data))

  selectedId.value = String(data.id)
  result.value = null
  showCreate.value = false
  newName.value = ''
  newDesc.value = ''
  step.value = 2
  Toast.success(`已创建${targetLabel.value}「${name}」`)
}

function createCopy(item: Dict) {
  const copy = ensureCustomDictCopy(item)
  copy.name = uniqueTargetName(`${item.name} (副本)`)
  copy.length = isWord.value ? copy.words.length : copy.articles.length
  source.value.bookList.push(cloneDeep(copy))
  selectedId.value = String(copy.id)
  result.value = null
  step.value = 2
  Toast.success(`已创建副本「${copy.name}」`)
}

function backToStep1() {
  step.value = 1
}

// ---------- 通用追加 ----------

function appendWords(words: Word[]) {
  const dict = target.value
  if (!dict) return { added: 0, skipped: 0 }

  const exists = new Set(dict.words.map(item => item.word.toLowerCase()))
  let added = 0
  let skipped = 0

  for (const word of words) {
    const value = word.word.trim()
    if (!value) continue
    const key = value.toLowerCase()
    if (exists.has(key)) {
      skipped++
      continue
    }
    exists.add(key)
    dict.words.push(word)
    added++
  }
  dict.length = dict.words.length
  return { added, skipped }
}

function appendArticles(items: ArticleInput[]) {
  const book = target.value
  if (!book) return { added: 0, skipped: 0 }

  const exists = new Set(book.articles.map(item => item.title))
  let added = 0
  let skipped = 0

  for (const item of items) {
    const text = item.text.trim()
    if (!text) continue
    const title = item.title.trim() || titleFromEnglish(text)
    if (exists.has(title)) {
      skipped++
      continue
    }
    exists.add(title)
    book.articles.push(
      getDefaultArticle({ title, text, textTranslate: item.textTranslate.trim() })
    )
    added++
  }
  book.length = book.articles.length
  return { added, skipped }
}

function titleFromEnglish(text: string) {
  return Array.from(text).slice(0, 30).join('')
}

function finishImport(data: { added: number; skipped: number }) {
  if (!data.added) {
    Toast.warning(
      data.skipped ? `内容已存在于${targetLabel.value}中，已全部跳过` : '没有可导入的内容'
    )
    return
  }
  result.value = { ...data, type: importType.value }
  step.value = 3
  Toast.success(
    `成功导入 ${data.added} 个${contentLabel.value}${data.skipped ? `，跳过 ${data.skipped} 个已存在的` : ''}`
  )
}

// ---------- 第 2 步：单词 ----------

function normalizeWordLine(line: string) {
  let value = line.trim()
  value = value.replace(/^["“”']+/, '').replace(/["“”']+$/, '')
  value = value.replace(/[,，]+$/, '').trim()
  value = value.replace(/["“”]/g, '').trim()
  return value.replace(/[,，]+$/, '').trim()
}

const wordText = ref('')

const manualWords = computed(() => {
  const seen = new Set<string>()
  const list: string[] = []
  for (const line of wordText.value.split(/\r\n|\r|\n/)) {
    const word = normalizeWordLine(line)
    if (!word) continue
    const key = word.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    list.push(word)
  }
  return list
})

function submitManualWords() {
  if (!target.value) return Toast.warning(`请先选择${targetLabel.value}`)
  if (!manualWords.value.length) return Toast.warning('请输入要导入的单词')
  if (manualWords.value.length > 5000) return Toast.warning('单词数量超过 5000，请分批导入')
  finishImport(appendWords(manualWords.value.map(word => getDefaultWord({ word, custom: true }))))
}

const wordFile = ref<File | null>(null)
const wordFileName = ref('')
const customFile = ref<File | null>(null)
const customFileName = ref('')

function selectWordFile(e: any) {
  const file = e?.target?.files?.[0] as File | undefined
  wordFile.value = file ?? null
  wordFileName.value = file?.name ?? ''
}

function clearWordFile() {
  wordFile.value = null
  wordFileName.value = ''
}

function selectCustomFile(e: any) {
  const file = e?.target?.files?.[0] as File | undefined
  customFile.value = file ?? null
  customFileName.value = file?.name ?? ''
}

function clearCustomFile() {
  customFile.value = null
  customFileName.value = ''
}

async function importWordFile() {
  if (!target.value) return Toast.warning(`请先选择${targetLabel.value}`)
  if (!wordFile.value) return Toast.warning('请先选择文件')
  if (busy.value) return

  busy.value = true
  try {
    const words = dedupeWordStrings(await parseWordFile(wordFile.value))
    if (!words.length) return Toast.warning('文件中没有可导入的单词')
    if (words.length > 5000) return Toast.warning('单词数量超过 5000，请分批导入')
    finishImport(appendWords(words.map(word => getDefaultWord({ word, custom: true }))))
    clearWordFile()
  } catch (error: any) {
    Toast.error(error?.message || '导入失败')
  } finally {
    busy.value = false
  }
}

async function importCustomWordFile() {
  if (!target.value) return Toast.warning(`请先选择${targetLabel.value}`)
  if (!customFile.value) return Toast.warning('请先选择文件')
  if (busy.value) return

  busy.value = true
  try {
    const words = await parseCustomWordFile(customFile.value)
    if (!words.length) return Toast.warning('文件中没有可导入的单词')
    if (words.length > 5000) return Toast.warning('单词数量超过 5000，请分批导入')
    finishImport(appendWords(words))
    clearCustomFile()
  } catch (error: any) {
    Toast.error(error?.message || '导入失败')
  } finally {
    busy.value = false
  }
}

// ---------- 第 2 步：句子 ----------

const articleText = ref('')
const articleFile = ref<File | null>(null)
const articleFileName = ref('')

const manualArticles = computed<ArticleInput[]>(() => {
  const seen = new Set<string>()
  const list: ArticleInput[] = []
  for (const line of articleText.value.split(/\r\n|\r|\n/)) {
    const raw = line.trim()
    if (!raw) continue
    const [english, chinese = ''] = raw.split('|')
    const text = (english ?? '').trim()
    if (!text) continue
    const title = titleFromEnglish(text)
    if (seen.has(title)) continue
    seen.add(title)
    list.push({ title, text, textTranslate: chinese.trim() })
  }
  return list
})

function submitManualArticles() {
  if (!target.value) return Toast.warning(`请先选择${targetLabel.value}`)
  if (!manualArticles.value.length) return Toast.warning('请输入要导入的句子')
  finishImport(appendArticles(manualArticles.value))
}

function selectArticleFile(e: any) {
  const file = e?.target?.files?.[0] as File | undefined
  articleFile.value = file ?? null
  articleFileName.value = file?.name ?? ''
}

function clearArticleFile() {
  articleFile.value = null
  articleFileName.value = ''
}

async function importArticleFile() {
  if (!target.value) return Toast.warning(`请先选择${targetLabel.value}`)
  if (!articleFile.value) return Toast.warning('请先选择文件')
  if (busy.value) return

  busy.value = true
  try {
    const items = await parseArticleFile(articleFile.value)
    if (!items.length) return Toast.warning('文件中没有可导入的句子')
    finishImport(appendArticles(items))
    clearArticleFile()
  } catch (error: any) {
    Toast.error(error?.message || '导入失败')
  } finally {
    busy.value = false
  }
}

// ---------- 文件解析 ----------

function getFileExt(file: File) {
  return file.name.split('.').pop()?.toLowerCase() ?? ''
}

function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => resolve(String(e.target?.result ?? ''))
    reader.onerror = () => reject(new Error('读取文件失败'))
    reader.readAsText(file)
  })
}

function readFileAsBinary(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => resolve(String(e.target?.result ?? ''))
    reader.onerror = () => reject(new Error('读取文件失败'))
    reader.readAsBinaryString(file)
  })
}

async function readXlsxRows(file: File): Promise<Record<string, any>[]> {
  const XLSX = await loadJsLib('XLSX', LIB_JS_URL.XLSX)
  const data = await readFileAsBinary(file)
  const workbook = XLSX.read(data, { type: 'binary' })
  const sheetName = workbook.SheetNames[0]
  if (!sheetName) throw new Error('Excel 中没有工作表')
  return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
}

function pickField(row: Record<string, any>, ...keys: string[]) {
  for (const key of keys) {
    const value = row?.[key]
    if (value !== undefined && value !== null && String(value).trim()) {
      return String(value).trim()
    }
  }
  return ''
}

function dedupeWordStrings(words: string[]) {
  const seen = new Set<string>()
  const list: string[] = []
  for (const word of words) {
    const value = normalizeWordLine(word)
    if (!value) continue
    const key = value.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    list.push(value)
  }
  return list
}

async function parseWordFile(file: File): Promise<string[]> {
  const ext = getFileExt(file)

  if (ext === 'txt') {
    const content = await readFileAsText(file)
    return content.split(/\r\n|\r|\n/).map(normalizeWordLine).filter(Boolean)
  }

  if (ext === 'json') {
    let parsed: unknown
    try {
      parsed = JSON.parse(await readFileAsText(file))
    } catch {
      throw new Error('JSON 解析失败')
    }
    if (!Array.isArray(parsed)) throw new Error('JSON 格式错误：顶层必须是数组')
    return parsed
      .map(item => (typeof item === 'string' ? item : String((item as any)?.word ?? '')))
      .map(normalizeWordLine)
      .filter(Boolean)
  }

  if (ext === 'xlsx' || ext === 'xls') {
    const rows = await readXlsxRows(file)
    return rows.map(row => normalizeWordLine(pickField(row, '单词', 'word'))).filter(Boolean)
  }

  throw new Error(`不支持的文件格式「${ext}」，请使用 .txt / .json / .xlsx`)
}

async function parseCustomWordFile(file: File): Promise<Word[]> {
  const ext = getFileExt(file)
  if (ext !== 'xlsx' && ext !== 'xls') {
    throw new Error(`不支持的文件格式「${ext}」，请使用 .xlsx`)
  }

  const rows = await readXlsxRows(file)
  return rows
    .map(row => {
      const word = pickField(row, '单词', 'word')
      if (!word) return null
      return convertToWord({
        id: nanoid(6),
        word,
        phonetic0: pickField(row, '音标①', '音标1', 'phonetic0'),
        phonetic1: pickField(row, '音标②', '音标2', 'phonetic1'),
        trans: pickField(row, '翻译', 'trans'),
        sentences: pickField(row, '例句', 'sentences'),
        phrases: pickField(row, '短语', 'phrases'),
        synos: pickField(row, '近义词', 'synos'),
        relWords: pickField(row, '同根词', 'relWords'),
        etymology: pickField(row, '词源', 'etymology'),
      })
    })
    .filter((item): item is Word => !!item)
}

function normalizeArticleItem(row: Record<string, any>): ArticleInput | null {
  if (!row || typeof row !== 'object') return null
  const title = pickField(row, 'title', '原文标题')
  const text = pickField(row, 'text', '原文正文')
  const textTranslate = pickField(row, 'textTranslate', '译文正文')
  if (!text) return null
  return { title: title || titleFromEnglish(text), text, textTranslate }
}

async function parseArticleFile(file: File): Promise<ArticleInput[]> {
  const ext = getFileExt(file)

  if (ext === 'json') {
    let parsed: unknown
    try {
      parsed = JSON.parse(await readFileAsText(file))
    } catch {
      throw new Error('JSON 解析失败')
    }
    if (!Array.isArray(parsed)) throw new Error('JSON 格式错误：顶层必须是数组')
    return parsed
      .map(item => normalizeArticleItem(item as Record<string, any>))
      .filter((item): item is ArticleInput => !!item)
  }

  if (ext === 'xlsx' || ext === 'xls') {
    const rows = await readXlsxRows(file)
    return rows
      .map(row => normalizeArticleItem(row))
      .filter((item): item is ArticleInput => !!item)
  }

  throw new Error(`不支持的文件格式「${ext}」，请使用 .json / .xlsx`)
}

// ---------- 完成 ----------

function goDetail() {
  if (!target.value) return Toast.warning('请先完成导入')
  runtimeStore.editDict = getDefaultDict(cloneDeep(target.value))
  if (isWord.value) {
    router.push('/dict')
  } else {
    router.push('/book/' + target.value.id)
  }
}
</script>

<template>
  <BasePage>
    <div class="card import-page">
      <div>
        <div class="text-2xl font-bold">导入{{ contentLabel }}</div>
        <p class="text-sm opacity-70 mt-1">
          把内容导入到你自己的{{ targetLabel }}中，导入后可到「{{ isWord ? '单词' : '文章' }}」里选择学习。
        </p>
      </div>

      <div class="import-steps mt-4">
        <div class="import-step" :class="{ active: step >= 1 }">
          <span class="num">1</span>
          <span>选择{{ targetLabel }}</span>
        </div>
        <div class="import-rail" :class="{ active: step >= 2 }" />
        <div class="import-step" :class="{ active: step >= 2 }">
          <span class="num">2</span>
          <span>导入{{ contentLabel }}</span>
        </div>
        <div class="import-rail" :class="{ active: step >= 3 }" />
        <div class="import-step" :class="{ active: step >= 3 }">
          <span class="num">3</span>
          <span>导入结果</span>
        </div>
      </div>

      <!-- 第 1 步 -->
      <div v-if="step === 1" class="mt-6">
        <div class="flex items-center justify-between flex-wrap gap-2">
          <div class="title">选择导入位置</div>
          <BaseButton type="info" @click="showCreate = !showCreate">
            {{ showCreate ? '取消新建' : `新建${targetLabel}` }}
          </BaseButton>
        </div>

        <ul class="hint-list mt-2">
          <li>
            <IconFluentCheckmarkCircle16Regular />
            <span>支持导入自定义{{ targetLabel }}{{ isWord ? '和系统词典' : '' }}</span>
          </li>
          <li>
            <IconFluentCheckmarkCircle16Regular />
            <span>官方{{ targetLabel }}不可直接导入，可先创建副本后再导入</span>
          </li>
        </ul>

        <div v-if="showCreate" class="create-panel mt-3">
          <div class="font-bold mb-2">新建{{ targetLabel }}</div>
          <input v-model="newName" class="import-input" :placeholder="`${targetLabel}名称`" maxlength="60" />
          <input v-model="newDesc" class="import-input mt-2" placeholder="描述（可选）" maxlength="120" />
          <div class="flex justify-end mt-3">
            <BaseButton type="primary" :disabled="!newName.trim()" @click="createTarget">创建并继续</BaseButton>
          </div>
        </div>

        <div class="title mt-5">{{ targetLabel }}列表</div>
        <div v-if="writableTargets.length" class="flex gap-4 flex-wrap mt-3">
          <Book
            v-for="item in writableTargets"
            :key="String(item.id)"
            :is-add="false"
            :item="item"
            :quantifier="isWord ? '词' : '篇'"
            :show-progress="false"
            :selected="String(target?.id) === String(item.id)"
            @click="selectTarget(item)"
          />
        </div>
        <div v-else class="empty-tip">还没有可导入的{{ targetLabel }}，请先新建一个。</div>

        <template v-if="readonlyTargets.length">
          <div class="title mt-5">只读{{ targetLabel }}</div>
          <p class="text-sm opacity-70 mt-1">
            官方/系统内容不可直接修改，点击「创建副本」复制一份后再导入。
          </p>
          <div class="flex gap-3 flex-wrap mt-3">
            <div v-for="item in readonlyTargets" :key="String(item.id)" class="readonly-card">
              <div class="font-bold truncate" :title="item.name">{{ item.name }}</div>
              <div class="text-xs opacity-60 mt-1">官方/系统{{ targetLabel }}</div>
              <BaseButton class="mt-2" size="small" type="info" @click="createCopy(item)">创建副本</BaseButton>
            </div>
          </div>
        </template>
      </div>

      <!-- 第 2 步 -->
      <div v-else-if="step === 2" class="mt-6">
        <div class="flex items-center justify-between flex-wrap gap-2">
          <div class="title">导入到：{{ target?.name ?? '未选择' }}</div>
          <div class="text-sm opacity-70">当前已有 {{ targetCount }} {{ isWord ? '个单词' : '条句子' }}</div>
        </div>

        <template v-if="isWord">
          <div class="import-grid mt-4">
            <div class="method-card">
              <div class="method-title">
                <IconFluentTextAlignLeft16Regular />
                <span>手动输入</span>
              </div>
              <p class="text-sm opacity-70 mt-1">一行一个单词，行尾逗号、中文逗号、引号会自动忽略。</p>
              <textarea
                v-model="wordText"
                class="import-textarea mt-2"
                rows="10"
                placeholder="apple&#10;banana&#10;cherry"
              />
              <div class="flex items-center justify-between gap-2 flex-wrap mt-2">
                <span class="text-sm opacity-70">已输入 {{ manualWords.length }} / 5000 个单词</span>
                <BaseButton
                  type="primary"
                  :loading="busy"
                  :disabled="!manualWords.length"
                  @click="submitManualWords"
                >
                  导入单词
                </BaseButton>
              </div>
            </div>

            <div class="method-card">
              <div class="method-title">
                <IconFluentArrowUpload20Regular />
                <span>文件导入</span>
              </div>
              <p class="text-sm opacity-70 mt-1">
                支持 .txt / .json / .xlsx。txt 一行一个单词；json 为字符串数组或 {{ '{word}' }} 数组；xlsx 读取第一张表的「单词 /
                word」列。
              </p>
              <div class="flex items-center gap-3 flex-wrap mt-3">
                <UploadButton accept=".txt,.json,.xlsx,.xls" :disabled="busy" @change="selectWordFile">
                  选择文件
                </UploadButton>
                <span class="text-sm opacity-70 truncate max-w-40">{{ wordFileName }}</span>
              </div>
              <div class="flex justify-end mt-3">
                <BaseButton
                  type="primary"
                  :loading="busy"
                  :disabled="!wordFile"
                  @click="importWordFile"
                >
                  导入文件
                </BaseButton>
              </div>
            </div>

            <div class="method-card">
              <div class="method-title">
                <IconFluentDocument20Regular />
                <span>自定义单词 xlsx</span>
              </div>
              <p class="text-sm opacity-70 mt-1">
                列名：单词、音标①、音标②、翻译、例句、短语、近义词、同根词、词源。可只填写「单词」列。
              </p>
              <div class="flex items-center gap-3 flex-wrap mt-3">
                <UploadButton accept=".xlsx,.xls" :disabled="busy" @change="selectCustomFile">
                  选择文件
                </UploadButton>
                <span class="text-sm opacity-70 truncate max-w-40">{{ customFileName }}</span>
              </div>
              <div class="flex justify-end mt-3">
                <BaseButton
                  type="primary"
                  :loading="busy"
                  :disabled="!customFile"
                  @click="importCustomWordFile"
                >
                  导入单词
                </BaseButton>
              </div>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="article-grid mt-4">
            <div class="method-card">
              <div class="method-title">
                <IconFluentTextAlignLeft16Regular />
                <span>手动输入句子</span>
              </div>
              <p class="text-sm opacity-70 mt-1">
                一行一句，格式为「英文句子 | 中文翻译」，中文翻译可省略。
              </p>
              <textarea
                v-model="articleText"
                class="import-textarea mt-2"
                rows="12"
                placeholder="I like apples. | 我喜欢苹果。&#10;He is a teacher."
              />
              <div class="flex items-center justify-between gap-2 flex-wrap mt-2">
                <span class="text-sm opacity-70">已输入 {{ manualArticles.length }} 条句子</span>
                <BaseButton
                  type="primary"
                  :loading="busy"
                  :disabled="!manualArticles.length"
                  @click="submitManualArticles"
                >
                  导入句子
                </BaseButton>
              </div>
            </div>

            <div class="method-card">
              <div class="method-title">
                <IconFluentArrowUpload20Regular />
                <span>文件导入</span>
              </div>
              <p class="text-sm opacity-70 mt-1">
                支持 .json / .xlsx。json 数组每项 {{ '{title,text,textTranslate}' }}；xlsx 列为 title、text、textTranslate（或
                原文标题、原文正文、译文正文）。
              </p>
              <div class="flex items-center gap-3 flex-wrap mt-3">
                <UploadButton accept=".json,.xlsx,.xls" :disabled="busy" @change="selectArticleFile">
                  选择文件
                </UploadButton>
                <span class="text-sm opacity-70 truncate max-w-40">{{ articleFileName }}</span>
              </div>
              <div class="flex justify-end mt-3">
                <BaseButton
                  type="primary"
                  :loading="busy"
                  :disabled="!articleFile"
                  @click="importArticleFile"
                >
                  导入文件
                </BaseButton>
              </div>
            </div>
          </div>
        </template>

        <div class="flex justify-between flex-wrap gap-2 mt-5">
          <BaseButton type="info" @click="backToStep1">返回上一步</BaseButton>
          <BaseButton v-if="result" type="primary" @click="step = 3">查看结果</BaseButton>
        </div>
      </div>

      <!-- 第 3 步 -->
      <div v-else-if="step === 3 && result" class="mt-6">
        <div class="result-panel">
          <div class="flex items-center gap-2 font-bold text-lg">
            <IconFluentCheckmarkCircle16Regular class="text-green-600" />
            <span>导入完成</span>
          </div>
          <div class="mt-3 space-y-1">
            <div>成功导入：{{ result.added }} 个{{ result.type === 'word' ? '单词' : '句子' }}</div>
            <div v-if="result.skipped">跳过：{{ result.skipped }} 个（{{ targetLabel }}中已存在）</div>
            <div>目标{{ targetLabel }}：{{ target?.name }}</div>
          </div>
        </div>
        <div class="flex gap-3 flex-wrap justify-end mt-5">
          <BaseButton type="info" @click="step = 2">继续导入</BaseButton>
          <BaseButton type="primary" size="large" @click="goDetail">
            查看{{ isWord ? '词典' : '书籍' }}
          </BaseButton>
        </div>
      </div>
    </div>
  </BasePage>
</template>

<style scoped lang="scss">
.import-page {
  min-height: calc(100vh - 1.2rem);
}

.import-steps {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.import-step {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-font-3);
  font-size: 0.9rem;
  font-weight: 600;

  .num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 999px;
    border: 1px solid var(--color-input-border);
    background: var(--color-input-bg);
    font-weight: 700;
  }

  &.active {
    color: var(--color-font-2);

    .num {
      background: var(--color-select-bg);
      border-color: var(--color-select-bg);
      color: #fff;
    }
  }
}

.import-rail {
  flex: 1;
  min-width: 1.5rem;
  height: 1px;
  background: var(--color-input-border);

  &.active {
    background: var(--color-select-bg);
  }
}

.hint-list {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.9rem;
  color: var(--color-font-3);
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    align-items: flex-start;
    gap: 0.45rem;

    svg {
      color: var(--color-select-bg);
      flex-shrink: 0;
      margin-top: 0.15rem;
    }
  }
}

.create-panel {
  border: 1px solid var(--color-input-border);
  border-radius: 0.6rem;
  padding: 1rem;
  background: var(--color-input-bg);
}

.import-input {
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-input-border);
  border-radius: 0.5rem;
  background: var(--color-input-bg);
  color: var(--color-input-color);
  font: inherit;
  outline: none;

  &:focus {
    border-color: var(--color-select-bg);
  }
}

.import-textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-input-border);
  border-radius: 0.5rem;
  background: var(--color-input-bg);
  color: var(--color-input-color);
  font-family: var(--font-family);
  font-size: 1rem;
  outline: none;
  resize: vertical;

  &:focus {
    border-color: var(--color-select-bg);
  }
}

.import-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.article-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .import-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .article-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1200px) {
  .import-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.method-card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-input-border);
  border-radius: 0.65rem;
  padding: 1rem;
  background: var(--color-input-bg);
}

.method-title {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 1.05rem;
  font-weight: 700;

  svg {
    color: var(--color-select-bg);
  }
}

.readonly-card {
  width: 10rem;
  border: 1px solid var(--color-input-border);
  border-radius: 0.6rem;
  padding: 0.8rem;
  background: var(--color-input-bg);
}

.empty-tip {
  padding: 1.5rem 0;
  text-align: center;
  color: var(--color-font-3);
}

.result-panel {
  border: 1px solid var(--color-input-border);
  border-radius: 0.65rem;
  padding: 1rem;
  background: var(--color-input-bg);
}

@media (max-width: 640px) {
  .import-steps {
    flex-direction: column;
    align-items: stretch;
  }

  .import-rail {
    display: none;
  }
}
</style>