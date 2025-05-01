<script lang="ts" setup>
import 'dayjs/locale/pt-br';
import CalendarioForm3 from './Forms/Form3.vue';
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

const isActive = ref(false);
const onClose = () => (isActive.value = false);
</script>

<template>
  <UIContainer variant="tight" class="flex flex-col gap-5">
    <!-- header -->
    <div class="flex flex-col lg:flex-row w-full justify-between gap-5">
      <!-- Select year -->
      <VVAutocomplete
        :items="years"
        class="max-lg:w-full lg:max-w-56"
        label="Ano letivo"
        name="year.id"
        placeholder="Ano"
      />

      <span class="flex gap-5 w-full">
        <!-- Select calendar -->
        <VVAutocomplete
          :items="calendars"
          class="w-full"
          label="Calendários"
          name="calendar.id"
          placeholder="Selecione um calendário"
        />

        <!-- button add -->
        <DialogModalEditOrCreateModal
          :form-component="CalendarioForm3"
          @close="onClose"
        />
      </span>
    </div>

    <SectionCalendarioViewsToggleView @view:calendar="handleUpdate" />

    <span v-show="calendarView">
      <SectionCalendarioModalEventList
        :enable-modal="false"
        :events="calendar?.events"
        :steps="calendar?.steps"
        :year="calendar?.year"
      />
    </span>

    <!-- Content -->

    <!-- Partial calendar -->
    <SectionCalendarioViewsPartialCalendar
      v-show="!calendarView"
      :events="calendar?.events"
      :steps="calendar?.steps"
      :year="calendar?.year"
    />

    <!-- Complete calendar -->
    <SectionCalendarioViewsCompleteCalendar
      v-show="calendarView"
      :events="calendar?.events"
      :steps="calendar?.steps"
      :year="calendar?.year"
    />
  </UIContainer>
</template>
