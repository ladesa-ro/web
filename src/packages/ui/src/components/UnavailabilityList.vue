<script lang="ts" setup>
import { dayjs } from '@ladesa-ro/web.utils';
import { computed } from 'vue';
import Badge from './Badge.vue';
import type { UnavailabilityItem } from './unavailability';

export type UnavailabilityListProps = {
  items: UnavailabilityItem[];
};

const props = defineProps<UnavailabilityListProps>();

const emit = defineEmits<{
  edit: [item: UnavailabilityItem];
  remove: [item: UnavailabilityItem];
}>();

const sorted = computed(() =>
  [...props.items].sort((a, b) => (a.data ?? '').localeCompare(b.data ?? ''))
);
</script>

<template>
  <div class="u-flex u-flex-col u-gap-2">
    <div
      v-if="sorted.length === 0"
      class="ui-unavailability-list__empty u-text-sm u-text-center u-py-4"
    >
      Nenhuma exceção pontual cadastrada.
    </div>

    <div
      v-for="item in sorted"
      :key="item.id"
      class="ui-unavailability-list__row u-flex u-items-center u-gap-3 u-rounded-lg u-px-3 u-py-2-5 u-flex-wrap"
    >
      <span
        class="ui-unavailability-list__date u-font-semibold u-text-sm u-shrink-0"
      >
        {{ dayjs(item.data).format('DD/MM/YYYY') }}
      </span>

      <span class="ui-unavailability-list__time u-text-sm u-shrink-0">
        {{ item.inicio.slice(0, 5) }}–{{ item.fim.slice(0, 5) }}
      </span>

      <Badge
        class="u-shrink-0"
        :variant="item.tipo === 'BLOQUEIO' ? 'danger' : 'warning'"
      >
        {{ item.tipo === 'BLOQUEIO' ? 'Bloqueio' : 'Preferência' }}
      </Badge>

      <span
        class="ui-unavailability-list__reason u-text-sm u-flex-1 u-truncate"
      >
        {{ item.motivo || '—' }}
      </span>

      <div
        class="ui-unavailability-list__actions u-flex u-items-center u-gap-2 u-shrink-0"
      >
        <button
          type="button"
          class="ui-unavailability-list__edit-button u-text-sm u-font-medium"
          @click="emit('edit', item)"
        >
          Editar
        </button>
        <button
          type="button"
          class="ui-unavailability-list__remove-button u-text-sm u-font-medium"
          @click="emit('remove', item)"
        >
          Excluir
        </button>
      </div>
    </div>
  </div>
</template>
