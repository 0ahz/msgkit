import { defu } from 'defu'
import { ofetch, type FetchOptions } from 'ofetch'

export type BaseOptions = {
  baseURL: string
}

export class Base {
  constructor(private options: Partial<BaseOptions>) {
    this.options = defu(options, {})
  }

  async request<T>(options: FetchOptions & { url: string }): Promise<T> {
    const { url, ...otherOptions } = options
    const fetchOptions = defu(otherOptions, {
      method: 'GET',
      baseURL: this.options.baseURL!,
    })
    return await ofetch(url, fetchOptions)
  }
}
