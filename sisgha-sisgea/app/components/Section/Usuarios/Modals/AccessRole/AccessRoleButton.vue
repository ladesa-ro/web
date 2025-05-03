<script lang="ts" setup>
type Props = {
  positionName: string;
  to: string;
  active: boolean;
};

defineProps<Props>();
</script>

<template>
  <nuxt-link
    :class="{ active: active }"
    :to="to"
    class="flex flex-col justify-end items-center gap-2 w-28 h-36 px-0 py-8 border-2 rounded-lg border-ldsa-grey/50 text-center font-semibold cursor-pointer"
  >
    <!-- icon -->
    <slot />

    {{ positionName }}
  </nuxt-link>
</template>

<style scoped>
@reference "~/assets/styles/app-reference.css";

.active {
  @apply bg-ldsa-green-1 border-ldsa-green-1 text-ldsa-white;
}
</style>
