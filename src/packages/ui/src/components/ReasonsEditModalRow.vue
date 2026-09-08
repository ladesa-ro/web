<script setup lang="ts">
import IconEdit from '../icons/Edit.vue';
import IconExclude from '../icons/Exclude.vue';
import { formatWeekDayLabel } from './reason';
import type { GroupedReason } from './grouped-reason';

export type ReasonsEditModalRowProps = { item: GroupedReason };

const props = defineProps<ReasonsEditModalRowProps>();

defineEmits<{
  editar: [item: GroupedReason];
  deletar: [motivo: string];
}>();

const tooltip = () =>
  props.item.dias
    .map(dia => {
      const horarios = (props.item.horariosPorDia[dia] ?? []).join(' ');
      return `${formatWeekDayLabel(dia)}: ${horarios}`;
    })
    .join(' | ');
</script>

<template>
  <li
    class="ui-reasons-edit-modal__item u-flex u-items-center u-justify-between u-pb-2"
  >
    <span class="ui-reasons-edit-modal__name u-font-semibold u-text-sm u-mr-4">
      {{ item.motivo }}
    </span>

    <div class="ui-reasons-edit-modal__details u-flex u-items-center u-gap-4">
      <div
        class="ui-reasons-edit-modal__tooltip u-text-right u-truncate"
        :title="tooltip()"
      >
        <template v-for="(dia, index) in item.dias" :key="dia">
          <span class="ui-reasons-edit-modal__day-label u-font-medium"
            >{{ formatWeekDayLabel(dia) }}:</span
          >
          <span
            v-for="(horario, i) in item.horariosPorDia[dia]"
            :key="horario + i"
            class="u-ml-1"
          >
            {{ horario }}
          </span>
          <span v-if="index < item.dias.length - 1" class="u-mr-1">,</span>
        </template>
      </div>

      <div class="u-flex u-gap-2 u-items-center u-shrink-0">
        <button
          aria-label="Editar motivo"
          class="ui-reasons-edit-modal__action-btn ui-reasons-edit-modal__action-btn--edit"
          @click="$emit('editar', item)"
        >
          <IconEdit class="ui-reasons-edit-modal__action-icon" />
        </button>
        <button
          aria-label="Excluir motivo"
          class="ui-reasons-edit-modal__action-btn ui-reasons-edit-modal__action-btn--delete"
          @click="$emit('deletar', item.motivo)"
        >
          <IconExclude
            class="ui-reasons-edit-modal__action-icon ui-reasons-edit-modal__action-icon--danger"
          />
        </button>
      </div>
    </div>
  </li>
</template>
