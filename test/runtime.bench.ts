import { execa } from 'execa'
import { bench, describe } from 'vitest'

function runOxrunCommand(path: string) {
  return execa('node', [
    './bin/oxrun.js',
    path,
  ])
}

function runJitiCommand(path: string) {
  return execa('jiti', [path])
}

function runTsxCommand(path: string) {
  return execa('tsx', [path])
}

describe('fibonacci', async () => {
  bench('oxrun', () => {
    runOxrunCommand('./test/fixtures/fibonacci.ts')
  })

  bench('jiti', () => {
    runJitiCommand('./test/fixtures/fibonacci.ts')
  })

  bench('tsx', () => {
    runTsxCommand('./test/fixtures/fibonacci.ts')
  })
})
