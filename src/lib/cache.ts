import { unstable_cache as nextCache } from 'next/cache'
import { cache as reactCache } from 'react'

type Callback = (...arfs: unknown[]) => Promise<unknown>

export function cache<T extends Callback>(
  cb: T,
  keyparts: string[],
  options: { revalidate?: number | false; tags?: string[] } = {},
) {
  return nextCache(reactCache(cb), keyparts, options)
}
