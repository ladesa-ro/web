<script setup lang="ts">
defineProps<{ showBreaks?: boolean; type: string }>();
</script>

<template>
  <div v-show="showBreaks ? true : type !== 'intervalo'" class="cell-wrap">
    <div
      id="horario"
      class="horario"
      :class="['horario', type === 'intervalo' && 'bg-ldsa-grey/20']"
    >
      <span v-if="type === 'intervalo'" class="text-ldsa-text-default/50"
        >Intervalo</span
      >
      <span v-else>-</span>
    </div>
  </div>
</template>

<style scoped src="./gridCell.css"></style>
