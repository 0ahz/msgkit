import { z } from 'zod'
import { defu } from 'defu'
import { withQuery } from 'ufo'
import { ofetch } from 'ofetch'
import { isAbsoluteURL } from '../../utils'

const DING_WEBHOOK_URL = 'https://oapi.dingtalk.com/robot/'

const typeSchema = z.union([
  z.literal('text'),
  z.literal('link'),
  z.literal('markdown'),
  z.literal('actionCard'),
  z.literal('feedCard'),
])

const atSchema = z.object({
  atMobiles: z.optional(z.array(z.string())),
  atUserIds: z.optional(z.array(z.string())),
  isAtAll: z.optional(z.boolean()),
})

const secureSchema = z.object({
  timestamp: z.string().min(1),
  sign: z.string().min(1),
})

const optionsSchema = z.object({
  token: z.string().min(1),
  type: typeSchema,
  message: z.record(z.any()),
  at: z.optional(atSchema),
  secure: z.optional(secureSchema),
})

type DingWebhookOptions = z.infer<typeof optionsSchema>

type DingWebhookResponse = {
  errcode: number
  errmsg: string
  [k: string]: any
}

const messageToBody = (options: DingWebhookOptions) => {
  const body = {
    msgtype: options.type,
    [options.type]: options.message,
  }
  if (options.at) {
    body.at = options.at
  }
  return body
}

export class DingWebhook {
  constructor(private options: Partial<DingWebhookOptions> = {}) {
    this.options = defu(options, {})
  }

  static async send(options: DingWebhookOptions) {
    const parsedOptions = optionsSchema.parse(options)
    let url = isAbsoluteURL(parsedOptions.token)
      ? parsedOptions.token
      : `/send?access_token=${parsedOptions.token}`
    if (parsedOptions.secure) {
      url = withQuery(url, parsedOptions.secure)
    }
    return await ofetch<DingWebhookResponse>(url, {
      method: 'POST',
      baseURL: DING_WEBHOOK_URL,
      body: messageToBody(parsedOptions),
    })
  }

  async send(options?: Partial<DingWebhookOptions>) {
    const mergedOptions = defu(options, this.options)
    const parsedOptions = optionsSchema.parse(mergedOptions)
    return await DingWebhook.send(parsedOptions)
  }
}

export const createDingWebhook = (
  options: Partial<DingWebhookOptions> = {},
) => {
  return new DingWebhook(options)
}
