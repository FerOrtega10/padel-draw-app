<template>
  <section class="view-container">
  <div class="flex items-center justify-between">
    <h1 class="text-4xl font-bold">Torneos</h1>

      <UiButton variant="tertiary" size="md" :to="'/tournaments/create'">
        CREAR TORNEO
      </UiButton>
  </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      <TournamentCard v-for="tournament in tournaments" :key="tournament.id" :tournament="tournament" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { type TournamentView } from '~/types'
const supabase = useSupabaseClient()

const { data: tournaments, error } = await useAsyncData<TournamentView[]>('tournaments', async () => {
  const { data } = await supabase
    .from('tournament_list_view')
    .select('*')
  
  return data as TournamentView[]
})
</script>