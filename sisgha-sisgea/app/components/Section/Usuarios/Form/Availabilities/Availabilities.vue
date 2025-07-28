<script lang="ts" setup>
import { getWeekDays } from '../../../Horario/-Helpers/GetWeekDays';
import { getActivesTeacherRole, useFormUser } from '../FormUtils';

const currentDay = useCurrentDay();
const week = getWeekDays(currentDay.value);
const weekDays = week.map(day => day.dayWeek);

const selectedDayWeek = ref();

const { values: formValues } = useFormUser();

const vinculosComCargoProfessor = computed(() =>
  getActivesTeacherRole(formValues.vinculos)
);

const activePanel = ref(vinculosComCargoProfessor.value[0]?.campus.id);

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

const $emit = defineEmits(['close']);
const onClose = () => $emit('close');
</script>

<template>
  <DialogModalBaseLayout
    :close-button="false"
    :on-close="onClose"
    title="Disponibilidade"
  >
    <UIOptionsCarousel
      :items="weekDays"
      v-model="selectedDayWeek"
      class="font-semibold"
    >
      <template #toggleButton>
        <IconsArrow />
      </template>
    </UIOptionsCarousel>

    <v-expansion-panels v-model="activePanel" mandatory>
      <SectionUsuariosFormAvailabilitiesAvailability
        v-for="vinculo in vinculosComCargoProfessor"
        :key="vinculo.campus.id"
        :vinculo="vinculo"
        :selectedDayWeek="selectedDayWeek"
      />
    </v-expansion-panels>
  </DialogModalBaseLayout>
</template>
