import type { Options } from './types'
import { promises as fs } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import { transform } from '@oxc-node/core'
import { hash } from 'ohash'
import { createContext } from './context'

export const oxrun = Object.assign(
  async (scripts: string | string[]) => {
    const options: Options = { scripts: [scripts].flat() }
    const ctx = createContext(options)
    await ctx.run()
  },

  {
    async transform(id: string, code?: string) {
      if (!code)
        code = await fs.readFile(id, 'utf8')
      const output = transform(id, code)

      return {
        get code() {
          return output.source()
        },
        get map() {
          return output.sourceMap()
        },
      }
    },

    async import<T = any>(id: string) {
      const { code } = await this.transform(id)
      const key = hash({ id, code })
      const outfile = resolve(process.cwd(), `oxrun.${key}.mjs`)

      try {
        await fs.writeFile(outfile, code, 'utf8')
        const mod = await import(outfile)
        return mod as T
      }
      finally {
        fs.unlink(outfile)
      }
    },
  },
)
