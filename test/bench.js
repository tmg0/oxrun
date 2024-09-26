import { execa } from 'execa'
import { bench, run } from 'mitata'

bench('oxrun', async () => await execa('node', ['./bin/oxrun.js', './test/fixtures/fibonacci.ts'])).baseline(true)
bench('jiti', async () => await execa('jiti', ['./test/fixtures/fibonacci.ts']))
bench('tsx', async () => await execa('tsx', ['./test/fixtures/fibonacci.ts']))

run()
