<template>
  <section class="view-container">
    <!-- Loading State -->
    <div v-if="loading" class="flex min-h-[60vh] items-center justify-center">
      <div class="animate-spin rounded-full border-4 border-t-primary border-b-slate-200 w-12 h-12"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex min-h-[60vh] items-center justify-center">
      <div class="text-center">
        <h3 class="text-xl font-semibold mb-2">Error loading tournament</h3>
        <!-- <p class="text-slate-500">{{ error.message }}</p> -->
        <UiButton variant="secondary" size="md" @click="refresh">
          Try Again
        </UiButton>
      </div>
    </div>

    <!-- Tournament Details -->
    <div v-else-if="tournament" class="space-y-8">
      <!-- Header -->
      <div class="flex flex-col items-center text-center space-y-4">
        <h1 class="text-3xl font-bold">{{ tournament.name }}</h1>
        <div class="flex items-center space-x-4">
          <UiTag :variant="tournament.status === 'open' ? 'tertiary' : tournament.status === 'in_progress' ? 'secondary' : 'gray'" size="md">
            {{ statusLabel[tournament.status] || 'Desconocido' }}
          </UiTag>
          <span class="text-slate-500">
            {{ formatDate(tournament.start_date) }} - {{ formatDate(tournament.end_date) }}
          </span>
        </div>
        <div v-if="tournament.description" class="prose prose-slate max-w-2xl text-slate-600">
          {{ tournament.description }}
        </div>
      </div>

      <!-- Organizer Info -->
      <div class="flex items-center space-x-6">
        <div class="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-xs font-bold">
          {{ tournament.organizer_name?.charAt(0) || 'O' }}
        </div>
        <div>
          <p class="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Organized by</p>
          <p class="text-slate-700 font-semibold">
            {{ tournament.organizer_name }}
          </p>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-slate-50 p-4 rounded-lg text-center">
          <p class="text-slate-500 text-sm">Teams</p>
          <p class="text-2xl font-bold">{{ teams.length }}</p>
        </div>
        <div class="bg-slate-50 p-4 rounded-lg text-center">
          <p class="text-slate-500 text-sm">Matches</p>
          <p class="text-2xl font-bold">{{ matches.length }}</p>
        </div>
        <div class="bg-slate-50 p-4 rounded-lg text-center">
          <p class="text-slate-500 text-sm">Registrations</p>
          <p class="text-2xl font-bold">{{ registrations.length }}</p>
        </div>
        <div class="bg-slate-50 p-4 rounded-lg text-center">
          <p class="text-slate-500 text-sm">Status</p>
          <p class="text-2xl font-bold capitalize">{{ tournament.status }}</p>
        </div>
      </div>

      <!-- Description -->
      <div v-if="tournament.description" class="bg-slate-50 p-6 rounded-lg">
        <h2 class="text-lg font-semibold mb-4">About this Tournament</h2>
        <p class="text-slate-600">{{ tournament.description }}</p>
      </div>

      <!-- Tabs for different sections -->
      <div class="border-b border-slate-200 mb-6">
        <div class="flex border-b border-slate-100">
          <button 
            :class="{
              'text-primary font-semibold border-b-2 border-primary': activeTab === 'overview',
              'text-slate-500 hover:text-slate-700': activeTab !== 'overview'
            }"
            class="px-4 py-3"
            @click="activeTab = 'overview'"
          >
            Overview
          </button>
          <button 
            :class="{
              'text-primary font-semibold border-b-2 border-primary': activeTab === 'teams',
              'text-slate-500 hover:text-slate-700': activeTab !== 'teams'
            }"
            class="px-4 py-3"
            @click="activeTab = 'teams'"
          >
            Teams ({{ teams.length }})
          </button>
          <button 
            :class="{
              'text-primary font-semibold border-b-2 border-primary': activeTab === 'matches',
              'text-slate-500 hover:text-slate-700': activeTab !== 'matches'
            }"
            class="px-4 py-3"
            @click="activeTab = 'matches'"
          >
            Matches ({{ matches.length }})
          </button>
          <button 
            :class="{
              'text-primary font-semibold border-b-2 border-primary': activeTab === 'registrations',
              'text-slate-500 hover:text-slate-700': activeTab !== 'registrations'
            }"
            class="px-4 py-3"
            @click="activeTab = 'registrations'"
          >
            Registrations ({{ registrations.length }})
          </button>
        </div>
      </div>

      <!-- Tab Content -->
      <div v-show="activeTab === 'overview'">
        <div class="space-y-6">
          <!-- Tournament Info -->
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <div class="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-xs font-bold">
                📅
              </div>
              <div>
                <p class="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Dates</p>
                <p class="text-slate-700 font-medium">
                  {{ formatDate(tournament.start_date) }} - {{ formatDate(tournament.end_date) }}
                </p>
              </div>
            </div>
            
            <!-- <div v-if="tournament.location" class="flex items-center space-x-4">
              <div class="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-xs font-bold">
                📍
              </div>
              <div>
                <p class="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Location</p>
                <p class="text-slate-700 font-medium">{{ tournament.location }}</p>
              </div>
            </div> -->
            
            <!-- <div v-if="tournament.prize" class="flex items-center space-x-4">
              <div class="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-xs font-bold">
                🏆
              </div>
              <div>
                <p class="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Prize</p>
                <p class="text-slate-700 font-medium">{{ tournament.prize }}</p>
              </div>
            </div> -->
          </div>

          <!-- Call to Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4">
            <UiButton 
              v-if="tournament.status === 'open'" 
              variant="primary" 
              size="md"
              :to="`/tournaments/${tournament.id}/register`"
            >
              Register for Tournament
            </UiButton>
            <UiButton 
              variant="secondary" 
              size="md"
              :to="'/tournaments'"
            >
              Back to Tournaments
            </UiButton>
          </div>
        </div>
      </div>

      <!-- Teams Tab -->
      <div v-show="activeTab === 'teams'">
        <div v-if="teams.length === 0" class="text-center py-12">
          <p class="text-slate-500">No teams registered yet</p>
        </div>
        <div v-else class="space-y-4">
          <div v-for="team in teams" :key="team.id" class="border border-slate-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div class="flex items-center space-x-4">
              <div class="flex-1">
                <p class="text-slate-500 text-sm">Team {{ team.id.slice(0, 4).toUpperCase() }}</p>
                <p class="font-medium">{{ team.p1?.first_name }} {{ team.p1?.last_name }} &amp; {{ team.p2?.first_name }} {{ team.p2?.last_name }}</p>
              </div>
              <div class="text-right">
                <p class="text-slate-400 text-xs">Status:</p>
                <p class="font-medium">{{ getTeamStatus(team.id) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Matches Tab -->
      <div v-show="activeTab === 'matches'">
        <div v-if="matches.length === 0" class="text-center py-12">
          <p class="text-slate-500">No matches scheduled yet</p>
        </div>
        <div v-else class="space-y-4">
          <div v-for="match in matches" :key="match.id" class="border border-slate-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-slate-500 text-sm">Round {{ match.round_number }}</p>
                <p class="font-medium">
                  {{ match.team_a?.p1?.first_name }} {{ match.team_a?.p1?.last_name }} &amp; {{ match.team_a?.p2?.first_name }} {{ match.team_a?.p2?.last_name }}
                  vs
                  {{ match.team_b?.p1?.first_name }} {{ match.team_b?.p1?.last_name }} &amp; {{ match.team_b?.p2?.first_name }} {{ match.team_b?.p2?.last_name }}
                </p>
              </div>
              <div class="text-center space-x-2">
                <p class="text-slate-500 text-xs">{{ formatTime(match.match_date) }}</p>
                <p class="font-medium" v-if="match.score">{{ match.score }}</p>
                <p class="text-slate-400" v-else>TBD</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Registrations Tab -->
      <div v-show="activeTab === 'registrations'">
        <div v-if="registrations.length === 0" class="text-center py-12">
          <p class="text-slate-500">No registrations yet</p>
        </div>
        <div v-else class="space-y-4">
          <div v-for="registration in registrations" :key="registration.id" class="border border-slate-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div class="flex items-center space-x-4">
              <div class="flex-1">
                <p class="text-slate-500 text-sm">Registration #{{ registration.id.slice(0, 4).toUpperCase() }}</p>
                <p class="font-medium">{{ registration.player_1?.first_name }} {{ registration.player_1?.last_name }} &amp; {{ registration.player_2?.first_name }} {{ registration.player_2?.last_name }}</p>
              </div>
              <div class="text-right">
                <p class="text-slate-400 text-xs">Status:</p>
                <span
:class="{
                  'bg-emerald-100 text-emerald-800': registration.status === 'accepted',
                  'bg-indigo-100 text-indigo-800': registration.status === 'pending',
                  'bg-slate-100 text-slate-800': registration.status === 'rejected'
                }" class="px-3 py-1 rounded-full text-xs font-medium"
>
                  {{ registration.status }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from '#app'
import { ref } from 'vue'
import { type TournamentView, type Team, type Match, type Registration, type Profile } from '~/types'

const route = useRoute()
const router = useRouter()
const supabase = useSupabaseClient()

const tournamentId = route.params.id as string

// State
const loading = ref(true)
const error = ref(null)
const tournament = ref<TournamentView | null>(null)
const teams = ref<Team[]>([])
const matches = ref<Match[]>([])
const registrations = ref<Registration[]>([])
const activeTab = ref('overview')

// Helper functions
const statusLabel = {
  open: 'Próximo',
  in_progress: 'En Curso',
  completed: 'Completado',
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

const formatTime = (dateStr: string | null) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

const getTeamStatus = (teamId: string) => {
  // Check if team has any matches
  const teamMatches = matches.value.filter(m => m.team_a_id === teamId || m.team_b_id === teamId)
  if (teamMatches.length === 0) return 'Waiting'
  
  // Check if all matches are completed
  const completedMatches = teamMatches.filter(m => m.winner_id !== null)
  return completedMatches.length === teamMatches.length ? 'Completed' : 'In Progress'
}

// Fetch tournament data
const fetchTournamentData = async () => {
  try {
    loading.value = true
    error.value = null
    
    // Fetch tournament
    const { data: tournamentData, error: tournamentError } = await supabase
      .from('tournaments')
      .select('*')
      .eq('id', tournamentId)
      .single()

    if (tournamentError) throw tournamentError
    tournament.value = tournamentData

    // Fetch teams
    const { data: teamsData, error: teamsError } = await supabase
      .from('teams')
      .select(`
        *,
        p1:p1_id (
          id,
          first_name,
          last_name
        ),
        p2:p2_id (
          id,
          first_name,
          last_name
        )
      `)
      .eq('tournament_id', tournamentId)

    if (teamsError) throw teamsError
    teams.value = teamsData || []

    // Fetch matches
    const { data: matchesData, error: matchesError } = await supabase
      .from('matches')
      .select(`
        *,
        team_a:team_a_id (
          *,
          p1:p1_id (
            id,
            first_name,
            last_name
          ),
          p2:p2_id (
            id,
            first_name,
            last_name
          )
        ),
        team_b:team_b_id (
          *,
          p1:p1_id (
            id,
            first_name,
            last_name
          ),
          p2:p2_id (
            id,
            first_name,
            last_name
          )
        )
      `)
      .eq('tournament_id', tournamentId)
      .order('round_number')

    if (matchesError) throw matchesError
    matches.value = matchesData || []

    // Fetch registrations
    const { data: registrationsData, error: registrationsError } = await supabase
      .from('registrations')
      .select(`
        *,
        player_1:player_1_id (
          id,
          first_name,
          last_name
        ),
        player_2:player_2_id (
          id,
          first_name,
          last_name
        )
      `)
      .eq('tournament_id', tournamentId)

    if (registrationsError) throw registrationsError
    registrations.value = registrationsData || []

  } catch (err) {
    // error.value = err
    console.error('Error fetching tournament data:', err)
  } finally {
    loading.value = false
  }
}

// Refresh data
const refresh = () => {
  fetchTournamentData()
}

// Initial fetch
fetchTournamentData()
</script>