import { defineConfig } from 'vitest/config'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import UiButton from './app/components/ui/Button.vue'
import Tag from './app/components/ui/Tag.vue'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    include: ['tests/**/*.test.{ts,tsx}'],
    alias: {
      '@': resolve('./app'),
      '~/': resolve('./app/'),
      '@/app': resolve('./app')
    }
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === 'Icon'
        }
      }
    })
  ]
})
