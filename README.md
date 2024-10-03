# oxrun

[![NPM version](https://img.shields.io/npm/v/oxrun)](https://www.npmjs.com/package/oxrun)

⚓ Typescript node runtime powered by [oxc-node](https://github.com/oxc-project/oxc-node)

## Feature

🚀 Super fast typescript transformer by [oxc](https://github.com/oxc-project/oxc)

🧭 Run ts file with a single command

🙅 No installation required

👜 Import typescript in nodejs as a module

## Usage

### `CLI`

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

### `Programmatic`

```ts
// hello.ts
const msg = 'hello'
console.log(msg)
export default msg
```

```js
// entry.js
import oxrun from 'oxrun'

(async () => {
  await oxrun('./hello.ts') // output: hello
  const mod = await oxrun.import('./hello.ts')
  console.log(mod.default) // output: hello
})()
```

[nuxlite](https://github.com/tmg0/nuxlite) use oxrun as typescript config file parser, and here is the [source](https://github.com/tmg0/nuxlite/blob/main/packages/builder/src/core.ts):

```ts
export async function resolveNuxliteConfig() {
  const { default: config } = await oxrun.import<{ default: NuxliteConfig }>('./nuxlite.config.ts')

  return defu(config, {
    builder: 'rsbuild',
    server: {
      port: Number(process.env.NUXLITE_PORT) || 5173,
    },
  })
}
```

## Props

### `props.watch`

- Type: `false | string`
- Default: `false`

Oxrun supports watch mode with `--watch` and this will automatically re-run your script whenever any of files under root dir changed.

Watch can be a boolean or string (Can be set to a string of the path), empty string `''` will be parse as a truthy value like `true`.

### `props.ignore`

- Type: `string`
- Default: `undefined`

## Benchmark

```bash
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

## Development

- Clone this repository
- Install dependencies using `pnpm install`
- Run `pnpm build`
- Run `pnpm test`

## Credits

The oxrun project is heavily inspired by:

- [bundle-require](https://github.com/egoist/bundle-require), created by [EGOIST](https://github.com/egoist)
- [jiti](https://github.com/unjs/jiti), created by [pi0](https://github.com/pi0) and maintained by [unjs](https://github.com/unjs)
- [tsx](https://github.com/privatenumber/tsx), created by [Hiroki Osame](https://github.com/privatenumber)

## License

Made by 💛 [MIT](./LICENSE) License © 2024-PRESENT [Tamago](https://github.com/tmg0)
