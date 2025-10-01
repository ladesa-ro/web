<script setup lang="ts">
defineProps<{ showBreaks?: boolean; type: string }>();
</script>

<template>
  <div
    ref="cell-wrap"
    v-show="showBreaks ? true : type !== 'intervalo'"
    :class="[
      'relative not-last:border-b-[0.119565rem] nth-of-type-[2n]:mb-[0.5px] border-t-solid border-t-transparent border-b-2 border-b-solid border-b-ldsa-text-default/65 transform-[translateZ(0)] last:border-b-transparent',
    ]"
  >
    <div
      ref="cell"
      id="horario"
      class="relative box-border text-center h-[1.4375rem] 2xl:h-6 flex justify-center items-center text-[0.813rem] font-medium"
      :class="{
        'bg-ldsa-grey/20': type === 'intervalo',
      }"
    >
      <span v-if="type === 'intervalo'" class="text-ldsa-text-default/50"
        >Intervalo</span
      >
      <span v-else>-</span>
    </div>
  </div>
</template>
