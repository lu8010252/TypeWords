// 自建同步客户端:接口形状仿照 supabase-js 的 .from('typewords_data') 链式调用,
// 这样 useDataSyncPersistence / setting.vue 里原有的同步逻辑几乎不用改。
// url = 你自己的 TypeWords 服务器地址(留空表示当前站点),key = 孩子的档案密钥。

type Row = Record<string, any>
type Result = { data: Row[] | null; error: { message: string } | null }

export interface SyncClient {
  from(table: string): Query
}

class Query implements PromiseLike<Result> {
  private mode: 'select' | 'upsert' | 'insert' = 'select'
  private cols = ''
  private types: string[] | null = null
  private notNullVersion = false
  private rows: Row[] = []

  constructor(
    private base: string,
    private key: string
  ) {}

  select(cols = '*') {
    this.mode = 'select'
    this.cols = cols
    return this
  }

  in(col: string, values: string[]) {
    if (col === 'type') this.types = values
    return this
  }

  not(col: string, op: string, val: unknown) {
    if (col === 'data_version' && op === 'is' && val === null) this.notNullVersion = true
    return this
  }

  upsert(rows: Row | Row[], _opts?: unknown) {
    this.mode = 'upsert'
    this.rows = Array.isArray(rows) ? rows : [rows]
    return this
  }

  insert(rows: Row | Row[]) {
    this.mode = 'insert'
    this.rows = Array.isArray(rows) ? rows : [rows]
    return this
  }

  private async run(): Promise<Result> {
    try {
      const path = `/api/sync/${this.mode}`
      const body =
        this.mode === 'select'
          ? {
              types: this.types ?? undefined,
              notNullVersion: this.notNullVersion,
              withData: /\bdata\b/.test(this.cols) || this.cols.trim() === '*',
            }
          : { rows: this.rows }
      const resp = await fetch(this.base + path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + this.key },
        body: JSON.stringify(body),
      })
      const json = await resp.json().catch(() => ({}))
      if (!resp.ok) {
        return { data: null, error: { message: json?.error?.message || `HTTP ${resp.status}` } }
      }
      return { data: json.data ?? [], error: null }
    } catch (e) {
      // 沿用原有的错误文案,上层对 "TypeError: Failed to fetch" 会自动重试几次
      return { data: null, error: { message: String(e) } }
    }
  }

  then<T1 = Result, T2 = never>(
    onfulfilled?: ((value: Result) => T1 | PromiseLike<T1>) | null,
    onrejected?: ((reason: any) => T2 | PromiseLike<T2>) | null
  ): PromiseLike<T1 | T2> {
    return this.run().then(onfulfilled, onrejected)
  }
}

export function normalizeServerUrl(url: string): string {
  let u = (url || '').trim().replace(/\/+$/, '')
  if (!u && typeof location !== 'undefined') u = location.origin
  if (u && !/^https?:\/\//i.test(u)) u = 'http://' + u
  return u
}

export function createClient(url: string, key: string): SyncClient {
  const base = normalizeServerUrl(url)
  return {
    from: () => new Query(base, key),
  }
}

// 配置页保存前,先确认服务器可达且密钥有效
export async function checkServer(url: string, key: string): Promise<{ ok: boolean; name?: string; message?: string }> {
  try {
    const resp = await fetch(normalizeServerUrl(url) + '/api/me', { headers: { Authorization: 'Bearer ' + key } })
    const json = await resp.json().catch(() => ({}))
    if (!resp.ok) return { ok: false, message: json?.error?.message || `HTTP ${resp.status}` }
    return { ok: true, name: json.name }
  } catch (e) {
    return { ok: false, message: String(e) }
  }
}
