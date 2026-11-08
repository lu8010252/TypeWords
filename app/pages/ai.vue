<script setup lang="ts">
import { computed, ref } from 'vue'
import { BasePage, BaseButton, Toast } from '@/base'
import { useBaseStore } from '@/core/stores/base.ts'
import { Supabase } from '@/core/utils/supabase'
import { normalizeServerUrl } from '@/core/utils/syncClient'
import { cloneDeep } from '@/core/utils'
import { DictType, getDefaultArticle, getDefaultDict, getDefaultWord } from '@/core/types'
import { useWordOptions } from '@/core/hooks/dict.ts'

useHead({ title: 'AI 加词 · 单词与句子' })

const store = useBaseStore()
const { createCustomDict, addWordToDict } = useWordOptions()

const tab = ref<'words' | 'articles'>('words')
const levels = ['小学低年级', '小学中高年级', '初中', '高中']
const level = ref('小学中高年级')
const loading = ref(false)
const NEW = '__new__'

// ---------- 通用:调用服务器上的 AI ----------
async function post(path: string, body: Record<string, unknown>) {
  const c = Supabase.getConfig()
  if (!c?.key) throw new Error('请先在「设置 → 数据同步」里填好服务器地址和档案密钥')
  const r = await fetch(normalizeServerUrl(c.url) + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + c.key },
    body: JSON.stringify(body),
  })
  const j = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(j?.error?.message || 'HTTP ' + r.status)
  return j
}

// ---------- 单词 ----------
const wTopic = ref('')
const wText = ref('')
const wCount = ref(20)
type Cand = { checked: boolean; word: string; phonetic0: string; phonetic1: string; trans: any[]; sentences: any[]; phrases: any[] }
const wList = ref<Cand[]>([])
const wDict = ref(NEW)
const wNewName = ref('')

const wordDicts = computed(() => store.word.bookList.filter(v => v.custom && !v.system))

async function genWords() {
  if (loading.value) return
  loading.value = true
  try {
    const r = await post('/api/ai/words', { topic: wTopic.value, text: wText.value, count: wCount.value, level: level.value })
    wList.value = r.words.map((w: any) => ({ ...w, checked: true }))
    if (!wNewName.value) wNewName.value = wTopic.value.trim() || 'AI 单词 ' + new Date().toLocaleDateString()
  } catch (e) {
    Toast.error((e as Error).message)
  } finally {
    loading.value = false
  }
}

async function addWords() {
  const chosen = wList.value.filter(v => v.checked)
  if (!chosen.length) return Toast.warning('请先勾选要加入的单词')
  let dict
  if (wDict.value === NEW) {
    const res = await createCustomDict(wNewName.value)
    if (!res.ok) return Toast.error(res.reason === 'duplicate' ? '已有同名词典,请换个名字或选择它' : '请填写词典名称')
    dict = res.dict
    wDict.value = dict.id as string
  } else {
    dict = wordDicts.value.find(v => v.id === wDict.value)
  }
  if (!dict) return Toast.error('找不到目标词典')
  let added = 0
  for (const c of chosen) {
    const w = getDefaultWord({
      word: c.word,
      phonetic0: c.phonetic0,
      phonetic1: c.phonetic1,
      trans: c.trans,
      sentences: c.sentences,
      phrases: c.phrases,
      custom: true,
    })
    if (addWordToDict(w, dict).ok) added++
  }
  Toast.success(`已加入 ${added} 个单词${added < chosen.length ? `(${chosen.length - added} 个已存在)` : ''},到「单词」里选择这本词典学习`)
  wList.value = wList.value.filter(v => !v.checked)
}

// ---------- 文章 / 句子 ----------
const aTopic = ref('')
const aText = ref('')
const aCount = ref(10)
const aStyle = ref<'passage' | 'sentences'>('sentences')
type ACand = { checked: boolean; title: string; titleTranslate: string; text: string; textTranslate: string }
const aList = ref<ACand[]>([])
const aBook = ref(NEW)
const aNewName = ref('')

const articleBooks = computed(() => store.article.bookList.filter(v => v.custom && !v.system))

async function genArticles() {
  if (loading.value) return
  loading.value = true
  try {
    const r = await post('/api/ai/articles', { topic: aTopic.value, text: aText.value, count: aCount.value, style: aStyle.value, level: level.value })
    aList.value = r.articles.map((a: any) => ({ ...a, checked: true }))
    if (!aNewName.value) aNewName.value = aTopic.value.trim() || 'AI 文章 ' + new Date().toLocaleDateString()
  } catch (e) {
    Toast.error((e as Error).message)
  } finally {
    loading.value = false
  }
}

function addArticles() {
  const chosen = aList.value.filter(v => v.checked)
  if (!chosen.length) return Toast.warning('请先勾选要加入的内容')
  let book
  if (aBook.value === NEW) {
    const name = aNewName.value.trim()
    if (!name) return Toast.error('请填写文章本名称')
    if (store.article.bookList.find(v => v.name === name)) return Toast.error('已有同名文章本,请换个名字或选择它')
    const data = getDefaultDict({ name, id: 'custom-dict-' + Date.now(), custom: true, type: DictType.article })
    store.article.bookList.push(cloneDeep(data))
    book = store.article.bookList.find(v => v.id === data.id)
    aBook.value = data.id as string
  } else {
    book = articleBooks.value.find(v => v.id === aBook.value)
  }
  if (!book) return Toast.error('找不到目标文章本')
  for (const c of chosen) {
    // sections 留空,练习时会按「一句一行」自动生成
    book.articles.push(
      getDefaultArticle({
        title: c.title || c.text.split('\n')[0].slice(0, 40),
        titleTranslate: c.titleTranslate,
        text: c.text,
        textTranslate: c.textTranslate,
      })
    )
  }
  book.length = book.articles.length
  Toast.success(`已加入 ${chosen.length} 篇,到「文章」里选择这本学习`)
  aList.value = aList.value.filter(v => !v.checked)
}

const hasKey = computed(() => !!Supabase.getConfig()?.key)
</script>

<template>
  <BasePage>
    <div class="center">
      <div class="card-white w-full max-w-3xl">
        <div class="font-bold text-2xl mb-2">AI 加词</div>
        <p class="text-sm mb-4 opacity-70">
          说一个主题,或粘贴单词 / 文章,让 AI 帮你做成单词卡或逐句练习的文章,加入自己的词典。
        </p>
        <p v-if="!hasKey" class="text-red mb-4">
          还没有连接服务器:请先到「设置 → 数据同步」填写服务器地址和档案密钥(AI 由服务器代理,密钥不会放在浏览器里)。
        </p>

        <div class="flex gap-2 mb-4">
          <BaseButton :type="tab === 'words' ? 'primary' : 'info'" @click="tab = 'words'">单词</BaseButton>
          <BaseButton :type="tab === 'articles' ? 'primary' : 'info'" @click="tab = 'articles'">文章 / 句子</BaseButton>
        </div>

        <div class="mb-3">
          学生水平:
          <select v-model="level" class="ai-input !w-auto">
            <option v-for="l in levels" :key="l" :value="l">{{ l }}</option>
          </select>
        </div>

        <!-- 单词 -->
        <div v-if="tab === 'words'">
          <input v-model="wTopic" class="ai-input" placeholder="主题,例如:四年级上册 Unit 3 食物 / 动物园" />
          <textarea v-model="wText" class="ai-input mt-2" rows="4" placeholder="或者粘贴单词列表 / 一段英文,AI 会补全音标、释义、例句"></textarea>
          <div class="mt-2 flex items-center gap-3">
            <span>数量</span>
            <input v-model.number="wCount" type="number" min="1" max="40" class="ai-input !w-24" />
            <BaseButton :loading="loading" @click="genWords">生成</BaseButton>
          </div>

          <div v-if="wList.length" class="mt-4">
            <div v-for="(w, i) in wList" :key="i" class="ai-item">
              <label class="flex gap-2 items-start">
                <input type="checkbox" v-model="w.checked" class="mt-2" />
                <div class="flex-1">
                  <div>
                    <b class="text-lg">{{ w.word }}</b>
                    <span class="ml-2 opacity-70">/{{ w.phonetic1 || w.phonetic0 }}/</span>
                  </div>
                  <div>{{ w.trans.map(t => `${t.pos} ${t.cn}`).join(';') }}</div>
                  <div v-if="w.sentences[0]" class="text-sm opacity-70">{{ w.sentences[0].c }} {{ w.sentences[0].cn }}</div>
                </div>
              </label>
            </div>

            <div class="mt-3 flex flex-wrap gap-2 items-center">
              <span>加入:</span>
              <select v-model="wDict" class="ai-input !w-auto">
                <option :value="NEW">新建词典…</option>
                <option v-for="d in wordDicts" :key="String(d.id)" :value="d.id">{{ d.name }}</option>
              </select>
              <input v-if="wDict === NEW" v-model="wNewName" class="ai-input !w-56" placeholder="词典名称" />
              <BaseButton @click="addWords">加入所选</BaseButton>
            </div>
          </div>
        </div>

        <!-- 文章 / 句子 -->
        <div v-else>
          <div class="mb-2 flex gap-4">
            <label><input type="radio" value="sentences" v-model="aStyle" /> 句子集(每句独立,逐句打字)</label>
            <label><input type="radio" value="passage" v-model="aStyle" /> 短文</label>
          </div>
          <input v-model="aTopic" class="ai-input" placeholder="主题,例如:日常问候 / 我的家人 / 一般现在时" />
          <textarea v-model="aText" class="ai-input mt-2" rows="5" placeholder="或者粘贴一段英文,AI 会按一句一行排版并配上中文翻译(原文用词不改)"></textarea>
          <div class="mt-2 flex items-center gap-3">
            <span>{{ aStyle === 'sentences' ? '句子数' : '篇数' }}</span>
            <input v-model.number="aCount" type="number" min="1" max="20" class="ai-input !w-24" />
            <BaseButton :loading="loading" @click="genArticles">生成</BaseButton>
          </div>

          <div v-if="aList.length" class="mt-4">
            <div v-for="(a, i) in aList" :key="i" class="ai-item">
              <label class="flex gap-2 items-start">
                <input type="checkbox" v-model="a.checked" class="mt-2" />
                <div class="flex-1">
                  <b>{{ a.title }}</b>
                  <span class="ml-2 opacity-70">{{ a.titleTranslate }}</span>
                  <div class="whitespace-pre-wrap mt-1">{{ a.text }}</div>
                  <div class="whitespace-pre-wrap mt-1 text-sm opacity-70">{{ a.textTranslate }}</div>
                </div>
              </label>
            </div>

            <div class="mt-3 flex flex-wrap gap-2 items-center">
              <span>加入:</span>
              <select v-model="aBook" class="ai-input !w-auto">
                <option :value="NEW">新建文章本…</option>
                <option v-for="d in articleBooks" :key="String(d.id)" :value="d.id">{{ d.name }}</option>
              </select>
              <input v-if="aBook === NEW" v-model="aNewName" class="ai-input !w-56" placeholder="文章本名称" />
              <BaseButton @click="addArticles">加入所选</BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BasePage>
</template>

<style scoped lang="scss">
.ai-input {
  width: 100%;
  box-sizing: border-box;
  padding: 0.4rem 0.75rem;
  border: 1px solid #8886;
  border-radius: 0.5rem;
  background: transparent;
  color: inherit;
  font: inherit;
}
.ai-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid #8883;
}
</style>
