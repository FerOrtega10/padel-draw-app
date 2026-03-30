// Test setup file
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { config } from '@vue/test-utils'

// Mock resizeObserver
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock NuxtLink component globally
const NuxtLink = {
  name: 'NuxtLink',
  template: '<a :href="to"><slot></slot></a>',
  props: ['to', 'href']
}

// Mock Icon component
const Icon = {
  name: 'Icon',
  template: '<span></span>',
  props: ['name']
}

// Register global components
config.global.stubs = {
  NuxtLink,
  Icon,
  NuxtPage: { template: '<div><slot></slot></div>' },
  NuxtLayout: { template: '<div><slot></slot></div>' }
}

config.global.components = {
  NuxtLink,
  Icon
}

// Mock #app imports
vi.mock('#app', () => ({
  NuxtLink,
  useRoute: vi.fn(() => ({ value: {} })),
  useRouter: vi.fn(() => ({ push: vi.fn() })),
  useSupabaseClient: vi.fn(() => ({
    auth: { signOut: vi.fn(() => Promise.resolve({ error: null })) }
  })),
  useSupabaseUser: vi.fn(() => ({ value: null })),
  useState: vi.fn(() => ({ value: null })),
  useHead: vi.fn(),
  useNuxtApp: vi.fn(() => ({ $router: {} })),
  navigateTo: vi.fn()
}))
