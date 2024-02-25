import { describe, expect, it } from 'vitest'

import { name, version } from '../package.json'

describe('PKG INFO', () => {
  it('NAME: ' + name, () => {
    expect(name).toBe(name)
  })

  it('VERSION: ' + version, () => {
    expect(version).toBe(version)
  })
})
