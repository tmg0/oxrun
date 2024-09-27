import type { Options } from './types'
import { resolve } from 'import-meta-resolve'
import { runNodeCommand } from './node'
import { createWatcher } from './watch'

export function createContext(options: Options) {
  let isRunning = false

  const ctx = {
    options,
    isRunning,
    setup,
    run,
  }

  function setup() {
    if (options.watch)
      createWatcher(ctx)
  }

  async function run() {
    if (!options.scripts.length)
      return

    const path = resolve('@oxc-node/core/register', import.meta.url)

    isRunning = true
    await runNodeCommand(['--import', path, options.scripts])
    isRunning = false
  }

  return ctx
}
