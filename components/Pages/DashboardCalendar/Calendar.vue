<script lang="ts" setup>
// Import
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

// Interface and types
type EventData = {
  id: string;
  type: string;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  color: string;
};

type Step = EventData & {
  number: number;
};

type Event = EventData & {
  name: string;
  locale: string;
};

// Props
// removed due to not being used

// Variables

// Calendar and events
// Years
const years = [2024, 2023, 2022, 2021, 2020, 2019];
const calendars = [
  'Informática 2024',
  'Informática 2023',
  'Informática 2022',
  'Informática 2021',
  'Informática 2020',
  'Informática 2019',
];

// Event and steps (For example. Remove in other moment)
const stepItems: Array<Step> = [
  {
    id: '123452',
    number: 1,
    startDate: dayjs('2024-02-08'),
    endDate: dayjs('2024-03-23'),
    color: '#0092E4',
    type: 'step',
  },
  {
    id: '24522',
    number: 2,
    startDate: dayjs('2024-03-24'),
    endDate: dayjs('2024-05-14'),
    color: '#2DAC0D',
    type: 'step',
  },
  {
    id: '3456',
    number: 3,
    startDate: dayjs('2024-05-15'),
    endDate: dayjs('2024-07-09'),
    color: '#D1A300',
    type: 'step',
  },
  {
    id: '544',
    number: 4,
    startDate: dayjs('2024-08-10'),
    endDate: dayjs('2024-11-28'),
    color: '#D7004D',
    type: 'step',
  },
];
const eventItems: Array<Event> = [
  {
    id: '121312',
    name: 'IFRO Party',
    startDate: dayjs('2024-05-15'),
    endDate: dayjs('2024-05-22'),
    locale: 'Refeitório',
    color: '#B51B2A',
    type: 'event',
  },
  {
    id: '1242',
    name: 'IFRO Party 2',
    startDate: dayjs('2024-05-15'),
    endDate: dayjs('2024-05-22'),
    locale: 'Refeitório',
    color: '#211F1B',
    type: 'event',
  },
  {
    id: '12345',
    name: 'IFRO Party 3',
    startDate: dayjs('2024-05-31'),
    endDate: dayjs('2024-06-05'),
    locale: 'Refeitório',
    color: '#0092E4',
    type: 'event',
  },
];

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

        <div class="flex w-full lg:justify-end mb-6">
          <PagesDashboardCalendarViewsToggleView
            @view:calendar="handleUpdate"
          />
        </div>

        <!-- Content -->
        <!-- Partial calendar -->
        <PagesDashboardCalendarViewsPartialCalendar
          :year="2024"
          :events="eventItems"
          :steps="stepItems"
          v-show="calendarView === false"
        />

        <!-- Complete calendar -->
        <PagesDashboardCalendarViewsCompleteCalendar
          :year="2024"
          :events="eventItems"
          :steps="stepItems"
          v-show="calendarView !== false"
        />
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
