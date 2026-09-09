<script lang="ts" setup>
import { computed } from 'vue';
import ButtonModalGoBack from './ButtonModalGoBack.vue';
import ModalBaseLayout from './ModalBaseLayout.vue';
import {
  formatWeekDayLabel,
  normalizeWeekDayKey,
  type ReasonEntry,
  type ReasonsByDay,
} from './reason';

export type ReasonsViewModalProps = {
  motivosConfirmados: ReasonsByDay;
  selectedDayWeek: string | null;
};

const props = defineProps<ReasonsViewModalProps>();

const emit = defineEmits<{
  (e: 'fechar'): void;
}>();

const diasDaSemana = [
  'segunda',
  'terça',
  'quarta',
  'quinta',
  'sexta',
  'sábado',
];

const motivosFormatadosPorDia = computed(() => {
  const chavesNormalizadas = Object.keys(props.motivosConfirmados).reduce(
    (acc, chaveOriginal) => {
      const chaveNormalizada = normalizeWeekDayKey(chaveOriginal);
      acc[chaveNormalizada] = props.motivosConfirmados[chaveOriginal] ?? [];
      return acc;
    },
    {} as Record<string, ReasonEntry[]>
  );

  return diasDaSemana.map(diaOriginal => {
    const chaveNormalizada = normalizeWeekDayKey(diaOriginal);
    const motivos = chavesNormalizadas[chaveNormalizada] ?? [];
    return {
      dia: diaOriginal,
      motivos,
    };
  });
});

const onClose = () => emit('fechar');
</script>

<template>
  <ModalBaseLayout
    :close-button="false"
    :on-close="onClose"
    title="Consultar motivos de indisponibilidade"
    class="ui-reasons-view-modal"
  >
    <div class="ui-reasons-view-modal__scroll u-pr-2">
      <div
        v-for="item in motivosFormatadosPorDia"
        :key="item.dia"
        class="u-mb-8"
      >
        <h3
          class="ui-reasons-view-modal__day-title u-font-semibold u-text-sm u-mb-2"
        >
          {{ formatWeekDayLabel(item.dia) }}
        </h3>

        <div
          v-if="item.motivos.length === 0"
          class="ui-reasons-view-modal__empty u-text-sm"
        >
          Não há indisponibilidade neste dia
        </div>

        <ul v-else class="ui-reasons-view-modal__list u-text-sm">
          <li
            v-for="motivo in item.motivos"
            :key="motivo.horario + motivo.motivo"
            class="ui-reasons-view-modal__item u-flex u-justify-between u-items-center u-py-2"
          >
            <span
              class="ui-reasons-view-modal__item-name u-font-semibold u-text-sm"
            >
              {{ motivo.motivo }}
            </span>
            <span class="ui-reasons-view-modal__empty u-text-sm">
              {{ motivo.horario }}
            </span>
          </li>
        </ul>
      </div>
    </div>

    <template #button-group>
      <div class="u-flex u-justify-start u-w-full">
        <ButtonModalGoBack @click="emit('fechar')" />
      </div>
    </template>
  </ModalBaseLayout>
</template>
