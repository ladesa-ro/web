<script lang="ts" setup>
import { getWeekDays } from '~/utils/get-week-days';

const selectedOption = ref<'dia' | 'semana'>('dia');

const { data: authData } = useAuth();
const isAuthenticated = computed(() => !!authData.value);

const currentDay = useCurrentDay();
const weekDays = computed(() => getWeekDays(currentDay.value));
const exportDateStart = computed(
  () => weekDays.value[0]!.dayAsDayJs.format('YYYY-MM-DD')
);
const exportDateEnd = computed(
  () => weekDays.value[5]!.dayAsDayJs.format('YYYY-MM-DD')
);
</script>

<template>
  <UIContainer
    class="flex flex-col gap-8 lg:gap-12"
    :class="{ 'items-center': selectedOption !== 'semana' }"
  >
    <!-- Cabeçalho -->
    <SectionHorarioProfessorEAlunoHeaderSchedule
      v-model:toggle-option="selectedOption"
      class="w-full max-w-screen-2xl mx-auto"
    />

    <div
      v-if="isAuthenticated"
      class="w-full max-w-screen-2xl mx-auto flex justify-end -mt-4"
    >
      <SectionCalendarioExportIcsModal
        :date-start="exportDateStart"
        :date-end="exportDateEnd"
      />
    </div>

    <!-- Opção "Horário da semana" -->
    <section
      v-show="selectedOption === 'semana'"
      class="flex flex-col min-[1400px]:items-center justify-center gap-10"
    >
      <SectionHorarioProfessorEAlunoGeral class="overflow-auto" />

      <!-- Botão "Gerar PDF" -->
      <UIButtonDefault class="mx-auto min-h-14 max-w-40">
        Gerar PDF
      </UIButtonDefault>
    </section>

    <!-- Opção "Horário do dia" -->
    <SectionHorarioProfessorEAlunoDailyViewDaysAndLessons
      v-show="selectedOption === 'dia'"
    />
  </UIContainer>
</template>
