/* eslint-disable e18e/prefer-static-regex */
import type { OxrunContext } from './types'
import { createRerunWatcher } from 'rerun-watcher'

export function createWatcher(ctx: OxrunContext) {
  const excludes = [
    '.git',
    'node_modules',
    ...ctx.options.ignore?.filter(Boolean) as string[],
  ]
  return createRerunWatcher(
    ctx.options.watch as string[],
    ctx.run,
    {
      name: 'oxrun',
      ignoreInitial: true,
      ignorePermissionErrors: true,
      ignored: [
        id => /oxrun\.[\s\S]*?\.mjs$/.test(id),
        id => excludes.some(v => id.includes(v)),
      ],
    },
  )
}
