import { defineConfig } from 'tsup'

export default defineConfig(options => {
  return {
    target: ['es2020'],
    entry: {
      index: 'src/index.ts',
      'pushover/index': 'src/pushover/index.ts',
      'bark/index': 'src/bark/index.ts',
    },
    outDir: 'dist',
    format: ['cjs', 'esm'],
    dts: true,
    bundle: true,
    splitting: true,
    treeshake: true,
    sourcemap: false,
    clean: true,
    minify: !options.watch,
  }
})
