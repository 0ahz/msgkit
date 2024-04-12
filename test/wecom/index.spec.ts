import { describe, expect, it } from 'vitest'

import { sendWecomWebhook, createWecomWebhook } from '../../src/wecom'

const ww = createWecomWebhook({
  token: process.env.TEST_WECOM_WEBHOOK_TOKEN,
})

describe('wecom', () => {
  it('sendWecomWebhook', async () => {
    const result = await sendWecomWebhook({
      token: process.env.TEST_WECOM_WEBHOOK_TOKEN!,
      type: 'text',
      message: {
        content: 'Here is the message content, which can be a bit long.',
      },
    })
    console.log(result)
    expect(result.errcode).toBe(0)
  })

  it('ww.send', async () => {
    const result = await ww.send({
      type: 'text',
      message: {
        content: 'Here is the message content, which can be a bit long.',
      },
    })
    console.log(result)
    expect(result.errcode).toBe(0)
  })
})
