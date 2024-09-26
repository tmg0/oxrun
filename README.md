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

## Benchmark

```bash
clk: ~3.26 GHz
cpu: Apple M2
runtime: node (arm64-darwin)

  name                 hz     min     max     mean      p75     p99    p995    p999      rme  samples
· oxrun           48.0401  0.6927  273.39  20.8159  24.0320  273.39  273.39  273.39  ±84.55%       31   fastest
· jiti            36.8400  0.4853  227.23  27.1444  20.8850  227.23  227.23  227.23  ±93.90%       20
· tsx (no-cache)  34.8837  1.8106  179.26  28.6667  28.0759  179.26  179.26  179.26  ±82.73%       18   slowest
· ts-node         38.0139  0.6208  183.45  26.3062  10.2737  183.45  183.45  183.45  ±86.21%       20

1.26x faster than ts-node
1.30x faster than jiti
1.38x faster than tsx (no-cache)
```

## License

[MIT](./LICENSE) License © 2024-PRESENT [Tamago](https://github.com/tmg0)
