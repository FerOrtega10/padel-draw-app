<template>
  <div class="min-h-screen bg-surface flex items-center justify-center p-4">
    <div class="text-center">
      <div v-if="loading" class="animate-spin rounded-full border-4 border-t-primary border-b-slate-200 w-12 h-12 mx-auto mb-4"></div>
      
      <div v-if="errorMessage" class="bg-red-50 text-red-600 px-6 py-4 rounded-xl text-sm max-w-md">
        {{ errorMessage }}
      </div>

      <div v-if="successMessage" class="bg-emerald-50 text-emerald-600 px-6 py-4 rounded-xl text-sm max-w-md">
        {{ successMessage }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

const router = useRouter()
const loading = ref(true)
const errorMessage = ref('')
const successMessage = ref('')

onMounted(async () => {
  try {
    const supabase = useSupabaseClient()
    
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) throw error

    if (session?.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (!profile) {
        await supabase
          .from('profiles')
          .upsert({
            id: session.user.id,
            email: session.user.email,
            first_name: session.user.user_metadata?.first_name || session.user.user_metadata?.name?.split(' ')[0] || null,
            last_name: session.user.user_metadata?.last_name || session.user.user_metadata?.name?.split(' ').slice(1).join(' ') || null,
            is_guest: false,
          } as any)
      }

      successMessage.value = 'Welcome! Redirecting...'
    } else {
      successMessage.value = 'Email confirmed! Redirecting...'
    }
    
    setTimeout(() => {
      router.push('/tournaments')
    }, 1500)
  } catch (error: any) {
    errorMessage.value = error.message || 'Confirmation failed'
  } finally {
    loading.value = false
  }
})
</script>
