import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    files: ['**/*.vue', '**/*.ts'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module'
    },
    rules: {
      'no-unused-vars': 'warn',
      'prefer-const': 'error',
      'no-console': 'warn'
    }
  }
]
