import { ofetch, type FetchOptions } from 'ofetch'
import { defu } from 'defu'

export type BaseOptions = {
  baseURL: string
}

export class Base {
  constructor(private options: Partial<BaseOptions>) {
    this.options = defu(options, {})
  }

  async request<T>(options: FetchOptions & { url: string }): Promise<T> {
    const { url, ...fetchOptions } = options
    return await ofetch(
      url,
      defu(fetchOptions, {
        method: 'GET',
        baseURL: this.options.baseURL!,
      }),
    )
  }
}
