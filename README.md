# oxrun

⚓ Typescript node runtime powered by [oxc-node](https://github.com/oxc-project/oxc)

## Feature

- Super fast typescript transformer
- Run ts / esm with a single command
- No installation required

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

benchmark              avg (min … max) p75   p99    (min … top 1%)
-------------------------------------- -------------------------------
oxrun                   119.05 ms/iter 119.02 ms █            █
               (118.84 ms … 119.39 ms) 119.02 ms █▁▁▁▁▁▁▁▁▁▁▁▁█▁▁▁▁▁▁▁
jiti                    105.23 ms/iter 105.43 ms ██             █
               (104.87 ms … 105.63 ms) 105.43 ms ██▁▁▁▁▁▁▁▁▁▁▁▁▁█▁▁▁▁▁
tsx                     140.53 ms/iter 140.77 ms █             █  █
               (139.82 ms … 140.96 ms) 140.77 ms █▁▁▁▁▁▁▁▁▁▁▁▁▁█▁▁█▁▁▁
```

## License

[MIT](./LICENSE) License © 2024-PRESENT [Tamago](https://github.com/tmg0)
