<script lang="ts" setup>
// # IMPORT
import { SectionCalendarioForm, UIButtonSearch } from '#components';
import IconCompleteCalendar from '@/components/Icons/Calendar/CompleteCalendar.vue';
import IconPartialCalendar from '@/components/Icons/Calendar/PartialCalendar.vue';
import dayjs from 'dayjs';

// # CODE
let toggleView = ref<number>(0);

const toggleItems = [
  { text: 'Calendário parcial', value: 0, icon: IconPartialCalendar },
  { text: 'Calendário completo', value: 1, icon: IconCompleteCalendar },
];

let selectedCalendar = ref<string | null>(null);
let selectedTrainingOffer = ref<any | null>(null);
let selectedYear = ref<number>(dayjs().year());

async function toggleSelectedCalendarItem(value: string | null) {
  selectedCalendar.value = value;
}
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
          :form-component="SectionCalendarioForm"
          :form-props="{ calendarId: selectedCalendar }"
        />
        <UIButtonSearch />
      </div>
    </div>

    <!-- Content -->
    <div class="flex flex-col w-full justify-between items-center gap-2" v-show="selectedCalendar">
      <UIToggle :items="toggleItems" v-model="toggleView" class="w-full" />
      <SectionCalendarioViewsType1
        v-show="toggleView === 0"
        :calendar-id="selectedCalendar!"
        :year="selectedYear!"
      />
      <SectionCalendarioViewsType2
        v-show="toggleView === 1"
        :calendar-id="selectedCalendar!"
        :year="selectedYear!"
      />
    </div>
  </UIContainer>
</template>
