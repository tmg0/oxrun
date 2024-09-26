import { execa } from 'execa'
import mri from 'mri'
import process from 'node:process'
import { resolve } from 'import-meta-resolve'
import chokidar from 'chokidar'

interface Options {
  _: string[]
  watch: string
}

const argv = process.argv.slice(2)

const { _: scripts, watch } = mri<Options>(argv, {
  default: {
    watch: 'false'
  }
})

let isRunning = false

function runNodeCommand(args: (string | string[])[] = []) {
  return execa('node', args.flat(), { stdio: 'inherit' })
}

async function run() {
  if (!scripts.length)
    return

  const path = resolve('@oxc-node/core/register', import.meta.url)

  isRunning = true
  await runNodeCommand([
    ['--import', path],
    scripts
  ])
  isRunning = false
}

function setupWatcher() {
  const watcher = chokidar.watch(watch)
  watcher.on('change', () => { run() })
  return watcher
}

export async function main() {
  if (watch && watch !== 'false')
    setupWatcher()
  await run()
}
