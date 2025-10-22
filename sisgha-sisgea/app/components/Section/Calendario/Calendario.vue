<script lang="ts" setup>
// # IMPORT
import { SectionCalendarioForm, UIButtonSearch } from '#components';
import IconCompleteCalendar from '@/components/Icons/Calendar/CompleteCalendar.vue';
import IconPartialCalendar from '@/components/Icons/Calendar/PartialCalendar.vue';
import dayjs from 'dayjs';
import { calendarDataMethods } from './CalendarDataMethods';
import type { CalendarData } from './Types';

// # CODE
let toggleView = ref<number>(0);

const toggleItems = [
  { text: 'Calendário parcial', value: 0, icon: IconPartialCalendar },
  { text: 'Calendário completo', value: 1, icon: IconCompleteCalendar },
];

// TODO: Fix 'Get Calendar' Feature

let selectedCalendar = ref<CalendarData | null>(null);

async function toggleSelectedCalendarItem(value: string) {
  if (!value) {
    selectedCalendar.value = null;
    return;
  }
  selectedCalendar.value =
    await calendarDataMethods.calendar.getCalendarById(value);
}

let selectedTrainingOffer = ref<any | null>(null);
let selectedYear = ref<number>(dayjs().year());

onMounted(async () => {});
</script>

<template>
  <UIContainer>
    <!-- Menu -->
    <div class="flex w-full justify-between items-center gap-2 mb-4">
      <div class="flex gap-2">
        <div class="flex max-w-[17%] min-w-[17%]">
          <VVTextField
            v-model="selectedYear"
            name="calendarYear"
            type="number"
            label="Ano Letivo"
            placeholder="Digite aqui"
          />
        </div>
        <VVAutocompleteAPIOfertaFormacao
          name="trainingOffer"
          label="Formação"
        />
        <VVAutocompleteAPICalendarioLetivo
          name="selectedCalendar"
          @update:model-value="toggleSelectedCalendarItem"
        />
      </div>

      <div class="flex gap-2">
        <DialogModalEditOrCreateModal
          v-if="selectedCalendar"
          :form-component="SectionCalendarioForm"
          :form-props="{ calendarId: selectedCalendar.id }"
          @refresh="$emit('refresh')"
        />        
      </div>
    </div>

    <!-- Content -->
    <div
      v-if="selectedCalendar"
      :key="selectedCalendar.id"
      class="flex flex-col w-full justify-between items-center gap-2"
      v-show="selectedCalendar.year === selectedYear"
    >
      <UIToggle :items="toggleItems" v-model="toggleView" class="w-full" />
      <SectionCalendarioViewsType1
        v-if="selectedCalendar && toggleView === 0"
        :calendar-data="selectedCalendar"
      />
      <SectionCalendarioViewsType2
        v-if="selectedCalendar && toggleView === 1"
        :calendar-id="selectedCalendar.id"
        :year="selectedCalendar.year || 0"
      />
    </div>
  </UIContainer>
</template>
