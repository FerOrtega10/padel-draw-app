<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const navLinks = [
  { name: 'Torneos', to: '/tournaments', icon: 'lucide:trophy' },
  { name: 'Ranking', to: '/', icon: 'lucide:trending-up' },
  { name: 'Clubes', to: '/', icon: 'lucide:map-pin' },
]

const isMenuOpen = ref(false)

const handleLogout = async () => {
  await supabase.auth.signOut()
  navigateTo('/auth/login')
}
</script>

<template>
  <nav class="sticky top-0 z-50 w-full border-b border-primary/10 bg-surface/80 backdrop-blur-md">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <div class="bg-action p-1.5 rounded-lg group-hover:bg-primary transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path d="M2 12c5.5 0 10-4.5 10-10"/>
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M22 12c-5.5 0-10 4.5-10 10"/>
                </g>
            </svg>
          </div>
          <span class="text-xl font-extrabold tracking-tighter text-primary">
            PADEL<span class="text-secondary">DRAW</span>
          </span>
        </NuxtLink>

        <div class="hidden md:flex items-center gap-8">
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.name" 
            :to="link.to"
            class="flex items-center gap-1 text-sm font-bold text-primary/70 hover:text-primary transition-colors"
          >
          <Icon :name="link.icon" class="w-6 h-6" />
            {{ link.name }}
          </NuxtLink>
          
          <template v-if="user">
            <UiButton variant="outline" size="sm" @click="handleLogout">
              Logout
            </UiButton>
          </template>
          <template v-else>
            <UiButton variant="tertiary" size="sm" to="/auth/login">
              Login
            </UiButton>
            <UiButton variant="gradient" size="sm" to="/tournaments">
              Explorar Torneos
            </UiButton>
          </template>
        </div>

        <div class="flex md:hidden">
          <button @click="isMenuOpen = !isMenuOpen" class="text-primary p-2">
            <span class="sr-only">Open menu</span>
            <svg v-if="!isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="isMenuOpen" class="md:hidden bg-white border-b border-gray/10 px-4 pt-2 pb-6 space-y-2 shadow-xl">
        <NuxtLink 
          v-for="link in navLinks" 
          :key="link.name" 
          :to="link.to"
          class="block px-3 py-3 text-base font-bold text-primary hover:bg-surface rounded-xl"
          @click="isMenuOpen = false"
        >
          {{ link.name }}
        </NuxtLink>
        <div class="pt-2 space-y-2">
          <template v-if="user">
            <UiButton variant="outline" class="w-full" @click="handleLogout">
              Logout
            </UiButton>
          </template>
          <template v-else>
            <UiButton variant="tertiary" class="w-full" to="/auth/login" @click="isMenuOpen = false">
              Login
            </UiButton>
            <UiButton variant="gradient" class="w-full" to="/tournaments" @click="isMenuOpen = false">
              Explorar Torneos
            </UiButton>
          </template>
        </div>
      </div>
    </Transition>
  </nav>
</template>