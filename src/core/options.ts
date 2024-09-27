import type { Options } from './types'
import process from 'node:process'
import { destr } from 'destr'
import mri from 'mri'

const argv = process.argv.slice(2)

const { _: scripts, watch, ignore } = mri<Record<string, string | string[]>>(argv, {
  default: {
    watch: 'false',
    ignore: '',
  },
})

export function resolveOptions(): Options {
  return {
    scripts,
    ignore: [ignore].flat().filter(Boolean),
    get watch() {
      const encodeGlobs = [watch].flat()
      const r = encodeGlobs.map(glob => destr<boolean | string>(glob))
      if (r.includes(false))
        return false
      return r.filter(v => !['', true].includes(v)) as string[]
    },
  }
}
