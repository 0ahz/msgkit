import { describe, expect, it } from 'vitest'

import { WecomWebhook, createWecomWebhook } from '../../src/wecom'

const hook = createWecomWebhook({
  token: process.env.TEST_WECOM_WEBHOOK_TOKEN,
})

describe('wecom', () => {
  it('WecomWebhook.send', async () => {
    const result = await WecomWebhook.send({
      token: process.env.TEST_WECOM_WEBHOOK_TOKEN!,
      type: 'text',
      message: {
        content: 'Here is the message content, which can be a bit long.',
      },
    })
    console.log(result)
    expect(result.errcode).toBe(0)
  })

  it('createWecomWebhook hook.send', async () => {
    const result = await hook.send({
      type: 'text',
      message: {
        content: 'Here is the message content, which can be a bit long.',
      },
    })
    console.log(result)
    expect(result.errcode).toBe(0)
  })
})
