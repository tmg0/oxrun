import type { Options } from './types'
import process from 'node:process'
import { destr } from 'destr'
import mri from 'mri'

const argv = process.argv.slice(2)

const { _: scripts, watch } = mri<Record<string, string>>(argv, {
  default: {
    watch: 'false',
  },
})

export function resolveOptions(): Options {
  return {
    scripts,

    watch: (() => {
      const r = destr<boolean | string>(watch)
      if (['', true].includes(r))
        return process.cwd()
      return r as string
    })(),
  }
}
