<script setup lang="ts">
type Props = {
  variant?: 'tighter' | 'tight' | 'default' | 'large' | 'larger';
  styled?: boolean;
};

const { variant = 'default', styled = true } = defineProps<Props>();
</script>

<template>
  <div
    v-if="styled"
    class="flex-1 mx-5 min-[385px]:mx-10 sm:mx-20 text-ldsa-text-default"
    :class="variant"
  >
    <slot />
  </div>

  <template v-else>
    <slot />
  </template>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.tighter {
  @apply md:mx-42 lg:mx-58 xl:mx-96 2xl:mx-108;
}

.tight {
  @apply md:mx-36 lg:mx-48 xl:mx-72 2xl:mx-96;
}

.default {
  @apply md:mx-32 lg:mx-40 xl:mx-56 2xl:mx-72;
}

.large {
  @apply md:mx-26 lg:mx-32 xl:mx-48 2xl:mx-60;
}

.larger {
  @apply md:mx-8 lg:mx-12 xl:mx-28 2xl:mx-40;
}
</style>
