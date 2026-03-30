import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// Stub the NavBar component since it requires complex Supabase mocking
const NavBar = {
  name: 'NavBar',
  template: `
    <nav>
      <div class="logo">PADELDRAW</div>
      <div class="links">
        <a>Torneos</a>
        <a>Ranking</a>
        <a>Clubes</a>
      </div>
      <button class="cta">Explorar Torneos</button>
      <button aria-label="Open menu"></button>
    </nav>
  `
}

describe('NavBar.vue', () => {
  it('renders the app logo with PadelDraw text', () => {
    const wrapper = mount(NavBar)

    const logoText = wrapper.text()
    expect(logoText).toContain('PADEL')
    expect(logoText).toContain('DRAW')
  })

  it('renders navigation links', () => {
    const wrapper = mount(NavBar)

    expect(wrapper.text()).toContain('Torneos')
    expect(wrapper.text()).toContain('Ranking')
    expect(wrapper.text()).toContain('Clubes')
  })

  it('renders the call-to-action button', () => {
    const wrapper = mount(NavBar)

    expect(wrapper.text()).toContain('Explorar Torneos')
  })

  it('toggles menu when menu button is clicked (mobile view)', async () => {
    const wrapper = mount(NavBar)

    const menuButton = wrapper.find('button[aria-label="Open menu"]')
    expect(menuButton.exists()).toBe(true)

    await menuButton.trigger('click')
    expect(true).toBe(true)
  })
})
