<script setup lang="ts">
import IntervaloItem from '@/components/Section/Intervalos/Items/Item.vue';
import IntervaloForm from '@/components/Section/Intervalos/Form/Form.vue';
import { IconsIconAdd } from '#components';

defineProps<{
  periodo: { nome: string; intervalos: { inicio: string; fim: string }[] };
  index: number;
  novoIntervalo: { inicio: string; fim: string } | null;
  editando: {
    periodoIndex: number;
    intervaloIndex: number;
    dados: { inicio: string; fim: string };
  } | null;
}>();

const emit = defineEmits([
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
  <div class="px-4">
    <div class="flex justify-between items-center mb-3">
      <h2 class="font-semibold text-[13px] border-l-4 border-ldsa-green-1 pl-2">{{ periodo.nome }}</h2>
    </div>

    <div v-for="(intervalo, j) in periodo.intervalos" :key="j">
      <template v-if="editando && editando.intervaloIndex === j">
        <IntervaloForm
          :model-value="editando.dados"
          @update:modelValue="val => emit('updateEdit', val)"
          :on-confirm="() => emit('confirmEdit')"
        />
        <button @click="() => emit('cancelEdit')" class="text-xs text-ldsa-grey">Cancelar</button>
      </template>
      <template v-else>
        <IntervaloItem
          :intervalo="intervalo"
          :onRemove="() => emit('removeIntervalo', j)"
          :onEdit="() => emit('edit', j)"
        />
      </template>
    </div>

    <IntervaloForm
      v-if="novoIntervalo"
      :model-value="novoIntervalo"
      @update:modelValue="val => emit('updateNovoIntervalo', val)"
      :on-confirm="() => emit('confirmNovo')"
    />

    <button
  v-else
  @click="emit('add')"
  :disabled="!!editando || !!novoIntervalo"
  class="mx-auto text-ldsa-grey font-semibold text-[12px] flex items-center gap-1 mt-4 disabled:opacity-40 disabled:cursor-not-allowed"
>
  Adicionar intervalo
  <IconsIconAdd class="w-[0.7rem] mb-0.5" />
</button>

  </div>
</template>