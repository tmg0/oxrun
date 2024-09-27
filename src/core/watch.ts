import type { OxrunContext } from './types'
import { watch } from 'chokidar'
import { debounce } from 'perfect-debounce'

export function createWatcher(ctx: OxrunContext) {
  const reRun = debounce(() => {
    ctx.run()
  }, 100)

  const watcher = watch(ctx.options.watch as string, {
    ignoreInitial: true,
    ignorePermissionErrors: true,
    ignored: (id) => {
      return id.includes('/.git/') || id.includes('/node_modules/')
    },
  })

  watcher.on('all', () => {
    reRun()
  })

  return watcher
}
