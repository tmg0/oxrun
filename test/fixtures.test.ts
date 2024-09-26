import { execa } from 'execa'
import { describe, expect, it } from 'vitest'

describe('fixtures', async () => {
  it('fibonacci', async () => {
    const { stdout } = await execa('node', [
      './bin/oxrun.js',
      './test/fixtures/fibonacci.ts',
    ])

    expect(stdout).toMatchSnapshot()
  })
})
