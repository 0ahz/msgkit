import { z } from 'zod'
import { defu } from 'defu'
import { withQuery } from 'ufo'
import { isAbsoluteURL, fetchPost } from '../../utils'

const WECOM_WEBHOOK_URL = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/'

const typeSchema = z.union([
  z.literal('text'),
  z.literal('markdown'),
  z.literal('image'),
  z.literal('news'),
  z.literal('file'),
  z.literal('voice'),
  z.literal('template_card'),
])

const optionsSchema = z.object({
  token: z.string().min(1),
  type: typeSchema,
  message: z.record(z.any()),
})

export type WecomWebhookOptions = z.infer<typeof optionsSchema>

export type WecomWebhookResponse = {
  errcode: number
  errmsg: string
  [k: string]: any
}

const messageToBody = (options: WecomWebhookOptions) => {
  return { msgtype: options.type, [options.type]: options.message }
}

export class WecomWebhook {
  constructor(private options: Partial<WecomWebhookOptions> = {}) {
    this.options = defu(options, {})
  }

  static async send(options: WecomWebhookOptions) {
    const parsedOptions = optionsSchema.parse(options)
    let url = isAbsoluteURL(parsedOptions.token)
      ? parsedOptions.token
      : `${WECOM_WEBHOOK_URL}/send`
    url = withQuery(url, { key: parsedOptions.token })
    return await fetchPost<WecomWebhookResponse>(
      url,
      messageToBody(parsedOptions),
    )
  }

  async send(options?: Partial<WecomWebhookOptions>) {
    const mergedOptions = defu(options, this.options)
    const parsedOptions = optionsSchema.parse(mergedOptions)
    return await WecomWebhook.send(parsedOptions)
  }
}

export const createWecomWebhook = (
  options: Partial<WecomWebhookOptions> = {},
) => {
  return new WecomWebhook(options)
}
