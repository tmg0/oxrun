import { describe, expect, it } from 'vitest'
import { oxrun } from '../src'

describe('oxrun', async () => {
  it('import default', async () => {
    const mod = await oxrun.import('./test/fixtures/fibonacci.ts')
    expect(mod.default).toBe(55)
  })

  it('import const', async () => {
    const mod = await oxrun.import('./test/fixtures/fibonacci.ts')
    expect(mod.result).toBe(55)
  })
})
