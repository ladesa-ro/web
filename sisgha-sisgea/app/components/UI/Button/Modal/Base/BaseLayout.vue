<script lang="ts" setup>
type Props = {
  text: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  color?: string;
  opacity?: number;
  variant?: 'small' | 'normal';
};
const {
  text = 'Texto',
  color = 'black',
  opacity = 100,
  variant = 'normal',
} = defineProps<Props>();

const defineColor = {
  '--color': `rgb(from ${color} R G B / ${opacity / 100})`,
};
</script>

<template>
  <button :style="defineColor" :type="type" :class="variant">
    <p class="font-medium">{{ text }}</p>

    <span
      v-if="$slots['default']"
      :class="variant === 'small' ? 'w-2.5' : 'w-3 opacity-85'"
    >
      <!-- icon slot -->
      <slot />
    </span>
  </button>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.normal {
  @apply max-sm:gap-2 sm:justify-evenly h-9 min-w-28 sm:min-w-[8.438rem] max-sm:text-sm;
}

.small {
  @apply gap-2 justify-between px-2 h-7.5 text-sm;
}

button {
  @apply flex items-center justify-center border-solid border-2 rounded-lg border-(--color) text-(--color) transition-[background-color] duration-200 hover:bg-(--color)/15 focus-visible:bg-(--color)/15 active:bg-(--color)/30 disabled:bg-transparent disabled:border-(--color)/40 disabled:text-(--color)/40;
}
</style>
