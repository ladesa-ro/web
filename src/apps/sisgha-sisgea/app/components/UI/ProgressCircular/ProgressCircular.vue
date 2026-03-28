<script setup lang="ts">
type Props = { size?: string };
const { size = '5rem' } = defineProps<Props>();
</script>

<template>
  <div
    :style="{ width: size, height: size }"
    class="animate-spin border-7 border-ldsa-green-1 border-t-ldsa-green-1/20 rounded-full"
  />
</template>
