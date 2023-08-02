export class LruCache<T> {

 private values: Map<string, T> = new Map<string, T>()
 private maxEntries: number = 20

 public get(key: string): T | undefined {
   const entry = this.values.get(key)

   if (entry) {
    this.values.delete(key)
    this.values.set(key, entry)
    return entry
   } else {
    return undefined
   }
 }

 public put(key: string, value: T) {

   if (this.values.size >= this.maxEntries) {
     // least-recently used cache eviction strategy
     const keyToDelete = this.values.keys().next().value
     this.values.delete(keyToDelete)
   }

   this.values.set(key, value)
 }
}