import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

export default tseslint.config(
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser
      },
      globals: {
        useSupabaseClient: 'readonly',
        useSupabaseUser: 'readonly',
        useRouter: 'readonly',
        useRoute: 'readonly',
        useState: 'readonly',
        useHead: 'readonly',
        useNuxtApp: 'readonly',
        navigateTo: 'readonly',
        defineNuxtConfig: 'readonly',
        definePageMeta: 'readonly',
        ref: 'readonly',
        computed: 'readonly',
        onMounted: 'readonly',
        onUnmounted: 'readonly',
        watch: 'readonly',
        watchEffect: 'readonly',
        nextTick: 'readonly',
        inject: 'readonly',
        useAsyncData: 'readonly'
      }
    }
  },
  {
    rules: {
      'no-unused-vars': 'warn',
      'prefer-const': 'error',
      'no-console': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
      'vue/require-default-prop': 'off',
      'vue/require-explicit-emits': 'off',
      'vue/html-self-closing': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/html-indent': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/attributes-order': 'off',
      'vue/html-closing-bracket-spacing': 'off',
      'no-useless-assignment': 'off',
      'no-undef': 'off'
    }
  },
  {
    ignores: [
      '.nuxt/**',
      'node_modules/**',
      'dist/**',
      '.output/**'
    ]
  }
)
