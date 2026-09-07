<script setup lang="ts">
defineProps<{ data: string; horario: string }>();
</script>

<template>
  <div class="line u-flex u-justify-between regular">
    <p class="data">{{ data }}</p>
    <p class="horario">{{ horario }}</p>
  </div>
</template>

<style scoped>
.line {
  font-size: 0.6875rem;
  padding: 0.4rem;
  border-left: 2px solid var(--ladesa-grey-color);
  border-right: 2px solid var(--ladesa-grey-color);
  border-bottom: 2px solid var(--ladesa-grey-color);
}
</style>
