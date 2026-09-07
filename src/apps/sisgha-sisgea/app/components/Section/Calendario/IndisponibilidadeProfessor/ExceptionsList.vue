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
  <div class="u-flex u-flex-col u-gap-2">
    <div
      v-if="sorted.length === 0"
      class="u-text-sm u-text-center u-py-4 exceptions-list__empty"
    >
      Nenhuma exceção pontual cadastrada.
    </div>

    <div
      v-for="item in sorted"
      :key="item.id"
      class="u-flex u-items-center u-gap-3 u-rounded-lg u-px-3 u-py-2-5 u-flex-wrap exceptions-list__row"
    >
      <span class="u-font-semibold u-text-sm u-shrink-0 exceptions-list__date">
        {{ dayjs(item.data).format('DD/MM/YYYY') }}
      </span>

      <span class="u-text-sm u-shrink-0 exceptions-list__time">
        {{ item.inicio.slice(0, 5) }}–{{ item.fim.slice(0, 5) }}
      </span>

      <span
        class="u-text-xs u-font-semibold u-px-2 u-py-0-5 u-rounded-full u-shrink-0"
        :class="
          item.tipo === 'BLOQUEIO'
            ? 'exceptions-list__badge--bloqueio'
            : 'exceptions-list__badge--preferencia'
        "
      >
        {{ item.tipo === 'BLOQUEIO' ? 'Bloqueio' : 'Preferência' }}
      </span>

      <span class="u-text-sm u-flex-1 u-truncate exceptions-list__reason">
        {{ item.motivo || '—' }}
      </span>

      <div class="u-flex u-items-center u-gap-2 u-shrink-0 exceptions-list__actions">
        <button
          type="button"
          class="u-text-sm u-font-medium exceptions-list__edit-button"
          @click="emit('edit', item)"
        >
          Editar
        </button>
        <button
          type="button"
          class="u-text-sm u-font-medium exceptions-list__remove-button"
          @click="emit('remove', item)"
        >
          Excluir
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.exceptions-list__empty {
  color: var(--ladesa-grey-color);
}

.exceptions-list__row {
  border: 1px solid rgb(from var(--ladesa-grey-color) R G B / 20%);
}

.exceptions-list__date {
  width: 6rem;
}

.exceptions-list__time {
  color: var(--ladesa-grey-color);
}

.exceptions-list__badge--bloqueio {
  background-color: rgb(from var(--ladesa-red-color) R G B / 15%);
  color: var(--ladesa-red-color);
}

.exceptions-list__badge--preferencia {
  background-color: rgb(from var(--ladesa-yellow-color) R G B / 20%);
  color: var(--ladesa-text-default-color);
}

.exceptions-list__reason {
  color: var(--ladesa-grey-color);
  min-width: 8rem;
}

.exceptions-list__actions {
  margin-left: auto;
}

.exceptions-list__edit-button {
  color: var(--ladesa-text-green-color);
}

.exceptions-list__edit-button:hover {
  text-decoration: underline;
}

.exceptions-list__remove-button {
  color: var(--ladesa-red-color);
}

.exceptions-list__remove-button:hover {
  text-decoration: underline;
}
</style>
