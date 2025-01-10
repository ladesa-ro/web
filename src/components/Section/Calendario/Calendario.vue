<script lang="ts" setup>
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

// Calendar view
const calendarView = ref<boolean>(false);

const handleUpdate = (v: boolean) => {
  calendarView.value = v;
};

const enableEventList = ref<boolean>(false);
async function showEventsList(value: boolean): Promise<void> {
  try {
    enableEventList.value = !value;
  } catch (error) {}
}
</script>

<template>
  <div class="container flex justify-center items-center w-screen mx-auto p-10">
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
              <SectionCalendarioModalForm />
            </div>
          </div>
        </div>

        <!-- Calendar preview -->
        <div
          class="flex flex-col-reverse gap-6 lg:flex-row justify-between w-full mb-6"
        >
          <!-- Event List -->
          <UIButtonEventsList
            v-show="calendarView === true"
            @click="showEventsList(enableEventList)"
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

      <!-- Modals -->
      <div class="flex items-center justify-center flex-shrink-0">
        <SectionCalendarioModalEventList
          :year="calendar?.year"
          :steps="calendar?.steps"
          :events="calendar?.events"
          :enable-modal="true"
        />
      </div>

      <!-- Content -->
      <div>
        <!-- Partial calendar -->
        <SectionCalendarioViewsPartialCalendar
          v-show="calendarView === false"
          :year="calendar?.year"
          :events="calendar?.events"
          :steps="calendar?.steps"
        />

        <!-- Complete calendar -->
        <SectionCalendarioViewsCompleteCalendar
          v-show="calendarView !== false"
          :year="calendar?.year"
          :events="calendar?.events"
          :steps="calendar?.steps"
        />
      </div>
    </div>
  </div>
</template>
