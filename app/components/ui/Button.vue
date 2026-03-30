<script setup lang="ts">
import { computed } from 'vue'
defineOptions({
  name: 'UiButton'
})

interface Props {
  to?: string | object
  variant?: 'primary' | 'secondary' | 'outline' | 'tertiary' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  link?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
})

const isLink = computed(() => !!props.to)

// Base styles that apply to every button
const baseStyles = 'inline-flex items-center justify-center rounded-xl font-bold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none'

const variantStyles = {
  // Use Navy as the primary reliable action
  primary: 'bg-primary text-white hover:bg-opacity-90 shadow-lg shadow-primary/20',
  
  // Use Yellow for high-visibility "Join" actions
  secondary: 'bg-secondary text-surface hover:brightness-105 shadow-lg shadow-secondary/20',

  // Use Green for success or "Live" actions
  tertiary: 'bg-action text-primary hover:bg-opacity-90 shadow-lg shadow-action/20',
  
  // Clean outline using the Silver color
  outline: 'border-2 border-primary bg-transparent hover:bg-slate-50 text-primary',

  // The new Navy-to-Green gradient
  gradient: 'bg-primary-gradient text-white hover:opacity-95 shadow-lg'
}

const sizeStyles = {
  sm: 'h-9 px-4 text-xs',
  md: 'h-11 px-6 text-sm',
  lg: 'h-14 px-10 text-base uppercase tracking-wider'
}
</script>

<template>
<NuxtLink
    v-if="isLink"
    :to="to"
    :class="[
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      loading ? 'cursor-wait' : 'cursor-pointer',
      disabled ? 'opacity-50 pointer-events-none' : '',
    ]"
    @click="$emit('click')"
  >
  <template v-if="loading">
    <svg class="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
    Cargando...
  </template>
  <slot v-else />
</NuxtLink>
<button
    v-else
    :disabled="disabled || loading"
    :class="[
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      loading ? 'cursor-wait' : 'cursor-pointer',
      disabled ? 'opacity-50 pointer-events-none' : '',
    ]"
    @click="$emit('click')"
  >
  <template v-if="loading">
    <svg class="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
    Cargando...
  </template>
  <slot v-else />
</button>
</template>
