import { describe, expect, it } from 'vitest'

import { createPushover } from '../../src/pushover'

const pushover = createPushover({
  token: process.env.PUSHOVER_TOKEN,
  user: process.env.PUSHOVER_USER,
})

describe('pushover', () => {
  it('pushover.send', async () => {
    const result = await pushover.send({
      message: 'Here is the message content, which can be a bit long.',
      title: 'Here is the message title',
    })
    console.log(result)
    expect(result.status).toBe(1)
  })

  it('pushover.checkLicenses', async () => {
    const result = await pushover.checkLicenses()
    console.log(result)
    expect(result.status).toBe(1)
  })
})
