import { createContext } from './core/context'
import { resolveOptions } from './core/options'

export async function main() {
  const options = resolveOptions()
  const ctx = createContext(options)
  ctx.setup()
  await ctx.run()
}
