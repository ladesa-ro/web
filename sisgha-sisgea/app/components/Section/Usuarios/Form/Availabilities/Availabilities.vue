<script lang="ts" setup>
import { useCurrentDay } from '#imports';
import { computed, ref, watch } from 'vue';
import { getWeekDays } from '../../../Horario/-Helpers/GetWeekDays';
import { getActivesTeacherRole, useFormUser } from '../FormUtils';
import WeekdaySelector from '../../../../UI/WeekDaySelector/WeekdaySelector.vue';

const currentDay = useCurrentDay();
const week = getWeekDays(currentDay.value);
const weekDays = week.map(day => day.dayWeek);

const selectedDayWeek = ref<string>(weekDays[0] ?? '');

const motivosConfirmados = ref<
  Record<string, { horario: string; motivo: string }[]>
>({});

const { values: formValues } = useFormUser();

const vinculosComCargoProfessor = computed(() =>
  getActivesTeacherRole(formValues.vinculos)
);

const activePanel = ref<string | null>(
  vinculosComCargoProfessor.value[0]?.campus.id || null
);

watch(vinculosComCargoProfessor, (current, previous) => {
  const inserted = current.find(
    i => previous.findIndex(k => k.campus.id === i.campus.id) === -1
  );

  if (inserted) {
    activePanel.value = inserted.campus.id;
  } else {
    const activeExistsInCurrent = current.some(
      i => i.campus.id === activePanel.value
    );

    const lastItem = current[current.length - 1];

    if (!activeExistsInCurrent && lastItem) {
      activePanel.value = lastItem.campus.id;
    }
  }
});

const emit = defineEmits<{
  (
    e: 'abrir-modal',
    tipo: 'cadastrar' | 'consultar' | 'listar' | 'editar',
    payload?: any
  ): void;
  (e: 'atualizar-horarios-sem-motivo', horarios: string[]): void;
  (
    e: 'atualizar-motivos',
    motivos: Record<string, { horario: string; motivo: string }[]>
  ): void;
  (e: 'close'): void;
}>();

const onClose = () => emit('close');
</script>

<template>
  <DialogModalBaseLayout
    :close-button="false"
    :on-close="onClose"
    title="Disponibilidade"
  >
   <WeekdaySelector
      :items="weekDays"
      v-model="selectedDayWeek"
      class="font-semibold"
    />

    <v-expansion-panels v-model="activePanel" mandatory>
      <SectionUsuariosFormAvailabilitiesAvailability
        v-for="vinculo in vinculosComCargoProfessor"
        :key="vinculo.campus.id"
        :vinculo="vinculo"
        :selectedDayWeek="selectedDayWeek"
        :motivosConfirmados="motivosConfirmados"
        @abrir-modal="(...args) => $emit('abrir-modal', ...args)"
        @atualizar-horarios-sem-motivo="
          $emit('atualizar-horarios-sem-motivo', $event)
        "
        @atualizar-motivos="$emit('atualizar-motivos', $event)"
      />
    </v-expansion-panels>
  </DialogModalBaseLayout>
</template>
