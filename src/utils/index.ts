import { ofetch } from 'ofetch'
import type { FetchOptions } from 'ofetch'
import { cleanDoubleSlashes } from 'ufo'

export const isAbsoluteURL = (str: string) => /^https?:\/\//.test(str)

export async function fetchPost<T>(
  url: string,
  body: Record<string, any> = {},
  options: FetchOptions<'json', any> = {},
) {
  return await ofetch<T>(cleanDoubleSlashes(url), {
    ...options,
    method: 'POST',
    body,
  })
}
