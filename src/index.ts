import type { Options } from './core/types'
import { promises as fs } from 'node:fs'
import { resolve } from 'node:path'
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

    async import(id: string) {
      const { code } = await this.transform(resolve(id))
      const outfile = `./oxrum.${nanoid()}.mjs`
      await fs.writeFile(outfile, code, 'utf8')
      const mod = await import(outfile)
      fs.unlink(outfile)
      return mod
    },
  },
)

export default oxrun
