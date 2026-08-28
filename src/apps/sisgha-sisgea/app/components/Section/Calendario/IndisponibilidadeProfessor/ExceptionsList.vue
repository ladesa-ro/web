<script lang="ts" setup>
import dayjs from 'dayjs';
import type { IndisponibilidadeItem } from './-Helpers/types';

const props = defineProps<{
  items: IndisponibilidadeItem[];
}>();

const emit = defineEmits<{
  edit: [item: IndisponibilidadeItem];
  remove: [item: IndisponibilidadeItem];
}>();

const sorted = computed(() =>
  [...props.items].sort((a, b) => (a.data ?? '').localeCompare(b.data ?? ''))
);
</script>

<template>
  <div class="flex flex-col gap-2">
    <div
      v-if="sorted.length === 0"
      class="text-sm text-ldsa-grey text-center py-4"
    >
      Nenhuma exceção pontual cadastrada.
    </div>

    <div
      v-for="item in sorted"
      :key="item.id"
      class="flex items-center gap-3 border border-ldsa-grey/20 rounded-lg px-3 py-2.5 flex-wrap"
    >
      <span class="font-semibold text-sm w-24 shrink-0">
        {{ dayjs(item.data).format('DD/MM/YYYY') }}
      </span>

      <span class="text-sm text-ldsa-grey shrink-0">
        {{ item.inicio.slice(0, 5) }}–{{ item.fim.slice(0, 5) }}
      </span>

      <span
        class="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0"
        :class="
          item.tipo === 'BLOQUEIO'
            ? 'bg-ldsa-red/15 text-ldsa-red'
            : 'bg-ldsa-yellow/20 text-ldsa-text-default'
        "
      >
        {{ item.tipo === 'BLOQUEIO' ? 'Bloqueio' : 'Preferência' }}
      </span>

      <span class="text-sm text-ldsa-grey flex-1 min-w-[8rem] truncate">
        {{ item.motivo || '—' }}
      </span>

      <div class="flex items-center gap-2 shrink-0 ml-auto">
        <button
          type="button"
          class="text-sm font-medium text-ldsa-text-green hover:underline"
          @click="emit('edit', item)"
        >
          Editar
        </button>
        <button
          type="button"
          class="text-sm font-medium text-ldsa-red hover:underline"
          @click="emit('remove', item)"
        >
          Excluir
        </button>
      </div>
    </div>
  </div>
</template>
