import { z } from 'zod'
import { defu } from 'defu'
import { fetchPost } from '../../utils'

const PUSHOVER_BASE_URL = 'https://api.pushover.net/1/'

const optionsSchema = z.object({
  token: z.string().min(1),
  user: z.string().min(1),
  message: z.string(),
  title: z.optional(z.string()),
  device: z.optional(z.string()),
  html: z.optional(z.literal(1)),
  monospace: z.optional(z.literal(1)),
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

export type PushoverOptions = z.infer<typeof optionsSchema>

export type PushoverResponse = {
  status: number
  request: string
}

export class Pushover {
  constructor(private options: Partial<PushoverOptions> = {}) {
    this.options = defu(options, {})
  }

  static async send(options: PushoverOptions) {
    const body = optionsSchema.parse(options)
    const url = `${PUSHOVER_BASE_URL}/messages.json`
    return fetchPost<PushoverResponse>(url, body)
  }

  async send(options?: Partial<PushoverOptions>) {
    const mergedOptions = defu(options, this.options)
    const parsedOptions = optionsSchema.parse(mergedOptions)
    return await Pushover.send(parsedOptions)
  }
}

export const createPushover = (config: Partial<PushoverOptions> = {}) => {
  return new Pushover(config)
}
