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
        <h1 class="text-2xl font-bold text-center mb-2">Create Account</h1>
        <p class="text-slate-500 text-center mb-6">Join PadelDraw today</p>

        <UiButton
          variant="outline"
          size="lg"
          class="w-full mb-4"
          @click="handleGoogleSignUp"
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

        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label for="firstName" class="block text-sm font-medium text-slate-700 mb-1">First Name</label>
            <input
              id="firstName"
              v-model="firstName"
              type="text"
              required
              class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="John"
            />
          </div>

          <div>
            <label for="lastName" class="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
            <input
              id="lastName"
              v-model="lastName"
              type="text"
              required
              class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="Doe"
            />
          </div>

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
              minlength="6"
              class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="Min. 6 characters"
            />
          </div>

          <div v-if="errorMessage" class="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
            {{ errorMessage }}
          </div>

          <div v-if="successMessage" class="bg-emerald-50 text-emerald-600 px-4 py-3 rounded-xl text-sm">
            {{ successMessage }}
          </div>

          <UiButton
            type="submit"
            variant="primary"
            size="lg"
            class="w-full"
            :loading="loading"
          >
            Create Account
          </UiButton>
        </form>

        <div class="mt-6 text-center">
          <p class="text-slate-500 text-sm">
            Already have an account?
            <NuxtLink to="/auth/login" class="text-primary font-semibold hover:underline">
              Sign in
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

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const googleLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const handleGoogleSignUp = async () => {
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

const handleRegister = async () => {
  try {
    loading.value = true
    errorMessage.value = ''
    successMessage.value = ''

    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          first_name: firstName.value,
          last_name: lastName.value,
        },
      },
    })

    if (error) throw error

    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: data.user.id,
          email: email.value,
          first_name: firstName.value,
          last_name: lastName.value,
          is_guest: false,
        } as any)

      if (profileError) console.error('Profile creation error:', profileError)

      successMessage.value = 'Account created! Check your email to confirm.'
      
      setTimeout(() => {
        router.push('/auth/login')
      }, 2000)
    }
  } catch (error: any) {
    errorMessage.value = error.message || 'An error occurred'
  } finally {
    loading.value = false
  }
}
</script>
