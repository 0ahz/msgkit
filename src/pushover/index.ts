import { z } from 'zod'
import { defu } from 'defu'
import { ofetch } from 'ofetch'
import { BaseFetch, type BaseFetchOptions } from '../core/fetch'

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

export const sendPushover = async (options: PushoverConfig) => {
  const body = configSchema.parse(options)
  return ofetch<PushoverResponse>('/messages.json', {
    method: 'POST',
    baseURL: PUSHOVER_BASE_URL,
    body,
  })
}

export class Pushover extends BaseFetch {
  constructor(private config: Partial<PushoverConfig & BaseFetchOptions> = {}) {
    const { baseURL, ...poConfig } = config
    super({ baseURL: baseURL || PUSHOVER_BASE_URL })

    this.config = defu(poConfig, {})
  }

  async send(options?: PushoverMessageOptions) {
    const mergedOption = defu(options, this.config)
    const body = configSchema.parse(mergedOption)
    return await this.fetch<PushoverResponse>({
      url: '/messages.json',
      method: 'POST',
      body,
    })
  }

  async checkLicenses(options?: Partial<PushoverLicensesOptions>) {
    const mergedOption = defu(options, this.config)
    const { token } = optionsLicensesSchema.parse(mergedOption)
    return await this.fetch<PushoverResponse>({
      url: '/licenses.json',
      query: { token },
      method: 'GET',
    })
  }
}

export const createPushover = (
  config: Partial<PushoverConfig & BaseFetchOptions> = {},
) => {
  return new Pushover(config)
}
