import { defineConfig } from 'tsup'

export default defineConfig(options => {
  return {
    target: ['es2020'],
    entry: {
      index: 'src/index.ts',
      'pushover/index': 'src/provider/pushover/index.ts',
      'bark/index': 'src/provider/bark/index.ts',
      'wecom/index': 'src/provider/wecom/index.ts',
      'feishu/index': 'src/provider/feishu/index.ts',
      'ding/index': 'src/provider/ding/index.ts',
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
