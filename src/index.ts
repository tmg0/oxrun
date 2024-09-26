import { execa } from 'execa'
import mri from 'mri'
import process from 'node:process'
import { resolve } from 'import-meta-resolve'
import { watch as cWatch } from 'chokidar'
import { debounce } from 'perfect-debounce'

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

const reRun = debounce(async () => {
  await run()
}, 100)

function setupWatcher() {
  const watcher = cWatch(watch, {
    ignoreInitial: true,
    ignorePermissionErrors: true,
    ignored: (id) => {
      return id.includes('/.git/') || id.includes('/node_modules/')
    },
  })

  watcher.on('all', () => { reRun() })
  return watcher
}

export async function main() {
  if (watch && watch !== 'false')
    setupWatcher()
  await run()
}
