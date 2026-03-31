<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'gray' | 'outline'
  size?: 'sm' | 'md'
}

withDefaults(defineProps<Props>(), {
  variant: 'gray',
  size: 'md'
})

const baseStyles = 'inline-flex items-center justify-center font-bold rounded-full tracking-wide uppercase'

const variantStyles = {
  // Deep Navy background - used for categories
  primary: 'bg-primary/90 text-white',
  
  // Orange background - used for "Last Spots" or "Live"
  secondary: 'bg-secondary/90 text-white',

    // Lime background - used for "Open" or "Active"
  tertiary: 'bg-action/90 text-primary',

  // Silver background - used for "Draft" or "Finished"
  gray: 'bg-gray/20 text-primary/70',
  
  // Outline style
  outline: 'border border-gray text-primary'
}

const sizeStyles = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-3 py-1 text-[12px]'
}
</script>

<template>
  <span :class="[baseStyles, variantStyles[variant], sizeStyles[size]]">
    <slot />
  </span>
</template>