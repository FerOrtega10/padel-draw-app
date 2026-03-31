<script setup lang="ts">
import type { TournamentView } from '~/types'
// import Tag from './ui/Tag.vue'
// import { UiButton } from './ui/Button.vue'

interface Props {
  tournament: TournamentView
  class?: string
}

const props = defineProps<Props>()

// Helper to handle status colors based on PadelSync branding
// const statusConfig = computed(() => {
//   const status = props.tournament.status
//   if (status === 'open') return 'bg-emerald-50 text-emerald-700 border-emerald-100'
//   if (status === 'in_progress') return 'bg-indigo-50 text-indigo-700 border-indigo-100'
//   return 'bg-slate-50 text-slate-600 border-slate-100'
// })

const statusLabel = {
  open: 'Próximo',
  in_progress: 'En Curso',
  completed: 'Completado',
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
}
</script>

<template>
  <div class="rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-1" :class="props.class">
    
    <div class="flex flex-col space-y-1.5 p-6">
      <div class="flex justify-between items-start">
        <h3 class="font-bold leading-none tracking-tight text-xl">
          {{ tournament.title }}
        </h3>
        <UiTag :variant="tournament.status === 'open' ? 'tertiary' : tournament.status === 'in_progress' ? 'secondary' : 'gray'" size="sm">
          {{ statusLabel[tournament.status] || 'Desconocido' }}
        </UiTag>
      </div>
      <p class="text-xs text-slate-500 font-medium">
        {{ formatDate(tournament.start_date) }} - {{ formatDate(tournament.end_date) }}
      </p>
    </div>

    <div class="p-6 pt-0">
      <div class="flex items-center space-x-2 mb-6">
        <div class="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-xs font-bold">
          {{ tournament.organizer_name?.charAt(0) || 'O' }}
        </div>
        <div class="text-sm">
          <p class="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Organizer</p>
          <p class="text-slate-700 font-semibold">{{ tournament.organizer_name }}</p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <UiButton :to="`/tournaments/${tournament.id}`" variant="primary" size="md">
            Ver Detalles
        </UiButton>
        <UiButton v-if="tournament.status === 'open'" variant="secondary" size="md">
          Unirse al torneo
        </UiButton>
      </div>
    </div>
  </div>
</template>