import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TournamentCard from '@/components/TournamentCard.vue'
import UiButton from '@/components/ui/Button.vue'
import Tag from '@/components/ui/Tag.vue'

describe('TournamentCard.vue', () => {
  const mockTournament = {
    id: '1',
    title: 'Test Tournament',
    status: 'open',
    start_date: '2026-03-15',
    end_date: '2026-03-16',
    organizer_name: 'John Doe',
    description: null,
    organizer_id: '123',
    location: null,
    prize: null,
    flyer_url: null,
    created_at: '2026-01-01'
  }

  it('renders tournament title', () => {
    const wrapper = mount(TournamentCard, {
      props: {
        tournament: mockTournament
      },
      global: {
        components: {
          UiButton,
          Tag
        }
      }
    })

    expect(wrapper.text()).toContain('Test Tournament')
  })

  it('displays correct date format', () => {
    const wrapper = mount(TournamentCard, {
      props: {
        tournament: mockTournament
      },
      global: {
        components: {
          UiButton,
          Tag
        }
      }
    })

    expect(wrapper.text()).toContain('March')
    expect(wrapper.text()).toContain('15')
  })

  it('shows organizer information', () => {
    const wrapper = mount(TournamentCard, {
      props: {
        tournament: mockTournament
      },
      global: {
        components: {
          UiButton,
          Tag
        }
      }
    })

    expect(wrapper.text()).toContain('John Doe')
  })

  it('renders Ver Detalles button with correct link', () => {
    const wrapper = mount(TournamentCard, {
      props: {
        tournament: mockTournament
      },
      global: {
        components: {
          UiButton,
          Tag
        }
      }
    })

    const button = wrapper.findComponent(UiButton)
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Ver Detalles')
    expect(button.props().to).toBe('/tournaments/1')
  })

  it('shows only Ver Detalles button', () => {
    const wrapper = mount(TournamentCard, {
      props: {
        tournament: mockTournament
      },
      global: {
        components: {
          UiButton,
          Tag
        }
      }
    })

    const buttons = wrapper.findAllComponents(UiButton)
    expect(buttons).toHaveLength(1)
    expect(buttons[0].text()).toBe('Ver Detalles')
  })

  it('renders correctly for non-open tournaments', () => {
    const closedTournament = {
      ...mockTournament,
      status: 'completed'
    }

    const wrapper = mount(TournamentCard, {
      props: {
        tournament: closedTournament
      },
      global: {
        components: {
          UiButton,
          Tag
        }
      }
    })

    const buttons = wrapper.findAllComponents(UiButton)
    expect(buttons).toHaveLength(1)
    expect(buttons[0].text()).toBe('Ver Detalles')
  })
})
