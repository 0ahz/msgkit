import { z } from 'zod'
import { defu } from 'defu'
import { ofetch } from 'ofetch'
import { BaseFetch, type BaseFetchOptions } from '../core/fetch'

const FEISHU_WEBHOOK_URL = 'https://open.feishu.cn/open-apis/bot/v2/hook/'

// https://open.feishu.cn/document/client-docs/bot-v3/add-custom-bot

const feishuWebhookMsgTypeSchema = z.union([
  z.literal('text'),
  z.literal('post'),
  z.literal('share_chat'),
  z.literal('image'),
  z.literal('interactive'),
])

const feishuWebhookSchema = z.object({
  token: z.string().min(1),
  type: feishuWebhookMsgTypeSchema,
  message: z.record(z.any()),
  secure: z.optional(
    z.object({
      timestamp: z.string().min(1),
      sign: z.string().min(1),
    }),
  ),
})

export type FeishuWebhookMessageType = z.infer<
  typeof feishuWebhookMsgTypeSchema
>
export type FeishuWebhookConfig = z.infer<typeof feishuWebhookSchema>

export type FeishuWebhookOptions = Partial<FeishuWebhookConfig>

export type FeishuWebhookResponse = {
  code: number
  msg: string
  data: Record<string, any>
  [k: string]: any
}

const messageToBody = ({
  type,
  message,
  secure,
}: Pick<FeishuWebhookConfig, 'type' | 'message' | 'secure'>) => {
  const body: Record<string, any> = { msg_type: type }
  if (['interactive'].includes(type)) {
    body.card = message
  } else {
    body.content = message
  }
  if (secure) {
    Object.assign(body, secure)
  }
  return body
}

export const sendFeishuWebhook = (options: FeishuWebhookConfig) => {
  const { token, type, message, secure } = feishuWebhookSchema.parse(options)
  return ofetch<FeishuWebhookResponse>(`/${token}`, {
    method: 'POST',
    baseURL: FEISHU_WEBHOOK_URL,
    body: messageToBody({ type, message, secure }),
  })
}

export class FeishuWebhook extends BaseFetch {
  constructor(
    private config: Partial<FeishuWebhookConfig & BaseFetchOptions> = {},
  ) {
    const { baseURL, ...wwConfig } = config
    super({ baseURL: baseURL || FEISHU_WEBHOOK_URL })

    this.config = defu(wwConfig, {})
  }

  async send(options?: FeishuWebhookOptions) {
    const mergedOptions = defu(options, this.config)
    const { token, type, message, secure } =
      feishuWebhookSchema.parse(mergedOptions)
    return await this.fetch<FeishuWebhookResponse>({
      url: `/${token}`,
      method: 'POST',
      body: messageToBody({ type, message, secure }),
    })
  }
}

export const createFeishuWebhook = (
  config: Partial<FeishuWebhookConfig & BaseFetchOptions> = {},
) => {
  return new FeishuWebhook(config)
}
