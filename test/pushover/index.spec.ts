import { describe, expect, it } from 'vitest'

import { Pushover, createPushover } from '../../src/pushover'

const pushover = createPushover({
  token: process.env.TEST_PUSHOVER_TOKEN,
  user: process.env.TEST_PUSHOVER_USER,
})

describe('pushover', () => {
  it('Pushover.send', async () => {
    const result = await Pushover.send({
      token: process.env.TEST_PUSHOVER_TOKEN!,
      user: process.env.TEST_PUSHOVER_USER!,
      message: 'Here is the message content, which can be a bit long.',
      title: 'Here is the message title',
    })
    console.log(result)
    expect(result.status).toBe(1)
  })

  it('createPushover pushover.send', async () => {
    const result = await pushover.send({
      message: 'Here is the message content, which can be a bit long.',
      title: 'Here is the message title',
    })
    console.log(result)
    expect(result.status).toBe(1)
  })
})
