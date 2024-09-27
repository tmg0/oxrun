import type { Options } from './core/types'
import { promises as fs } from 'node:fs'
import { transform } from '@oxc-node/core'
import { nanoid } from 'nanoid'
import { createContext } from './core/context'
import { resolveOptions } from './core/options'

export async function main() {
  const options = resolveOptions()
  const ctx = createContext(options)
  ctx.setup()
  await ctx.run()
}

export const oxrun = Object.assign(
  async (scripts: string | string[]) => {
    const options: Options = { scripts: [scripts].flat(), watch: false }
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
      const outfile = `./oxrun.${nanoid()}.mjs`
      await fs.writeFile(outfile, code, 'utf8')
      const mod = await import(outfile)
      fs.unlink(outfile)
      return mod as T
    },
  },
)

export default oxrun
