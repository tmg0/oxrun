# oxrun

⚓ Typescript node runtime powered by [oxc-node](https://github.com/oxc-project/oxc)

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

clk: `~3.26 GHz`

cpu: `Apple M2`

runtime: `node (arm64-darwin)`

```bash
  name        hz     min     max     mean      p75     p99    p995    p999       rme  samples
· oxrun  80.3557  0.7746  344.68  12.4447   8.3993  344.68  344.68  344.68   ±96.31%       57   fastest
· jiti   40.5265  0.5379  250.22  24.6752  19.4873  250.22  250.22  250.22   ±98.67%       22
· tsx    24.7916  2.4523  381.93  40.3363  13.3386  381.93  381.93  381.93  ±144.29%       14   slowest

1.98x faster than jiti
3.24x faster than tsx
```

## License

[MIT](./LICENSE) License © 2024-PRESENT [Tamago](https://github.com/tmg0)
