<script lang="ts" setup>
// # IMPORTS
import { IconsExclude, SectionCalendarioForm } from '#components';
import IconCompleteCalendar from '@/components/Icons/Calendar/CompleteCalendar.vue';
import IconPartialCalendar from '@/components/Icons/Calendar/PartialCalendar.vue';
import dayjs from 'dayjs';
import { ref } from 'vue';
import { useToast } from '~/composables/useToast';
import { calendarDataMethods } from './CalendarDataMethods';
import type { CalendarData } from './Types';

const emit = defineEmits<{ (e: 'refresh'): void }>();

// # STATES
let toggleView = ref<number>(0);
let selectedCalendar = ref<CalendarData | null>(null);
let selectedTrainingOffer = ref<any | null>(null);
let selectedYear = ref<number>(dayjs().year());
const showDeleteModal = ref(false);

// # TOGGLE ITEMS
const toggleItems = [
  { text: 'Calendário parcial', value: 0, icon: IconPartialCalendar },
  { text: 'Calendário completo', value: 1, icon: IconCompleteCalendar },
];

// # TOAST
const { showToast } = useToast();

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
  showDeleteModal.value = true;
}

function handleConfirmDelete() {
  if (!selectedCalendar.value) return;

  calendarDataMethods.calendar
    .deleteCalendar(selectedCalendar.value.id)
    .then(() => {
      selectedCalendar.value = null;
      emit('refresh');

      showToast('delete', 'success', 'O calendário foi apagado com sucesso.');
    })
    .catch(e => {
      console.error(e);
      showToast('delete', 'error', 'Falha ao apagar o calendário.');
    });
}

function handleCancelDelete() {
  showToast('delete', 'success', 'O calendário foi apagado com sucesso.');
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

        <UIButtonDefaultSquare
          class="flex border-2 border-ldsa-red justify-center items-center rounded-lg bg-ldsa-red"
          v-if="selectedCalendar"
          @click="apagarCalendario"
        >
          <IconsExclude class="w-5 h-5" />
        </UIButtonDefaultSquare>
      </div>
    </div>

    <DialogConfirm
      v-model="showDeleteModal"
      message="Tem certeza que deseja apagar este calendário?"
      @confirm="handleConfirmDelete"
      @update:modelValue="val => !val && handleCancelDelete()"
    />

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
