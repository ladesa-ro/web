<script setup lang="ts">
type Props = { size?: string };
const { size = '5rem' } = defineProps<Props>();
</script>

<template>
  <div class="ui-progress-circular" :style="{ width: size, height: size }" />
</template>
