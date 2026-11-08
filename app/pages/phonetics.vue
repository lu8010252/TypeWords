<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { BaseButton, BasePage, Dialog, Switch } from '@/base'
import { PHONEMES, PHONETIC_CATEGORIES } from '@/core/data/phonetics'
import type { Phoneme } from '@/core/data/phonetics'
import IconFluentSpeaker220Regular from '~icons/fluent/speaker-2-20-regular'

useHead({ title: '英语音标 - TypeWords' })

type FamilyFilter = 'all' | 'vowel' | 'consonant'

const familyOptions: { value: FamilyFilter; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'vowel', label: '元音' },
  { value: 'consonant', label: '辅音' },
]

const categoryMap = new Map(PHONETIC_CATEGORIES.map(item => [item.id, item] as const))

const family = ref<FamilyFilter>('all')
const activeCategory = ref('all')
const randomMode = ref(false)
const shuffledIds = ref<string[]>([])

const playingId = ref('')
const failedId = ref('')
const detailVisible = ref(false)
const activePhoneme = ref<Phoneme | null>(null)

const filteredPhonemes = computed(() =>
  PHONEMES.filter(item => {
    if (activeCategory.value !== 'all' && item.category !== activeCategory.value) return false
    if (family.value !== 'all' && categoryMap.get(item.category)?.family !== family.value) return false
    return true
  })
)

const displayedPhonemes = computed(() => {
  const list = filteredPhonemes.value
  if (!randomMode.value || !shuffledIds.value.length) return list
  const rank = new Map(shuffledIds.value.map((id, index) => [id, index] as const))
  return [...list].sort((a, b) => (rank.get(a.id) ?? 0) - (rank.get(b.id) ?? 0))
})

watch([family, activeCategory, randomMode], () => {
  shuffledIds.value = randomMode.value ? shuffle(PHONEMES).map(item => item.id) : []
})

const activeCategoryTitle = computed(() => {
  if (!activePhoneme.value) return ''
  return categoryMap.get(activePhoneme.value.category)?.title ?? ''
})

const activeCategoryDescription = computed(() => {
  if (!activePhoneme.value) return ''
  return categoryMap.get(activePhoneme.value.category)?.description ?? ''
})

function shuffle(list: Phoneme[]) {
  const result = [...list]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

function selectFamily(value: FamilyFilter) {
  family.value = value
  activeCategory.value = 'all'
}

function selectCategory(id: string) {
  activeCategory.value = activeCategory.value === id ? 'all' : id
  family.value = 'all'
}

function categoryTitleOf(id: string) {
  return categoryMap.get(id)?.title ?? ''
}

let audioPlayer: HTMLAudioElement | null = null

function ensureAudioPlayer() {
  if (!audioPlayer) {
    audioPlayer = new Audio()
    audioPlayer.addEventListener('ended', () => {
      playingId.value = ''
    })
    audioPlayer.addEventListener('error', () => {
      if (playingId.value) failedId.value = playingId.value
      playingId.value = ''
    })
  }
  return audioPlayer
}

function play(item: Phoneme) {
  if (typeof window === 'undefined') return
  const player = ensureAudioPlayer()
  if (playingId.value === item.id) {
    player.pause()
    playingId.value = ''
    return
  }
  failedId.value = ''
  player.pause()
  player.src = item.audioSrc
  player.currentTime = 0
  playingId.value = item.id
  player.play().catch(() => {
    failedId.value = item.id
    playingId.value = ''
  })
}

function playActive() {
  if (activePhoneme.value) play(activePhoneme.value)
}

function openDetail(item: Phoneme) {
  activePhoneme.value = item
  detailVisible.value = true
}

function speakWord(word: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(word)
  utterance.lang = 'en-US'
  window.speechSynthesis.speak(utterance)
}

onBeforeUnmount(() => {
  if (audioPlayer) {
    audioPlayer.pause()
    audioPlayer = null
  }
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel()
  }
})
</script>

<template>
  <BasePage>
    <div class="card">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-2">
        <div>
          <h1 class="text-2xl font-bold m-0">英语音标</h1>
          <p class="mt-2 mb-0 text-sm opacity-70">从 20 个元音到 28 个辅音，点击音标即可听发音</p>
        </div>
        <div class="total-badge self-start md:self-auto">共 {{ PHONEMES.length }} 个音标</div>
      </div>

      <div class="mt-5 flex flex-col gap-3">
        <div class="flex flex-wrap items-center gap-2">
          <span class="filter-label">音标类型</span>
          <div
            v-for="option in familyOptions"
            :key="option.value"
            class="chip"
            :class="{ active: family === option.value }"
            @click="selectFamily(option.value)"
          >
            {{ option.label }}
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <span class="filter-label">子分类</span>
          <div
            v-for="category in PHONETIC_CATEGORIES"
            :key="category.id"
            class="chip"
            :class="{ active: activeCategory === category.id }"
            :title="category.description"
            @click="selectCategory(category.id)"
          >
            {{ category.title }}
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <span class="filter-label">随机练习</span>
          <Switch v-model="randomMode" />
          <span v-if="randomMode" class="text-sm opacity-70">随机模式：顺序已打乱，点击卡片继续练习</span>
          <span v-if="randomMode" class="color-link cursor-pointer text-sm" @click="randomMode = false">
            返回正常顺序
          </span>
        </div>

        <div v-if="filteredPhonemes.length !== PHONEMES.length" class="text-sm opacity-70">
          当前显示 {{ displayedPhonemes.length }} 个音标
        </div>
      </div>
    </div>

    <div class="card">
      <div v-if="displayedPhonemes.length" class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-3">
        <div
          v-for="item in displayedPhonemes"
          :key="item.id"
          class="phonetic-card"
          :class="{ playing: playingId === item.id, failed: failedId === item.id }"
          @click="play(item)"
        >
          <div class="w-full flex items-start justify-between gap-2">
            <span class="category-tag">{{ categoryTitleOf(item.category) }}</span>
            <span class="detail-link" @click.stop="openDetail(item)">详情</span>
          </div>
          <div class="symbol">{{ item.symbol }}</div>
          <div class="example-word">{{ item.examples[0]?.word }}</div>
          <div class="example-meaning">{{ item.examples[0]?.meaning }}</div>
          <div class="status">
            <template v-if="failedId === item.id">音频暂不可用</template>
            <template v-else-if="playingId === item.id">播放中…</template>
            <template v-else>点击播放</template>
          </div>
        </div>
      </div>
      <div v-else class="py-12 text-center opacity-70">没有符合条件的音标</div>
    </div>

    <Dialog v-model="detailVisible" :title="activePhoneme ? `${activePhoneme.symbol} 音标详情` : '音标详情'" padding>
      <div v-if="activePhoneme" class="detail-panel">
        <div class="flex items-center gap-4">
          <div class="detail-symbol">{{ activePhoneme.symbol }}</div>
          <div class="min-w-0">
            <div class="font-bold">{{ activeCategoryTitle }}</div>
            <div class="text-xs opacity-70 mt-1">{{ activeCategoryDescription }}</div>
          </div>
        </div>

        <div class="mt-4 flex flex-wrap items-center gap-3">
          <BaseButton size="small" @click="playActive">
            <IconFluentSpeaker220Regular class="mr-1" />
            {{ playingId === activePhoneme.id ? '播放中…' : '播放发音' }}
          </BaseButton>
          <span v-if="failedId === activePhoneme.id" class="text-sm text-red">音频暂不可用</span>
        </div>

        <div class="detail-section">
          <div class="detail-heading">发音要领</div>
          <ul class="m-0 pl-4">
            <li v-for="(tip, index) in activePhoneme.pronunciationTips" :key="index">{{ tip }}</li>
          </ul>
        </div>

        <div class="detail-section">
          <div class="detail-heading">辨音提示</div>
          <p class="m-0">{{ activePhoneme.confusionNote }}</p>
        </div>

        <div class="detail-section">
          <div class="detail-heading">常见例词</div>
          <div v-for="(example, index) in activePhoneme.examples" :key="index" class="example-row" @click="speakWord(example.word)">
            <div class="min-w-0">
              <span class="font-bold">{{ example.word }}</span>
              <span class="ml-2 opacity-70">{{ example.phonetic }}</span>
            </div>
            <span class="text-sm opacity-70">{{ example.meaning }}</span>
          </div>
          <div class="text-xs opacity-60 mt-1">点击例词可用浏览器语音朗读（取决于系统语音包）</div>
        </div>
      </div>
    </Dialog>
  </BasePage>
</template>

<style scoped lang="scss">
.total-badge {
  @apply px-3 py-1 rounded-full text-sm self-start;
  background: var(--color-fourth);
  color: var(--color-main-text);
}

.filter-label {
  @apply text-sm font-medium shrink-0;
  color: var(--color-main-text);
}

.chip {
  @apply px-3 py-1 rounded-full text-sm cp select-none transition-all;
  border: 1px solid var(--color-item-border);
  background: transparent;
  color: var(--color-main-text);

  &:hover {
    border-color: var(--color-select-bg);
  }

  &.active {
    background: var(--color-select-bg);
    border-color: var(--color-select-bg);
    color: #fff;
  }
}

.phonetic-card {
  @apply rounded-xl p-3 flex flex-col items-center text-center cp transition-all;
  min-height: 10rem;
  border: 1px solid var(--color-item-border);
  background: var(--color-card-bg);

  &:hover {
    border-color: var(--color-select-bg);
    transform: translateY(-2px);
  }

  &.playing {
    border-color: var(--color-select-bg);
    box-shadow: 0 0 0 2px rgb(12 140 233 / 20%);
  }

  &.failed {
    border-color: #f56c6c;
  }
}

.category-tag {
  @apply text-xs px-2 py-0.5 rounded-full text-left;
  background: var(--color-fourth);
  color: var(--color-main-text);
  white-space: nowrap;
}

.detail-link {
  @apply text-xs shrink-0;
  color: var(--color-link);

  &:hover {
    text-decoration: underline;
  }
}

.symbol {
  @apply mt-3 text-4xl font-bold leading-none;
}

.example-word {
  @apply mt-3 font-medium;
}

.example-meaning {
  @apply text-xs opacity-60 mt-1;
}

.status {
  @apply mt-2 text-xs;
  color: var(--color-select-bg);
}

.failed .status {
  color: #f56c6c;
}

.detail-panel {
  @apply w-[32rem] max-w-[88vw] max-h-[68vh] overflow-y-auto pb-4;
}

.detail-symbol {
  @apply text-5xl font-bold leading-none shrink-0;
}

.detail-section {
  @apply mt-5;
}

.detail-heading {
  @apply font-bold mb-2;
}

.example-row {
  @apply flex justify-between items-center gap-2 py-2 px-2 cp rounded-md;
  border-bottom: 1px dashed var(--color-item-border);

  &:hover {
    background: var(--color-fourth);
  }
}
</style>