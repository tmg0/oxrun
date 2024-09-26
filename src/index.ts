import { execa } from 'execa'
import mri from 'mri'
import process from 'node:process'
import { resolve as resolveImport } from 'import-meta-resolve'

const argv = process.argv.slice(2)
const { _: scripts } = mri(argv)

function runNodeCommand(args: (string | string[])[] = []) {
  return execa('node', args.flat(), { stdio: 'inherit' })
}

export function main() {
  if (!scripts.length)
    return

  const path = resolveImport('@oxc-node/core/register', import.meta.url)

  runNodeCommand([
    ['--import', path],
    scripts
  ])
}
