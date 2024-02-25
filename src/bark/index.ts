import { z } from 'zod'
import { defu } from 'defu'
import { Base } from '../base'
import type { BaseOptions } from '../base'

const BARK_BASE_URL = 'https://api.day.app/'

// https://bark.day.app/#/tutorial
const configSchema = z.object({
  token: z.string().min(1),
  body: z.optional(z.string()),
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

export class Bark extends Base {
  constructor(private config: Partial<BarkConfig & BaseOptions> = {}) {
    const { baseURL, ...barkConfig } = config
    super({ baseURL: baseURL || BARK_BASE_URL })
    this.config = defu(barkConfig, {})
  }

  async send(options?: BarkMessageOptions) {
    const mergedOption = defu(options, this.config)
    const { token, ...body } = configSchema.parse(mergedOption)
    return await this.request<BarkResponse>({
      method: 'POST',
      url: `/${token}`,
      body,
    })
  }
}

export const createBark = (config: Partial<BarkConfig & BaseOptions> = {}) => {
  return new Bark(config)
}
