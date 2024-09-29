import type { OxrunContext } from './types'
import process from 'node:process'
import { watch } from 'chokidar'
import { debounce } from 'perfect-debounce'

export function createWatcher(ctx: OxrunContext) {
  const reRun = debounce(() => {
    if (ctx.isRunning)
      ctx.abort()
    ctx.run()
  }, 100)

  const excludes = [
    '.git',
    'node_modules',

    ...ctx.options.ignore?.filter(Boolean) as string[],
  ]

  const watcher = watch(ctx.options.watch as string[], {
    ignoreInitial: true,
    ignorePermissionErrors: true,
    ignored: [
      id => /oxrun\.[\s\S]*?\.mjs$/.test(id),
      id => excludes.some(v => id.includes(v)),
    ],
  })

  watcher.on('all', reRun)

  process.on('exit', () => {
    ctx.watcher?.close()
  })

  return watcher
}
