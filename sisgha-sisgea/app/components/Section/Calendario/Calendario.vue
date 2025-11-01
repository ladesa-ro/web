<script lang="ts" setup>
// # IMPORTS
import { SectionCalendarioForm } from '#components';
import IconCompleteCalendar from '@/components/Icons/Calendar/CompleteCalendar.vue';
import IconPartialCalendar from '@/components/Icons/Calendar/PartialCalendar.vue';
import dayjs from 'dayjs';
import { ref } from 'vue';
import { calendarDataMethods } from './CalendarDataMethods';
import type { CalendarData } from './Types';

const emit = defineEmits<{
  (e: 'refresh'): void
}>();

// # STATES
let toggleView = ref<number>(0);
let selectedCalendar = ref<CalendarData | null>(null);
let selectedTrainingOffer = ref<any | null>(null);
let selectedYear = ref<number>(dayjs().year());

// # TOGGLE ITEMS
const toggleItems = [
  { text: 'Calendário parcial', value: 0, icon: IconPartialCalendar },
  { text: 'Calendário completo', value: 1, icon: IconCompleteCalendar },
];

// # FUNCTIONS
async function toggleSelectedCalendarItem(value: string) {
  if (!value) {
    selectedCalendar.value = null;
    return;
  }
  selectedCalendar.value =
    await calendarDataMethods.calendar.getCalendarById(value);
}

async function apagarCalendario() {
  if (!selectedCalendar.value) return;

  const confirmDelete = confirm(
    `Tem certeza que deseja apagar o calendário "${selectedCalendar.value.name}"?`
  );
  if (!confirmDelete) return;

  try {
    await calendarDataMethods.calendar.deleteCalendar(
      selectedCalendar.value.id
    );
    alert('Calendário apagado com sucesso!');
    selectedCalendar.value = null; 
    emit('refresh');
  } catch (e) {
    console.error(e);
    alert('Erro ao apagar o calendário.');
  }
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
          v-if="selectedCalendar"
          :form-component="SectionCalendarioForm"
          :form-props="{ calendarId: selectedCalendar.id }"
          @refresh="$emit('refresh')"
        />
        <button
          v-if="selectedCalendar"
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          @click="apagarCalendario"
        >
          Apagar Calendário
        </button>
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
        :calendar-data="selectedCalendar"
        :calendar-id="selectedCalendar.id"
        :year="selectedCalendar.year || 0"
      />
    </div>
  </UIContainer>
</template>
