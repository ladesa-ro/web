<script lang="ts" setup>
import { computed } from 'vue';
import ButtonModalGoBack from './ButtonModalGoBack.vue';
import IconEdit from '../icons/Edit.vue';
import IconExclude from '../icons/Exclude.vue';
import ModalBaseLayout from './ModalBaseLayout.vue';
import { formatWeekDayLabel, type ReasonsByDay } from './reason';

export type ReasonsEditModalProps = {
  motivosConfirmados: ReasonsByDay;
  selectedDayWeek: string | null;
};

export type GroupedReason = {
  motivo: string;
  dias: string[];
  horariosPorDia: Record<string, string[]>;
};

const props = defineProps<ReasonsEditModalProps>();

const emit = defineEmits<{
  (e: 'fechar'): void;
  (e: 'editar', payload: GroupedReason): void;
  (e: 'deletar', motivo: string): void;
}>();

const motivosAgrupados = computed<GroupedReason[]>(() => {
  const agrupamento: Record<
    string,
    {
      dias: Set<string>;
      horariosPorDia: Record<string, Set<string>>;
    }
  > = {};

  for (const [dia, motivos] of Object.entries(props.motivosConfirmados)) {
    for (const { motivo, horario } of motivos) {
      if (!agrupamento[motivo]) {
        agrupamento[motivo] = { dias: new Set(), horariosPorDia: {} };
      }
      agrupamento[motivo].dias.add(dia);
      if (!agrupamento[motivo].horariosPorDia[dia]) {
        agrupamento[motivo].horariosPorDia[dia] = new Set();
      }
      agrupamento[motivo].horariosPorDia[dia].add(horario);
    }
  }

  return Object.entries(agrupamento).map(([motivo, data]) => ({
    motivo,
    dias: Array.from(data.dias).sort(),
    horariosPorDia: Object.fromEntries(
      Object.entries(data.horariosPorDia).map(([dia, horariosSet]) => [
        dia,
        Array.from(horariosSet).sort(),
      ])
    ),
  }));
});

function formatarTooltip(item: GroupedReason): string {
  return item.dias
    .map(dia => {
      const horarios = (item.horariosPorDia[dia] ?? []).join(' ');
      return `${formatWeekDayLabel(dia)}: ${horarios}`;
    })
    .join(' | ');
}

const onClose = () => emit('fechar');
</script>

<template>
  <ModalBaseLayout
    :close-button="false"
    :on-close="onClose"
    title="Editar motivos de indisponibilidade"
    class="ui-reasons-edit-modal"
  >
    <div class="ui-reasons-edit-modal__scroll u-pr-2">
      <p class="ui-reasons-edit-modal__hint u-text-center u-font-medium">
        Esta é a listagem de todos os motivos cadastrados.
      </p>
      <p class="ui-reasons-edit-modal__hint u-text-center u-font-medium u-mb-3">
        Selecione um motivo para editá-lo.
      </p>

      <ul
        v-if="motivosAgrupados.length"
        class="ui-reasons-edit-modal__list u-text-sm"
      >
        <li
          v-for="item in motivosAgrupados"
          :key="item.motivo"
          class="ui-reasons-edit-modal__item u-flex u-items-center u-justify-between u-pb-2"
        >
          <span
            class="ui-reasons-edit-modal__name u-font-semibold u-text-sm u-mr-4"
          >
            {{ item.motivo }}
          </span>

          <div
            class="ui-reasons-edit-modal__details u-flex u-items-center u-gap-4"
          >
            <div
              class="ui-reasons-edit-modal__tooltip u-text-right u-truncate"
              :title="formatarTooltip(item)"
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
                <span v-if="index < item.dias.length - 1" class="u-mr-1"
                  >,</span
                >
              </template>
            </div>

            <div class="u-flex u-gap-2 u-items-center u-shrink-0">
              <button
                aria-label="Editar motivo"
                class="ui-reasons-edit-modal__action-btn ui-reasons-edit-modal__action-btn--edit"
                @click="emit('editar', item)"
              >
                <IconEdit class="ui-reasons-edit-modal__action-icon" />
              </button>
              <button
                aria-label="Excluir motivo"
                class="ui-reasons-edit-modal__action-btn ui-reasons-edit-modal__action-btn--delete"
                @click="emit('deletar', item.motivo)"
              >
                <IconExclude
                  class="ui-reasons-edit-modal__action-icon ui-reasons-edit-modal__action-icon--danger"
                />
              </button>
            </div>
          </div>
        </li>
      </ul>

      <div v-else class="ui-reasons-edit-modal__empty u-text-sm u-text-center">
        Ainda não há motivos cadastrados.
      </div>
    </div>

    <template #button-group>
      <div class="u-flex u-justify-start u-w-full">
        <ButtonModalGoBack @click="emit('fechar')" />
      </div>
    </template>
  </ModalBaseLayout>
</template>
