<script lang="ts" setup>
import WeekdaySelector from '~/components/UI/WeekDaySelector/WeekdaySelector.vue';
import { capitalizeFirst } from '@ladesa-ro/web.utils';
import { getWeekDays } from '~/utils/get-week-days';
import {
  dayShifts,
  motivosDisponiveis,
  formatarDia,
  agruparHorarios,
} from './-Helpers/motivos-utils';

const props = defineProps<{
  motivoAtual: {
    motivo: string;
    dias: string[];
    horariosPorDia: Record<string, string[]>;
  };
}>();

const emit = defineEmits<{
  (e: 'fechar'): void;
  (e: 'deletar', motivo: string): void;
  (
    e: 'atualizarComHorarios',
    payload: { horariosPorDia: Record<string, string[]>; motivo: string }
  ): void;
}>();

const novoMotivo = ref(props.motivoAtual.motivo);
const selectedDayWeek = ref(props.motivoAtual.dias[0] || '');

const horariosSelecionados = ref<string[]>([
  ...(props.motivoAtual.horariosPorDia[selectedDayWeek.value] || []),
]);

watch(selectedDayWeek, novoDia => {
  horariosSelecionados.value = [
    ...(props.motivoAtual.horariosPorDia[novoDia] || []),
  ];
});

const podeSalvar = computed(() => !!novoMotivo.value.trim());

function salvarAlteracoes() {
  const horariosPorDiaAtualizado = { ...props.motivoAtual.horariosPorDia };
  horariosPorDiaAtualizado[selectedDayWeek.value] = [
    ...horariosSelecionados.value,
  ];

  emit('atualizarComHorarios', {
    horariosPorDia: horariosPorDiaAtualizado,
    motivo: novoMotivo.value.trim(),
  });
}

const currentDay = useCurrentDay();
const week = getWeekDays(currentDay.value);
const weekDays = week.map(day => day.dayWeek);

const onClose = () => emit('fechar');
</script>

<template>
  <div class="modal-editar-motivo__wrapper u-flex u-flex-col u-gap-4">
    <DialogModalBaseLayout
      :close-button="false"
      :on-close="onClose"
      title="Editar motivos de indisponibilidade"
      class="modal-editar-motivo__panel u-flex-1 u-h-full u-p-4"
    >
      <div>
        <VVAutocomplete
          v-model="novoMotivo"
          :items="motivosDisponiveis"
          placeholder="Digite ou selecione um novo motivo"
          label="Motivo"
          name="motivo"
          class="u-w-full u-text-sm u-mt-1"
        />

        <div class="u-mt-4 u-text-sm">
          <div
            v-for="dia in props.motivoAtual.dias"
            :key="dia"
            class="modal-editar-motivo__day-row u-flex u-justify-between u-py-2"
          >
            <span class="modal-editar-motivo__day-label u-font-semibold">
              {{ formatarDia(dia) }}
            </span>
            <span class="modal-editar-motivo__day-value u-text-right">
              {{
                agruparHorarios(
                  props.motivoAtual.horariosPorDia[dia] || []
                ).join(', ')
              }}
            </span>
          </div>
        </div>
      </div>

      <template #button-group>
        <UIButtonModalCancel @click="emit('fechar')" />
        <UIButtonModalDelete
          @click="emit('deletar', props.motivoAtual.motivo)"
        />
        <UIButtonModalSave :disabled="!podeSalvar" @click="salvarAlteracoes" />
      </template>
    </DialogModalBaseLayout>

    <DialogModalBaseLayout
      :close-button="false"
      :on-close="onClose"
      title="Editar motivos de indisponibilidade"
      class="modal-editar-motivo__panel-schedule u-flex-1 u-p-4"
    >
      <div>
        <WeekdaySelector
          v-model="selectedDayWeek"
          :items="weekDays"
          class="u-font-semibold u-mb-4"
        />

        <section
          class="u-flex u-flex-row u-flex-wrap u-gap-3 u-justify-between u-w-full"
        >
          <div
            v-for="shift in dayShifts"
            :key="shift.title"
            class="modal-editar-motivo__shift u-flex-1"
          >
            <h3 class="modal-editar-motivo__shift-title u-mb-2">
              {{ capitalizeFirst(shift.title) }}
            </h3>
            <UICheckbox
              v-model="horariosSelecionados"
              :items="shift.times"
              class="nunito"
            />
          </div>
        </section>
      </div>
    </DialogModalBaseLayout>
  </div>
</template>

<style scoped>
.modal-editar-motivo__wrapper {
  height: min(90vh, 100%);
  width: min(95vw, 50rem);
}

@media (min-width: 768px) {
  .modal-editar-motivo__wrapper {
    flex-direction: row;
  }
}

.modal-editar-motivo__panel {
  overflow-x: hidden;
  overflow-y: auto;
}

.modal-editar-motivo__panel-schedule {
  max-height: 90vh;
  height: auto;
  overflow-x: hidden;
  overflow-y: auto;
}

.modal-editar-motivo__day-row {
  border-bottom: 1px solid var(--ladesa-grey-color);
}

.modal-editar-motivo__day-label {
  text-transform: capitalize;
  color: var(--ladesa-text-default-color);
}

.modal-editar-motivo__day-value {
  color: var(--ladesa-text-default-color);
}

.modal-editar-motivo__shift {
  min-width: 5rem;
  max-width: 7.5rem;
  overflow-x: hidden;
}

.modal-editar-motivo__shift-title {
  color: var(--ladesa-text-default-color);
}
</style>
