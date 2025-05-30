<script setup lang="ts">
import PeriodoCard from './Card.vue';

defineProps<{
  periodos: { nome: string; intervalos: { inicio: string; fim: string }[] }[];
  novosIntervalos: ({ inicio: string; fim: string } | null)[];
}>();

defineEmits([
  'add',
  'removeIntervalo',
  'confirmNovo',
  'limparPeriodos',
  'updateNovoIntervalo',
]);
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 divide-x divide-ldsa-grey">
    <PeriodoCard
      v-for="(periodo, i) in periodos"
      :key="i"
      :periodo="periodo"
      :index="i"
      :novo-intervalo="novosIntervalos[i] ?? null"
      @add="$emit('add', i)"
      @removeIntervalo="j => $emit('removeIntervalo', i, j)"
      @confirmNovo="$emit('confirmNovo', i)"
      @limparPeriodos="$emit('limparPeriodos', i)"
      @updateNovoIntervalo="(i, val) => $emit('updateNovoIntervalo', i, val)"
    />
  </div>
</template>
