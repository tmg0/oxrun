import { execa } from 'execa'

export function runNodeCommand(args: (string | string[])[] = []) {
  return execa('node', args.flat(), { stdio: 'inherit' })
}
