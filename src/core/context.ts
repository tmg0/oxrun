import type { FSWatcher } from 'chokidar'
import type { Options } from './types'
import { resolve } from 'import-meta-resolve'
import { runNodeCommand } from './node'
import { createWatcher } from './watch'

export function createContext(options: Options) {
  let isRunning = false
  let watcher: FSWatcher | undefined

  const ctx = {
    options,
    isRunning,
    watcher,
    setup,
    run,
  }

  function setup() {
    if (options.watch && options.watch.length)
      watcher = createWatcher(ctx)
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
