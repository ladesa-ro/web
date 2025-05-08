<script setup lang="ts">
defineProps<{ data: string, horario: string }>()
</script>

<template>
  <div class="line flex justify-between regular text-[11px] p-[0.4rem] border-x-2 border-b-2 border-ldsa-grey">
    <p class="data">{{ data }}</p>
    <p class="horario">{{ horario }}</p>
  </div>
</template>