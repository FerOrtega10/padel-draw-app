<template>
  <div class="min-h-screen bg-surface flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-flex items-center gap-2">
          <div class="bg-action p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="text-primary">
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path d="M2 12c5.5 0 10-4.5 10-10"/>
                <circle cx="12" cy="12" r="10"/>
                <path d="M22 12c-5.5 0-10 4.5-10 10"/>
              </g>
            </svg>
          </div>
          <span class="text-2xl font-extrabold tracking-tighter text-primary">
            PADEL<span class="text-secondary">DRAW</span>
          </span>
        </NuxtLink>
      </div>

      <div class="bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
        <h1 class="text-2xl font-bold text-center mb-2">Welcome Back</h1>
        <p class="text-slate-500 text-center mb-6">Sign in to your account</p>

        <UiButton
          variant="outline"
          size="lg"
          class="w-full mb-4"
          @click="handleGoogleLogin"
        >
          <Icon name="lucide:mail" class="w-5 h-5 mr-2" />
          Continue with Google
        </UiButton>

        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-slate-200"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="bg-white px-4 text-slate-500">Or continue with email</span>
          </div>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="Your password"
            />
          </div>

          <div v-if="errorMessage" class="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
            {{ errorMessage }}
          </div>

          <UiButton
            type="submit"
            variant="primary"
            size="lg"
            class="w-full"
            :loading="loading"
          >
            Sign In
          </UiButton>
        </form>

        <div class="mt-6 text-center">
          <p class="text-slate-500 text-sm">
            Don't have an account?
            <NuxtLink to="/auth/register" class="text-primary font-semibold hover:underline">
              Sign up
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

const supabase = useSupabaseClient()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const googleLoading = ref(false)
const errorMessage = ref('')

const handleGoogleLogin = async () => {
  try {
    googleLoading.value = true
    errorMessage.value = ''
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/confirm`,
      },
    })

    if (error) throw error
  } catch (error: any) {
    errorMessage.value = error.message || 'An error occurred'
    googleLoading.value = false
  }
}

const handleLogin = async () => {
  try {
    loading.value = true
    errorMessage.value = ''

    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (error) throw error

    router.push('/tournaments')
  } catch (error: any) {
    errorMessage.value = error.message || 'An error occurred'
  } finally {
    loading.value = false
  }
}
</script>
