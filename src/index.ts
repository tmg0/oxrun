import { createContext } from './core/context'
import { resolveOptions } from './core/options'
import { oxrun } from './core/oxrun'

export async function main() {
  const options = resolveOptions()
  const ctx = createContext(options)
  ctx.setup()
  await ctx.run()
}

export { oxrun }

export default oxrun
