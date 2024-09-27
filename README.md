# oxrun

[![NPM version](https://img.shields.io/npm/v/oxrun)](https://www.npmjs.com/package/oxrun)

⚓ Typescript node runtime powered by [oxc-node](https://github.com/oxc-project/oxc-node)

## Feature

🚀 Super fast typescript parser

🥞 Run ts / esm with a single command

🙅 No installation required

## Usage

```bash
npx oxrun hello.ts
```

or install as dependency

```bash
pnpm add oxrun -D
```

```json
{
  "scripts": {
    "dev": "oxrun scripts/dev.ts"
  }
}
```

## Props

### `props.scripts`

- Type: `string[] | string`
- Default: `''`

### `props.watch`

- Type: `false | string`
- Default: `false`

### `oxrun.import`

You can also use `oxrun` as a module, for import / transform `ts` files.

- Type: `() => Module`

```ts
// hello.ts
const msg = 'hello'
console.log(msg)
export default msg
```

```ts
// entry.js
import oxrun from 'oxrun'

(async () => {
  await oxrun('./hello.ts') // output: hello
  const mod = await oxrun.import('./hello.ts')
  console.log(mod.default)  // output: hello
})()
```

## Benchmark

```bash
clk: ~3.26 GHz
cpu: Apple M2
runtime: node (arm64-darwin)

  name                  hz     min     max     mean      p75     p99    p995    p999       rme  samples
· oxrun            71.5572  1.1639  137.01  13.9748  16.0956  137.01  137.01  137.01   ±50.84%       40   fastest
· jiti (no-cache)  49.6227  0.6183  241.34  20.1521   9.4016  241.34  241.34  241.34   ±88.54%       30
· tsx (no-cache)   40.5017  2.3162  234.52  24.6903  16.3226  234.52  234.52  234.52   ±89.86%       23
· ts-node          19.4521  3.0683  238.53  51.4084  38.0820  238.53  238.53  238.53  ±104.82%       10   slowest

oxrun
1.44x faster than jiti (no-cache)
1.77x faster than tsx (no-cache)
3.68x faster than ts-node
```

## License

[MIT](./LICENSE) License © 2024-PRESENT [Tamago](https://github.com/tmg0)
