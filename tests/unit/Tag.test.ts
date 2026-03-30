import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Tag from '@/components/ui/Tag.vue'

describe('Tag.vue', () => {
  it('renders default variant and size', () => {
    const wrapper = mount(Tag, {
      slots: {
        default: 'Test Tag'
      }
    })

    expect(wrapper.text()).toBe('Test Tag')
    expect(wrapper.classes()).toContain('bg-gray/20')
    expect(wrapper.classes()).toContain('text-primary/70')
    expect(wrapper.classes()).toContain('px-3')
    expect(wrapper.classes()).toContain('py-1')
    expect(wrapper.classes()).toContain('text-[12px]')
  })

  it('applies primary variant correctly', () => {
    const wrapper = mount(Tag, {
      props: {
        variant: 'primary'
      },
      slots: {
        default: 'Primary Tag'
      }
    })

    expect(wrapper.classes()).toContain('bg-primary/90')
    expect(wrapper.classes()).toContain('text-white')
  })

  it('applies secondary variant correctly', () => {
    const wrapper = mount(Tag, {
      props: {
        variant: 'secondary'
      },
      slots: {
        default: 'Secondary Tag'
      }
    })

    expect(wrapper.classes()).toContain('bg-secondary/90')
    expect(wrapper.classes()).toContain('text-white')
  })

  it('applies tertiary variant correctly', () => {
    const wrapper = mount(Tag, {
      props: {
        variant: 'tertiary'
      },
      slots: {
        default: 'Tertiary Tag'
      }
    })

    expect(wrapper.classes()).toContain('bg-action/90')
    expect(wrapper.classes()).toContain('text-primary')
  })

  it('applies gray variant correctly', () => {
    const wrapper = mount(Tag, {
      props: {
        variant: 'gray'
      },
      slots: {
        default: 'Gray Tag'
      }
    })

    expect(wrapper.classes()).toContain('bg-gray/20')
    expect(wrapper.classes()).toContain('text-primary/70')
  })

  it('applies outline variant correctly', () => {
    const wrapper = mount(Tag, {
      props: {
        variant: 'outline'
      },
      slots: {
        default: 'Outline Tag'
      }
    })

    expect(wrapper.classes()).toContain('border')
    expect(wrapper.classes()).toContain('border-gray')
    expect(wrapper.classes()).toContain('text-primary')
  })

  it('applies small size correctly', () => {
    const wrapper = mount(Tag, {
      props: {
        size: 'sm'
      },
      slots: {
        default: 'Small Tag'
      }
    })

    expect(wrapper.classes()).toContain('px-2')
    expect(wrapper.classes()).toContain('py-0.5')
    expect(wrapper.classes()).toContain('text-[10px]')
  })

  it('applies medium size correctly', () => {
    const wrapper = mount(Tag, {
      props: {
        size: 'md'
      },
      slots: {
        default: 'Medium Tag'
      }
    })

    expect(wrapper.classes()).toContain('px-3')
    expect(wrapper.classes()).toContain('py-1')
    expect(wrapper.classes()).toContain('text-[12px]')
  })
})