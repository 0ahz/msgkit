import { z } from 'zod'
import { defu } from 'defu'
import { ofetch } from 'ofetch'
import { isAbsoluteURL } from '../../utils'

const FEISHU_WEBHOOK_URL = 'https://open.feishu.cn/open-apis/bot/v2/hook/'

const typeSchema = z.union([
  z.literal('text'),
  z.literal('post'),
  z.literal('share_chat'),
  z.literal('image'),
  z.literal('interactive'),
])

const secureSchema = z.object({
  timestamp: z.string().min(1),
  sign: z.string().min(1),
})

const optionsSchema = z.object({
  token: z.string().min(1),
  type: typeSchema,
  message: z.record(z.any()),
  secure: z.optional(secureSchema),
})

export type FeishuWebhookOptions = z.infer<typeof optionsSchema>

export type FeishuWebhookResponse = {
  code: number
  msg: string
  data: Record<string, any>
  [k: string]: any
}

const messageToBody = (options: FeishuWebhookOptions) => {
  const body: Record<string, any> = { msg_type: options.type }
  if (['interactive'].includes(options.type)) {
    body.card = options.message
  } else {
    body.content = options.message
  }
  if (options.secure) {
    Object.assign(body, options.secure)
  }
  return body
}

export class FeishuWebhook {
  constructor(private options: Partial<FeishuWebhookOptions> = {}) {
    this.options = defu(options, {})
  }

  static async send(options: Partial<FeishuWebhookOptions>) {
    const parsedOptions = optionsSchema.parse(options)
    const url = isAbsoluteURL(parsedOptions.token)
      ? parsedOptions.token
      : `/${parsedOptions.token}`
    return await ofetch<FeishuWebhookResponse>(url, {
      method: 'POST',
      baseURL: FEISHU_WEBHOOK_URL,
      body: messageToBody(parsedOptions),
    })
  }

  async send(options?: Partial<FeishuWebhookOptions>) {
    const mergedOptions = defu(options, this.options)
    const parsedOptions = optionsSchema.parse(mergedOptions)
    return await FeishuWebhook.send(parsedOptions)
  }
}

export const createFeishuWebhook = (
  options: Partial<FeishuWebhookOptions> = {},
) => {
  return new FeishuWebhook(options)
}
