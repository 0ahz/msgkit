import { z } from 'zod'
import { defu } from 'defu'
import { ofetch } from 'ofetch'
import { isAbsoluteURL } from '../utils'

const BARK_BASE_URL = 'https://api.day.app/'

const optionsSchema = z.object({
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

export type BarkOptions = z.infer<typeof optionsSchema>

export type BarkResponse = {
  code: number
  message: string
  timestamp: string
}

export class Bark {
  constructor(private options: Partial<BarkOptions> = {}) {
    this.options = defu(options, {})
  }

  static async send(options: BarkOptions) {
    const { token, ...body } = optionsSchema.parse(options)
    const url = isAbsoluteURL(token) ? token : `/${token}`
    return await ofetch<BarkResponse>(url, {
      method: 'POST',
      baseURL: BARK_BASE_URL,
      body,
    })
  }

  async send(options?: Partial<BarkOptions>) {
    const mergedOptions = defu(options, this.options)
    const parsedOptions = optionsSchema.parse(mergedOptions)
    return await Bark.send(parsedOptions)
  }
}

export const createBark = (options: Partial<BarkOptions> = {}) => {
  return new Bark(options)
}
