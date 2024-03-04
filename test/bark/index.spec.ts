import { describe, expect, it } from 'vitest'

import { createBark } from '../../src/bark'

const bark = createBark({
  token: process.env.TEST_BARK_TOKEN,
})

describe('bark', () => {
  it('bark.send', async () => {
    const result = await bark.send({
      body: 'Here is the message content, which can be a bit long.',
      title: 'Here is the message title',
    })
    console.log(result)
    expect(result.code).toBe(200)
  })
})
