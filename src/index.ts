import { execa } from 'execa'
import mri from 'mri'
import process from 'node:process'
import { resolve } from 'node:path'
import { resolve as resolveImport } from 'import-meta-resolve'

const argv = process.argv.slice(2)
const { _: entries } = mri(argv)

function runNodeCommand(args: (string | string[])[] = []) {
  return execa('node', args.flat(), { stdio: 'inherit' })
}

export function main() {
  if (!entries.length)
    return

  const root = process.cwd()
  const path = resolveImport('@oxc-node/core/register', import.meta.url)

  for (const entry of entries) {
    runNodeCommand([
      ['--import', path],
      resolve(root, entry)
    ])
  }
}
