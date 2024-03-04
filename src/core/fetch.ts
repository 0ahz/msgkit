import { defu } from 'defu'
import { ofetch, type FetchOptions } from 'ofetch'

export type BaseFetchOptions = {
  baseURL: string
}

export class BaseFetch {
  constructor(private options: Partial<BaseFetchOptions>) {
    this.options = defu(options, {})
  }

  async fetch<T>(options: FetchOptions & { url: string }): Promise<T> {
    const { url, ...otherOptions } = options
    const fetchOptions = defu(otherOptions, {
      method: 'GET',
      baseURL: this.options.baseURL!,
    })
    return await ofetch(url, fetchOptions)
  }
}
