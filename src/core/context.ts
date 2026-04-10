import type { FSWatcher } from 'rerun-watcher'
import type { Options } from './types'
import { resolve } from 'import-meta-resolve'
import { runNodeCommand } from './node'
import { createWatcher } from './watch'

export function createContext(options: Options) {
  let watcher: FSWatcher | undefined

  const ctx = {
    options,
    watcher,
    watch,
    run,
  }

  async function watch() {
    if (options.watch && options.watch.length)
      ctx.watcher = await createWatcher(ctx)
  }

  function run() {
    const register = '@oxc-node/core/register'
    const path = resolve(register, import.meta.url)
    return runNodeCommand(['--import', path, options.scripts])
  }

  return ctx
}
