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

const calendar = await calendarData.getCalendar();
// Functions
// Calendar view
let calendarView = ref<boolean>(false);

const handleUpdate = (v: boolean) => {
  calendarView.value = v;
};
</script>

<template>
  <div class="container flex justify-center items-center w-screen mx-auto p-10">
    <!-- Modals -->
    <div class="flex items-center justify-center flex-shrink-0">
      <SectionCalendarioModal />
    </div>

    <!-- Calendar -->
    <div class="flex flex-col justify-center items-center w-max h-auto">
      <!-- Head -->
      <div class="w-full">
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
          <VVAutocompleteAPIModalidade name="modalidade.id" />

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

        <!-- Calendar preview -->
        <div
          class="flex flex-col-reverse gap-6 lg:flex-row justify-between w-full mb-6"
        >
          <!-- Event List -->
          <SectionCalendarioEventsSeeEventsList
            v-show="calendarView === true"
          />

          <!-- Preview -->
          <SectionCalendarioViewsToggleView
            :class="{
              'w-full': calendarView === false,
              'w-full lg:max-w-[500px]': calendarView === true,
            }"
            @view:calendar="handleUpdate"
          />
        </div>
      </div>

      <!-- Content -->
      <div>
        <!-- Partial calendar -->
        <SectionCalendarioViewsPartialCalendar
          :year="calendar?.year"
          :events="calendar?.events"
          :steps="calendar?.steps"
          v-show="calendarView === false"
        />

        <!-- Complete calendar -->
        <SectionCalendarioViewsCompleteCalendar
          :year="calendar?.year"
          :events="calendar?.events"
          :steps="calendar?.steps"
          v-show="calendarView !== false"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
