import { defineConfig } from 'tsup'

// https://tsup.egoist.sh/#using-custom-configuration
// https://paka.dev/npm/tsup/v/5.12.4#module-index-export-Options
export default defineConfig(options => {
  return {
    target: ['es2020', 'node16', 'chrome60', 'firefox60', 'safari11', 'edge18'],
    entry: {
      index: 'src/index.ts',
      'pushover/index': 'src/pushover/index.ts',
      'bark/index': 'src/bark/index.ts',
    },
    outDir: 'dist',
    format: ['esm', 'cjs'],
    dts: {
      resolve: true,
    },
    bundle: true,
    splitting: true,
    treeshake: true,
    sourcemap: false,
    clean: true,
    minify: !options.watch,
  }
})
