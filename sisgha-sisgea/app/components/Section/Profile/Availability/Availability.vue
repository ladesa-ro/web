<script setup>
import SisghaLogo from '~/components/Logo/Sisgha/Logo.vue';
import { getWeekDays } from '../../Horario/-Helpers/GetWeekDays';
import dayPeriods from './dayPeriods';

const currentDay = useCurrentDay();
const week = getWeekDays(currentDay.value);
const weekDays = week.map(day => day.dayWeek);
</script>

<template>
  <SectionProfileSectionsLayout
    title="Disponibilidade"
    class="max-[900px]:max-h-max"
    :icon="SisghaLogo"
  >
    <!-- hours card -->
    <div class="border-card min-w-75">
      <UIOptionsCarousel
        toggle-buttons-padding="0.75rem"
        class="bg-ldsa-green-1 px-1 text-ldsa-white font-medium"
        :items="weekDays"
      >
        <template #toggleButton>
          <IconsArrow class="text-ldsa-white" />
        </template>
      </UIOptionsCarousel>

      <!-- card content with day periods -->
      <section
        class="flex justify-center gap-2 lg:gap-3 xl:gap-4 2xl:gap-5 p-3 px-2.5 lg:p-4 xl:p-7"
      >
        <SectionProfileAvailabilityDayPeriod
          v-for="(period, periodName) in dayPeriods"
          :period="period"
          :period-name="periodName"
        />
      </section>
    </div>
  </SectionProfileSectionsLayout>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.day-week-navigator {
  @apply flex justify-between items-center gap-10;
  @apply h-9 px-1 bg-ldsa-green-1 text-ldsa-white;
}

.arrow {
  @apply px-3 py-2.5 text-ldsa-white;
}
</style>
