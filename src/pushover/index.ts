import { z } from 'zod'
import { defu } from 'defu'
import { Base } from '../base'
import type { BaseOptions } from '../base'

const PUSHOVER_BASE_URL = 'https://api.pushover.net/1/'

// https://pushover.net/api
const configSchema = z.object({
  token: z.string().min(1),
  user: z.string().min(1),
  message: z.string(),
  title: z.optional(z.string()),
  device: z.optional(z.string()),
  html: z.optional(z.literal(1)),
  priority: z.optional(
    z.union([
      z.literal(-2), // Lowest Priority
      z.literal(-1), // Low Priority
      z.literal(0), // Normal Priority
      z.literal(1), // High Priority
      z.literal(2), // Emergency Priority
    ]),
  ),
  sound: z.optional(z.string()),
  timestamp: z.optional(z.number().int().min(0)),
  ttl: z.optional(z.number().int().min(0)),
  url: z.optional(z.string().url()),
  url_title: z.optional(z.string()),
})

const configPartialSchema = configSchema.partial()

const optionsMessageSchema = configPartialSchema.extend({
  message: z.string(),
})

const optionsLicensesSchema = configSchema.pick({ token: true })

export type PushoverConfig = z.infer<typeof configSchema>

export type PushoverMessageOptions = z.infer<typeof optionsMessageSchema>

export type PushoverLicensesOptions = z.infer<typeof optionsLicensesSchema>

export type PushoverResponse = {
  status: number
  request: string
}

export class Pushover extends Base {
  constructor(private config: Partial<PushoverConfig & BaseOptions> = {}) {
    const { baseURL, ...poConfig } = config
    super({ baseURL: baseURL || PUSHOVER_BASE_URL })

    this.config = defu(poConfig, {})
  }

  async send(options?: PushoverMessageOptions) {
    const mergedOption = defu(options, this.config)
    const body = configSchema.parse(mergedOption)
    return await this.request<PushoverResponse>({
      method: 'POST',
      url: '/messages.json',
      body,
    })
  }

  async checkLicenses(options?: Partial<PushoverLicensesOptions>) {
    const mergedOption = defu(options, this.config)
    const { token } = optionsLicensesSchema.parse(mergedOption)
    return await this.request<PushoverResponse>({
      url: `/licenses.json?token=${token}`,
    })
  }
}

export const createPushover = (
  config: Partial<PushoverConfig & BaseOptions> = {},
) => {
  return new Pushover(config)
}
