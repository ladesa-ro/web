<script setup lang="ts">
import PeriodoCard from './Card.vue';

defineProps<{
  periodos: { nome: string; intervalos: { inicio: string; fim: string }[] }[];
  novosIntervalos: ({ inicio: string; fim: string } | null)[];
  intervaloEditando: {
    periodoIndex: number;
    intervaloIndex: number;
    dados: { inicio: string; fim: string };
  } | null;
}>();

defineEmits([
  'add',
  'removeIntervalo',
  'confirmNovo',
  'updateNovoIntervalo',
  'edit',
  'cancelEdit',
  'updateEdit',
  'confirmEdit',
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
      :editando="intervaloEditando && intervaloEditando.periodoIndex === i ? intervaloEditando : null"
      @add="$emit('add', i)"
      @removeIntervalo="j => $emit('removeIntervalo', i, j)"
      @confirmNovo="$emit('confirmNovo', i)"
      @updateNovoIntervalo="(val) => $emit('updateNovoIntervalo', i, val)"
      @edit="j => $emit('edit', i, j)"
      @cancelEdit="$emit('cancelEdit')"
      @updateEdit="$emit('updateEdit', $event)"
      @confirmEdit="$emit('confirmEdit')"
    />
  </div>
</template>
