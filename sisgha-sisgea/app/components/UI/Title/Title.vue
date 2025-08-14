<script setup lang="ts">
type Props = {
  text: string;
  variant?: 'default' | 'small' | 'mini';
};

const { variant = 'default' } = defineProps<Props>();
</script>

<template>
  <h1 class="text-ldsa-text-default" :class="variant">{{ text }}</h1>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.default {
  @apply flex mb-7 font-semibold text-lg sm:text-xl before:w-1.5 before:bg-ldsa-text-green before:mr-3;
}

.small {
  @apply flex items-center text-sm md:text-base lg:text-lg font-bold before:inline-block before:w-1 before:h-[1em] before:mr-2 before:bg-ldsa-text-green;
}

.mini {
  @apply flex items-center max-md:text-sm font-semibold before:inline-block before:w-1 before:h-[1em] before:mr-2 before:bg-ldsa-text-green;
}
</style>
