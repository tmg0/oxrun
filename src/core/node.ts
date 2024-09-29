import { execa } from 'execa'

export function runNodeCommand(args: (string | string[])[] = []) {
  const controller = new AbortController()

  const subprocess = execa('node', args.flat(), {
    cancelSignal: controller.signal,
    stdio: 'inherit',
  })

  return {
    controller,
    subprocess,
  }
}
