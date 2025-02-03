export class EdgeCache<K extends string | number, T> {
  #kv?: { set: Deno.Kv['set']; watch: Deno.Kv['watch'] }
  #cache = new Map<K, T>()
  #tags = new Map<string, Set<K>>()
  initialization: Promise<void>
  constructor() {
    this.initialization = this.#initialize()
  }

  async #initialize() {
    if (globalThis.Deno) {
      this.#kv = await globalThis.Deno.openKv(import.meta.env.DEV ? ':memory:' : undefined)
    } else {
      const stream = new TransformStream()
      const writer = stream.writable.getWriter()
      writer.write([{ value: null }])
      this.#kv = {
        async set(_key: Deno.KvKey, value: string) {
          await writer.write([{ value }])
          console.log('set', value)
          return Promise.resolve<Deno.KvCommitResult>({ ok: true, versionstamp: '' })
        },
        watch() {
          return stream.readable
        }
      }
    }
    this.#listen()
  }

  get<R extends T | undefined>(key: K) {
    return this.#cache.get(key) as R
  }

  set(key: K, value: T, tags: string[]) {
    this.#cache.set(key, value)
    for (const tag of tags) {
      let keys = this.#tags.get(tag)
      if (!keys) this.#tags.set(tag, (keys = new Set()))
      keys.add(key)
    }
  }

  async invalidate(tags: string[]) {
    if (!this.#kv) await this.initialization
    this.#kv!.set(['invalidation-channel'], tags)
  }

  async #listen() {
    let first = true
    console.warn('LISTENING')
    for await (const [msg] of this.#kv!.watch<[string[]]>([['invalidation-channel']])) {
      if (first) {
        first = false
        continue
      }
      console.warn('CACHE INVALIDATION', msg.value)
      for (const tag of msg.value ?? []) {
        for (const key of this.#tags.get(tag) ?? []) {
          this.#cache.delete(key)
        }
      }
    }
  }
}
