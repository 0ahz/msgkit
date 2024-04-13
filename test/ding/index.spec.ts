import { describe, expect, it } from 'vitest'

import { DingWebhook, createDingWebhook } from '../../src/ding'

const hook = createDingWebhook({
  token: process.env.TEST_DING_WEBHOOK_TOKEN,
})

describe('ding', () => {
  it('DingWebhook.send', async () => {
    const result = await DingWebhook.send({
      token: `https://oapi.dingtalk.com/robot/send?access_token=${process.env.TEST_DING_WEBHOOK_TOKEN!}`,
      type: 'text',
      message: {
        content: 'Here is the message content, which can be a bit long. test',
      },
    })
    console.log(result)
    expect(result.errcode).toBe(0)
  })

  it('createDingWebhook hook.send', async () => {
    const result = await hook.send({
      type: 'text',
      message: {
        content: 'Here is the message content, which can be a bit long. test',
      },
    })
    console.log(result)
    expect(result.errcode).toBe(0)
  })
})
