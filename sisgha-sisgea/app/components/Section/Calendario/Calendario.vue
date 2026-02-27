<script lang="ts" setup>
import IconCompleteCalendar from '@/components/Icons/Calendar/CompleteCalendar.vue';
import IconPartialCalendar from '@/components/Icons/Calendar/PartialCalendar.vue';
import dayjs from 'dayjs';
import { useToast } from '~/composables/useToast';
import { calendarDataMethods } from './CalendarDataMethods';
import GestaoPopover from './Gestao/GestaoPopover.vue';
import type { CalendarData } from './Types';

// TODO: diferenciar calendario do prof e do dape por meio das permissoes

const emit = defineEmits<{ (e: 'refresh'): void }>();

const selectedCampusGlobalState = useCampusContext();

let toggleView = ref<number>(0);
let selectedCalendar = ref<CalendarData | null>(null);
let selectedYear = ref<number>(dayjs().year());
const showDeleteModal = ref(false);

const selectedTrainingOffer = ref<string | null>(null);
const selectedCalendarId = ref<string | null>(null);

const allCalendars = ref<CalendarData[]>([]);

const filteredCalendars = computed(() => {
  if (!selectedTrainingOffer.value) return [];
  return allCalendars.value.filter(
    c => c.trainingOffer?.id === selectedTrainingOffer.value
  );
});

watch(filteredCalendars, () => {
  console.log('FILTERED:', filteredCalendars.value);
});

const isCalendarDisabled = computed(() => !selectedTrainingOffer.value);

const toggleItems = [
  { text: 'Calendário parcial', value: 0, icon: IconPartialCalendar },
  { text: 'Calendário completo', value: 1, icon: IconCompleteCalendar },
];

const { showToast } = useToast();

async function loadCalendars() {
  try {
    const campusId = selectedCampusGlobalState.value;
    if (!campusId) return;

    const res = await getApiClient().calendariosLetivos.calendarioLetivoFindAll(
      {
        filterCampusId: [campusId],
      }
    );

    const data = res.data || [];

    allCalendars.value = (data as any[]).map(c => ({
      id: c.id,
      name: c.nome ?? c.name ?? c.designacao ?? '',
      year: c.ano ?? c.year ?? undefined,

      trainingOffer: { id: c.ofertaFormacao?.id ?? '' },
      campus: { id: c.campus?.id ?? c.campusId ?? '' },

      ...c,
    })) as CalendarData[];

    console.log('CALENDÁRIOS FILTRADOS POR CAMPUS:', allCalendars.value);
    console.log('Formações disponíveis:', [
      ...new Set(
        allCalendars.value.map(cal => cal.trainingOffer?.id).filter(Boolean)
      ),
    ]);
  } catch (e) {
    console.error(e);
  }
}

onMounted(async () => {
  await loadCalendars();
});

watch(selectedCampusGlobalState, async () => {
  await loadCalendars();
});

async function toggleSelectedCalendarItem(value: string | null) {
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

onMounted(async () => {
  try {
    const res = await getApiClient().calendariosLetivos.calendarioLetivoFindAll(
      {}
    );
    const data = res.data || [];

    console.log('RAW CALENDARS', data);
    console.log('MAPPED CALENDARS', allCalendars.value);

    allCalendars.value = (data as any[]).map(c => ({
      id: c.id,
      name: c.nome ?? c.name ?? c.designacao ?? '',
      year: c.ano ?? c.year ?? undefined,

      trainingOffer: {
        id: c.ofertaFormacao?.id ?? '',
      },

      campus: { id: c.campus?.id ?? c.campusId ?? '' },

      ...c,
    })) as CalendarData[];

    console.log('MAPPED CALENDARS', allCalendars.value);

    console.table(
      allCalendars.value.map(c => ({
        id: c.id,
        nome: c.name,
        trainingOffer: c.trainingOffer?.id,
      }))
    );
  } catch (e) {
    console.error(e);
  }
});

watch(selectedTrainingOffer, () => {
  selectedCalendarId.value = null;
  selectedCalendar.value = null;
});

watch(selectedCampusGlobalState, () => {
  selectedTrainingOffer.value = null;
  selectedCalendarId.value = null;
  selectedCalendar.value = null;
});

watch(selectedYear, () => {
  if (selectedYear.value > dayjs().year()) {
    selectedYear.value = dayjs().year();
  }
});
</script>

<template>
  <UIContainer>
    <!-- Menu -->
    <div class="flex w-full justify-between items-center gap-2 mb-4">
      <div class="flex items-end gap-3.5 flex-1">
        <div class="w-30">
          <VVTextField
            v-model="selectedYear"
            name="calendarYear"
            type="number"
            min="2020"
            :max="dayjs().year()"
            label="Ano Letivo"
            :placeholder="'Ex: ' + dayjs().year()"
          />
        </div>

        <VVAutocompleteAPIOfertaFormacao
          v-model="selectedTrainingOffer"
          class="flex-1"
          name="trainingOffer"
          label="Formação"
          :filter="{
            campusId: selectedCampusGlobalState ?? undefined,
          }"
        />

        <VVAutocompleteAPICalendarioLetivo
          v-model="selectedCalendarId"
          name="selectedCalendar"
          label="Calendário"
          class="flex-1"
          :disabled="isCalendarDisabled"
          :filter="{ ofertaFormacaoId: selectedTrainingOffer ?? undefined }"
          @update:model-value="toggleSelectedCalendarItem"
        />

        <UIButtonDefaultSquare
          :disabled="!selectedTrainingOffer || !selectedCalendarId"
        >
          <IconsSearch class="w-5 h-5" />
        </UIButtonDefaultSquare>

        <GestaoPopover />

        <!-- <DialogModalEditOrCreateModal
          :form-component="SectionCalendarioForm"
          :form-props="
            selectedCalendar
              ? { calendarId: selectedCalendar.id }
              : { campusId: selectedCampusGlobalState }
          "
          @refresh="$emit('refresh')"
        /> -->
      </div>

      <!-- <UIButtonDefaultSquare
          class="flex border-2 border-ldsa-red justify-center items-center rounded-lg bg-ldsa-red"
          v-if="selectedCalendar"
          @click="apagarCalendario"
          @refresh="$emit('refresh')"
        >
          <IconsExclude class="w-5 h-5" />
        </UIButtonDefaultSquare> -->
    </div>

    <!-- <DialogConfirm
      v-model="showDeleteModal"
      message="Tem certeza que deseja apagar este calendário?"
      @confirm="handleConfirmDelete"
      @update:modelValue="val => !val && handleCancelDelete()"
    /> -->

    <!-- Content -->

    <!-- v-if="selectedCalendar" -->
    <!-- :key="selectedCalendar.id" -->
    <!-- v-show="selectedCalendar.year === selectedYear" -->
    <div class="flex flex-1 gap-3.5">
      <UIToggle
        v-model="toggleView"
        :disabled="!selectedCalendar"
        :items="toggleItems"
        class="w-full"
      />

      <!-- <SectionCalendarioViewsType1
        v-if="selectedCalendar && toggleView === 0"
        :calendar-data="selectedCalendar"
      />
      <SectionCalendarioViewsType2
        v-if="selectedCalendar && toggleView === 1"
        :calendar-data="selectedCalendar"
        :calendar-id="selectedCalendar.id"
        :year="selectedCalendar.year || 0"
      /> -->
    </div>

    <div
      v-if="!selectedTrainingOffer || !selectedCalendarId"
      class="flex flex-col justify-center items-center gap-5 mt-15"
    >
      <UIContentStateEmpty class="dark:saturate-75 dark:opacity-50" />
      <span class="text-ldsa-grey dark:contrast-0 text-center">
        Selecione um calendário nos filtros acima para visualizar suas
        informações.
      </span>
    </div>
  </UIContainer>
</template>
