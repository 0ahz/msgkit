import { describe, expect, it } from 'vitest'

import { FeishuWebhook, createFeishuWebhook } from '../../src/provider/feishu'

const hook = createFeishuWebhook({
  token: process.env.TEST_FEISHU_WEBHOOK_TOKEN,
})

describe('feishu', () => {
  it('FeishuWebhook.send', async () => {
    const result = await FeishuWebhook.send({
      token: `https://open.feishu.cn/open-apis/bot/v2/hook/${process.env.TEST_FEISHU_WEBHOOK_TOKEN!}`,
      type: 'text',
      message: {
        text: 'Here is the message content, which can be a bit long.',
      },
    })
    console.log(result)
    expect(result.code).toBe(0)
  })

  it('createFeishuWebhook hook.send', async () => {
    const result = await hook.send({
      type: 'text',
      message: {
        text: 'Here is the message content, which can be a bit long.',
      },
    })
    console.log(result)
    expect(result.code).toBe(0)
  })
})
