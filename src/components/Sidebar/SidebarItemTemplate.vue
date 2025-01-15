<script lang="ts" setup>
type Props = {
  title: string;
  icon: any;
};
defineProps<Props>();
</script>

<template>
  <button class="base-template">
    <img :src="icon" class="w-6 mr-4 -icon-white" alt="Ícone da funcionalidade." />
    <span> {{ title }} </span>
  </button>
</template>

<style scoped>
.base-template {
  @apply flex items-center;
  @apply px-4 w-64 min-h-12;
  @apply text-ldsa-white hover:bg-ldsa-white/[0.07];
}
</style>
