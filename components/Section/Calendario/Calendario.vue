<script lang="ts" setup>
// Import
import 'dayjs/locale/pt-br';
import { calendarData } from './Functions/CalendarData.js';

const years = [2024, 2023, 2022, 2021, 2020, 2019];
const calendars = [
  'Informática 2024',
  'Informática 2023',
  'Informática 2022',
  'Informática 2021',
  'Informática 2020',
  'Informática 2019',
];

const stepItems = await calendarData.getSteps();
const eventItems = await calendarData.getEvents();
// Functions
// Calendar view
let calendarView = ref<boolean>(false);

const handleUpdate = (v: boolean) => {
  calendarView.value = v;
};
</script>

<template>
  <v-container>
    <div class="container">
      <div class="flex flex-col justify-center items-center w-max h-auto">
        <!-- Select calendar -->
        <div
          class="flex flex-col xl:flex-row w-full justify-center items-center gap-4 m-auto mb-6 pt-[50px]"
        >
          <!-- Select year -->
          <VVAutocomplete
            name="year.id"
            label="Ano letivo"
            placeholder="Selecione um ano"
            :items="years"
            class="xl:max-w-[200px]"
          />

          <!-- Select modality -->
          <VVAutocompleteModalidades name="modalidade.id" />

          <!-- Select calendar -->
          <div class="flex w-full max-w-[1800px] gap-4">
            <VVAutocomplete
              name="calendar.id"
              label="Calendários"
              placeholder="Selecione um calendário"
              :items="calendars"
              class="w-full"
            />

            <!-- Buttons -->

            <!-- Search -->
            <div>
              <UIButtonSearch />
            </div>

            <!-- Add -->
            <div>
              <UIButtonAdd />
            </div>
          </div>
        </div>

        <div
          class="flex flex-col-reverse gap-6 lg:flex-row justify-between w-full mb-6"
        >
          <SectionCalendarioEventsSeeEventsList
            v-show="calendarView === true"
          />
          <SectionCalendarioViewsToggleView
            :class="{
              'w-full': calendarView === false,
              'w-full lg:max-w-[500px]': calendarView === true,
            }"
            @view:calendar="handleUpdate"
          />
        </div>

        <!-- Content -->
        <!-- Partial calendar -->
        <SectionCalendarioViewsPartialCalendar
          :year="2024"
          :events="eventItems"
          :steps="stepItems"
          v-show="calendarView === false"
        />

        <!-- Complete calendar -->
        <SectionCalendarioViewsCompleteCalendar
          :year="2024"
          :events="eventItems"
          :steps="stepItems"
          v-show="calendarView !== false"
        />

        <!-- Modals -->
        <div class="flex items-center flex-shrink-0">
          <SectionCalendarioModal />
        </div>
      </div>
    </div>
  </v-container>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.container-header {
  padding: 50px 0;
}

.container-header-actions {
  flex-shrink: 0;

  display: flex;
  align-items: center;
}
</style>
