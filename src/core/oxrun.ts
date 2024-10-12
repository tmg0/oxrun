import type { Options } from './types'
import { hash } from 'ohash'
import { createContext } from './context'

const isBrowser: boolean = !!globalThis.window
const oxc = isBrowser ? import('@oxc-node/core-wasm32-wasi') : import('@oxc-node/core')

export const oxrun = Object.assign(
  async (scripts: string | string[]) => {
    const options: Options = { scripts: [scripts].flat() }
    const ctx = createContext(options)
    await ctx.run()
  },

  {
    async transform(id: string, code?: string) {
      const { transform } = await oxc

      if (isBrowser) {
        if (!code)
          return { code: '', map: '' }
        const output = transform(id, code)
        return {
          get code() {
            return output.source()
          },
          get map() {
            return output.sourceMap()
          },
        }
      }

      const { promises: fs } = await import('node:fs')

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
      if (isBrowser)
        return undefined as T

      const [{ promises: fs }, { resolve }, process] = await Promise.all([
        import('node:fs'),
        import('node:path'),
        import('node:process'),
      ])

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
