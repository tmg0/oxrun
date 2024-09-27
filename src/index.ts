import type { Options } from './core/types'
import { createContext } from './core/context'
import { resolveOptions } from './core/options'
import { transform } from '@oxc-node/core'
import { promises as fs } from 'fs'

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
        }
      }
    }
  },
)

export default oxrun
