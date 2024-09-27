import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src/index.ts'],
  minify: true,
  clean: true,
  dts: true,
  format: ['esm'],
})
