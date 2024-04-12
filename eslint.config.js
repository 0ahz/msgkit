import tsParser from '@typescript-eslint/parser'
import globals from 'globals'

export default [
  {
    files: ['src/**/*.{js,ts}', 'test/**/*.{js,ts}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tsParser,
    },
    ignores: [
      //
    ],
  },
]
