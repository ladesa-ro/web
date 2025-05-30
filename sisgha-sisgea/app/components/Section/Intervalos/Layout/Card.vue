<script setup lang="ts">
import IntervaloItem from '@/components/Section/Intervalos/Items/Item.vue';
import IntervaloForm from '@/components/Section/Intervalos/Form/Form.vue';
import { IconsIconAdd, IconsIconExclude } from '#components';

defineProps<{
  periodo: { nome: string; intervalos: { inicio: string; fim: string }[] };
  index: number;
  novoIntervalo: { inicio: string; fim: string } | null;
}>();

const emit = defineEmits([
  'add',
  'removeIntervalo',
  'confirmNovo',
  'limparPeriodos',
  'updateNovoIntervalo'
]);
</script>

<template>
  <div class="px-4">
    <div class="flex justify-between items-center mb-3">
      <h2 class="font-semibold text-[13px] border-l-4 border-ldsa-green-1 pl-2">{{ periodo.nome }}</h2>
      <button @click="emit('limparPeriodos', index)" class="w-[0.9rem] hover:text-ldsa-red"><IconsIconExclude /></button>
    </div>

    <IntervaloItem
      v-for="(intervalo, j) in periodo.intervalos"
      :key="j"
      :intervalo="intervalo"
      :onRemove="() => emit('removeIntervalo', index, j)"
    />

    <IntervaloForm
      v-if="novoIntervalo"
      :model-value="novoIntervalo"
      @update:modelValue="val => emit('updateNovoIntervalo', index, val)"
      :on-confirm="() => emit('confirmNovo', index)"
    />

    <button
      v-else
      @click="emit('add', index)"
      class="mx-auto text-ldsa-grey font-semibold text-[12px] flex items-center gap-1 mt-4"
    >
      Adicionar intervalo
      <IconsIconAdd class="w-[0.7rem] mb-0.5" />
    </button>
  </div>
</template>