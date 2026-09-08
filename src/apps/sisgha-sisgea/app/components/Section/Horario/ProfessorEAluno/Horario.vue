<script lang="ts" setup>
import { getWeekDays } from '~/utils/get-week-days';

const props = defineProps<{ turmaId?: string | null }>();

const selectedOption = ref<'dia' | 'semana'>('dia');

const { data: authData } = useAuth();
const isAuthenticated = computed(() => !!authData.value);

const currentDay = useCurrentDay();
const weekDays = computed(() => getWeekDays(currentDay.value));
const exportDateStart = computed(() =>
  weekDays.value[0]!.dayAsDayJs.format('YYYY-MM-DD')
);
const exportDateEnd = computed(() =>
  weekDays.value[5]!.dayAsDayJs.format('YYYY-MM-DD')
);
</script>

<template>
  <UIContainer
    class="horario-root u-flex u-flex-col"
    :class="{ 'u-items-center': selectedOption !== 'semana' }"
  >
    <!-- Cabeçalho -->
    <SectionHorarioProfessorEAlunoHeaderSchedule
      v-model:toggle-option="selectedOption"
      class="horario-header u-w-full"
    />

    <div
      v-if="isAuthenticated"
      class="horario-export u-w-full u-flex u-justify-end"
    >
      <SectionCalendarioExportIcsModal
        :date-start="exportDateStart"
        :date-end="exportDateEnd"
      />
    </div>

    <!-- Opção "Horário da semana" -->
    <section
      v-show="selectedOption === 'semana'"
      class="horario-week-section u-flex u-flex-col u-justify-center u-gap-10"
    >
      <SectionHorarioProfessorEAlunoGeral
        :turma-id="props.turmaId"
        class="u-overflow-auto"
      />

      <!-- Botão "Gerar PDF" -->
      <UIButtonDefault class="horario-pdf-button"> Gerar PDF </UIButtonDefault>
    </section>

    <!-- Opção "Horário do dia" -->
    <SectionHorarioProfessorEAlunoDailyViewDaysAndLessons
      v-show="selectedOption === 'dia'"
      :turma-id="props.turmaId"
    />
  </UIContainer>
</template>

<style scoped>
.horario-root {
  gap: var(--ui-space-8);
}

@media (min-width: 1024px) {
  .horario-root {
    gap: var(--ui-space-12);
  }
}

.horario-header {
  max-width: 1536px;
  margin-inline: auto;
}

.horario-export {
  max-width: 1536px;
  margin-inline: auto;
  margin-top: -1rem;
}

@media (min-width: 1400px) {
  .horario-week-section {
    align-items: center;
  }
}

.horario-pdf-button {
  margin-inline: auto;
  min-height: 3.5rem;
  max-width: 10rem;
}
</style>
