import { z } from 'zod'
import { defu } from 'defu'
import { ofetch } from 'ofetch'
import { BaseFetch, type BaseFetchOptions } from '../core/fetch'

const WECOM_WEBHOOK_URL = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/'

// https://developer.work.weixin.qq.com/document/path/91770
const wecomWebhookSchema = z.object({
  token: z.string().min(1),
  type: z.union([
    z.literal('text'),
    z.literal('markdown'),
    z.literal('image'),
    z.literal('news'),
    z.literal('file'),
    z.literal('voice'),
    z.literal('template_card'),
  ]),
  message: z.record(z.any()),
})

export type WecomWebhookConfig = z.infer<typeof wecomWebhookSchema>

export type WecomWebhookOptions = Partial<WecomWebhookConfig>

export type WecomWebhookResponse = {
  errcode: number
  errmsg: string
  [k: string]: any
}

export const sendWecomWebhook = (options: WecomWebhookConfig) => {
  const { token, type, message } = wecomWebhookSchema.parse(options)
  return ofetch<WecomWebhookResponse>('/send', {
    method: 'POST',
    baseURL: WECOM_WEBHOOK_URL,
    query: { key: token },
    body: { msgtype: type, [type]: message },
  })
}

export class WecomWebhook extends BaseFetch {
  constructor(
    private config: Partial<WecomWebhookConfig & BaseFetchOptions> = {},
  ) {
    const { baseURL, ...wwConfig } = config
    super({ baseURL: baseURL || WECOM_WEBHOOK_URL })

    this.config = defu(wwConfig, {})
  }

  async send(options?: WecomWebhookOptions) {
    const mergedOptions = defu(options, this.config)
    const { token, type, message } = wecomWebhookSchema.parse(mergedOptions)
    return await this.fetch<WecomWebhookResponse>({
      url: '/send',
      method: 'POST',
      query: { key: token },
      body: { msgtype: type, [type]: message },
    })
  }
}

export const createWecomWebhook = (
  config: Partial<WecomWebhookConfig & BaseFetchOptions> = {},
) => {
  return new WecomWebhook(config)
}
