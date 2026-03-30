import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiButton from '@/components/ui/Button.vue'

describe('UiButton.vue', () => {
  it('renders as a link when to prop is provided', () => {
    const wrapper = mount(UiButton, {
      props: {
        to: '/test-link',
        variant: 'primary',
        size: 'md'
      }
    })

    expect(wrapper.find('a').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('renders as a button when no to prop is provided', () => {
    const wrapper = mount(UiButton, {
      props: {
        variant: 'primary',
        size: 'md'
      }
    })

    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('a').exists()).toBe(false)
  })

  it('applies correct variant classes', () => {
    const wrapper = mount(UiButton, {
      props: {
        to: '/test',
        variant: 'secondary',
        size: 'md'
      }
    })

    expect(wrapper.find('a').classes()).toContain('bg-secondary')
    expect(wrapper.find('a').classes()).toContain('text-surface')
  })

  it('applies correct size classes', () => {
    const wrapper = mount(UiButton, {
      props: {
        to: '/test',
        variant: 'primary',
        size: 'lg'
      }
    })

    expect(wrapper.find('a').classes()).toContain('h-14')
    expect(wrapper.find('a').classes()).toContain('px-10')
    expect(wrapper.find('a').classes()).toContain('text-base')
  })

  it('shows loading indicator when loading prop is true', () => {
    const wrapper = mount(UiButton, {
      props: {
        to: '/test',
        variant: 'primary',
        size: 'md',
        loading: true
      }
    })

    expect(wrapper.text()).toContain('Cargando...')
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('disables button when disabled prop is true', () => {
    const wrapper = mount(UiButton, {
      props: {
        to: '/test',
        variant: 'primary',
        size: 'md',
        disabled: true
      }
    })

    expect(wrapper.find('a').classes()).toContain('opacity-50')
    expect(wrapper.find('a').classes()).toContain('pointer-events-none')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(UiButton, {
      props: {
        to: '/test',
        variant: 'primary',
        size: 'md'
      }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
