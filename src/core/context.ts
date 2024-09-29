import type { FSWatcher } from 'chokidar'
import type { Options } from './types'
import { resolve } from 'import-meta-resolve'
import { runNodeCommand } from './node'
import { createWatcher } from './watch'

export function createContext(options: Options) {
  let watcher: FSWatcher | undefined
  let _controller: AbortController | undefined

  const ctx = {
    options,
    isRunning: false,
    watcher,
    setup,
    run,
    abort,
  }

  function setup() {
    if (options.watch && options.watch.length)
      ctx.watcher = createWatcher(ctx)
  }

  async function run() {
    try {
      if (!options.scripts.length)
        return

      const register = '@oxc-node/core/register'
      const path = resolve(register, import.meta.url)
      const { controller, subprocess } = runNodeCommand(['--import', path, options.scripts])
      _controller = controller
      ctx.isRunning = true
      await subprocess
      ctx.isRunning = false
    }
    catch {
      ctx.isRunning = false
    }
  }

  function abort() {
    _controller?.abort()
    ctx.isRunning = false
  }

  return ctx
}
