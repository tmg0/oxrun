import { execa } from 'execa'
import { bench, describe } from 'vitest'

function runOxrunCommand(path = '') {
  return execa('node', [
    './bin/oxrun.js',
    path,
  ])
}

function runJitiCommand(path = '') {
  return execa('jiti', [
    path,
    '--fs-cache',
    'false',
    '--module-cache',
    'false',
  ])
}

function runTsxCommand(path = '') {
  return execa('tsx', [
    path,
    '--no-cache',
    'true',
  ])
}

function runTsNodeCommand(path = '') {
  return execa('ts-node', [path])
}

describe('fibonacci', async () => {
  bench('oxrun', () => {
    runOxrunCommand('./test/fixtures/fibonacci.ts')
  })

  bench('jiti (no-cache)', () => {
    runJitiCommand('./test/fixtures/fibonacci.ts')
  })

  bench('tsx (no-cache)', () => {
    runTsxCommand('./test/fixtures/fibonacci.ts')
  })

  bench('ts-node', () => {
    runTsNodeCommand('./test/fixtures/fibonacci.ts')
  })
})
