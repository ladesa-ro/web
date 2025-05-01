<!-- this component is inspired by v-container from vuetify lib -->

<script setup lang="ts">
type Props = { variant?: 'default' | 'tight' };

const { variant = 'default' } = defineProps<Props>();
</script>

<template>
  <div
    class="flex-1 mx-5 min-[385px]:mx-10 sm:mx-20"
    :class="variant === 'default' ? 'default' : 'tight'"
  >
    <slot />
  </div>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.default {
  @apply md:mx-32 lg:mx-40 xl:mx-56 2xl:mx-72;
}

.tight {
  @apply md:mx-36 lg:mx-48 xl:mx-72 2xl:mx-96;
}
</style>
