import { z } from 'zod'
import { defu } from 'defu'
import { ofetch } from 'ofetch'
import { BaseFetch, type BaseFetchOptions } from '../core/fetch'

const BARK_BASE_URL = 'https://api.day.app/'

// https://bark.day.app/#/tutorial
const configSchema = z.object({
  token: z.string().min(1),
  body: z.string().min(1),
  title: z.optional(z.string()),
  level: z.optional(
    z.union([
      z.literal('active'),
      z.literal('timeSensitive'),
      z.literal('passive'),
    ]),
  ),
  badge: z.optional(z.number().int().min(0)),
  autoCopy: z.optional(z.union([z.literal(0), z.literal(1)])),
  copy: z.optional(z.string()),
  sound: z.optional(z.string()),
  icon: z.optional(z.string().url()),
  group: z.optional(z.string()),
  isArchive: z.optional(z.union([z.literal(0), z.literal(1)])),
  url: z.optional(z.string().url()),
})

const configPartialSchema = configSchema.partial()

const optionsMessageSchema = configPartialSchema.extend({
  body: z.string(),
})

export type BarkConfig = z.infer<typeof configSchema>

export type BarkMessageOptions = z.infer<typeof optionsMessageSchema>

export type BarkResponse = {
  code: number
  message: string
  timestamp: string
}

export const sendBark = async (options: BarkConfig) => {
  const { token, ...message } = configSchema.parse(options)
  const url = `/${token}`
  return ofetch<BarkResponse>(url, {
    method: 'POST',
    baseURL: BARK_BASE_URL,
    body: message,
  })
}

export class Bark extends BaseFetch {
  constructor(private config: Partial<BarkConfig & BaseFetchOptions> = {}) {
    const { baseURL, ...barkConfig } = config
    super({ baseURL: baseURL || BARK_BASE_URL })
    this.config = defu(barkConfig, {})
  }

  async send(options?: BarkMessageOptions) {
    const mergedOption = defu(options, this.config)
    const { token, ...body } = configSchema.parse(mergedOption)
    return await this.fetch<BarkResponse>({
      url: `/${token}`,
      method: 'POST',
      body,
    })
  }
}

export const createBark = (
  config: Partial<BarkConfig & BaseFetchOptions> = {},
) => {
  return new Bark(config)
}
