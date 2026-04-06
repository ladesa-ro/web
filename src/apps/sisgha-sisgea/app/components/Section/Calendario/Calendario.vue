<script lang="ts" setup>
import {
  IconsCalendarCompleteCalendar,
  IconsCalendarPartialCalendar,
} from '#components';
import dayjs from 'dayjs';
import { useToast } from '~/composables/useToast';
import { useCalendarioFiltersStore } from '~/composables/useCalendarioFiltersStore';
import GestaoPopover from './Gestao/GestaoPopover.vue';
import type { CalendarData } from './Types';

const calendarioLetivo = useCalendarioLetivo();

defineProps<{ dapeVisualization?: boolean }>();

const emit = defineEmits<{ (e: 'refresh'): void }>();

const route = useRoute();
const router = useRouter();

const filtersStore = useCalendarioFiltersStore();
const selectedCampusGlobalState = useCampusContext();

const toggleView = ref<number>(0);
const showDeleteModal = ref(false);

// Computed wrappers for store fields (bidirectional)
const selectedYear = computed({
  get: () => filtersStore.anoLetivo,
  set: (v: number) => { filtersStore.anoLetivo = v; },
});

const selectedTrainingOffer = computed({
  get: () => filtersStore.formacaoId,
  set: (v: string | null) => { filtersStore.formacaoId = v; },
});

const selectedCalendarId = computed({
  get: () => filtersStore.calendarioId,
  set: (v: string | null) => { filtersStore.calendarioId = v; },
});

// Query reativa: listar calendários por campus
const calendarsQuery = calendarioLetivo.list(
  computed(() => {
    const campusId = selectedCampusGlobalState.value;
    if (!campusId) return { limit: 0 };
    return { 'filter.campus.id': [campusId] };
  }),
);

const allCalendars = computed<CalendarData[]>(() =>
  (calendarsQuery.data.value?.data ?? []).map(c => ({
    id: c.id,
    name: c.nome,
    year: c.ano,
    trainingOffer: { id: c.ofertaFormacao?.id ?? '' },
    campus: { id: c.campus?.id ?? '' },
  })),
);

const filteredCalendars = computed(() => {
  if (!selectedTrainingOffer.value) return [];
  return allCalendars.value.filter(
    c => c.trainingOffer?.id === selectedTrainingOffer.value
  );
});

// Query reativa: carregar calendário selecionado
const calendarDetailQuery = calendarioLetivo.findOne(selectedCalendarId);

const selectedCalendar = computed<CalendarData | null>(() => {
  const cal = calendarDetailQuery.data.value;
  if (!cal) return null;
  return {
    id: cal.id,
    name: cal.nome,
    year: cal.ano,
    trainingOffer: { id: cal.ofertaFormacao?.id ?? '' },
    campus: { id: cal.campus?.id ?? '' },
  };
});

const toggleItems = [
  { text: 'Calendário parcial', value: 0, icon: IconsCalendarPartialCalendar },
  {
    text: 'Calendário completo',
    value: 1,
    icon: IconsCalendarCompleteCalendar,
  },
];

const { showToast } = useToast();

// On mount: hydrate store from URL query params
onMounted(() => {
  if (route.query.ano) filtersStore.anoLetivo = Number(route.query.ano);
  if (route.query.formacao && typeof route.query.formacao === 'string') filtersStore.formacaoId = route.query.formacao;
  if (route.query.calendario && typeof route.query.calendario === 'string') filtersStore.calendarioId = route.query.calendario;
});

// Sync store → URL (deep linking without page reload)
watch(
  [() => filtersStore.anoLetivo, () => filtersStore.formacaoId, () => filtersStore.calendarioId],
  () => {
    router.replace({
      query: {
        ...route.query,
        ano: filtersStore.anoLetivo?.toString(),
        formacao: filtersStore.formacaoId || undefined,
        calendario: filtersStore.calendarioId || undefined,
      },
    });
  },
);

// Sync campus context → store
watch(selectedCampusGlobalState, (newCampus) => {
  filtersStore.campusId = newCampus;
});

function handleConfirmDelete() {
  if (!selectedCalendar.value) return;

  calendarioLetivo
    .remove(selectedCalendar.value.id)
    .then(() => {
      selectedCalendarId.value = null;
      emit('refresh');
      showToast('delete', 'success', 'O calendário foi apagado com sucesso.');
    })
    .catch(e => {
      console.error(e);
      showToast('delete', 'error', 'Falha ao apagar o calendário.');
    });
}

watch(selectedTrainingOffer, () => {
  selectedCalendarId.value = null;
});

watch(selectedCampusGlobalState, () => {
  selectedTrainingOffer.value = null;
  selectedCalendarId.value = null;
});

watch(selectedYear, () => {
  if (selectedYear.value > dayjs().year()) {
    selectedYear.value = dayjs().year();
  }
});

const calendarSelectItems = computed(() =>
  filteredCalendars.value.map(c => ({ label: c.name, value: c.id })),
);

const selectedCalendarItem = computed({
  get: () => {
    if (!selectedCalendarId.value) return undefined;
    return calendarSelectItems.value.find(i => i.value === selectedCalendarId.value) ?? undefined;
  },
  set: (item: { label: string; value: string } | undefined) => {
    selectedCalendarId.value = item?.value ?? null;
  },
});
</script>

<template>
  <UIContainer class="flex flex-col gap-4">
    <UIBreadcrumbDapeBreadcrumb />

    <!-- Menu -->
    <div class="flex items-end gap-3.5 w-full">
      <div class="w-30">
        <VVTextField
          v-model="selectedYear"
          label="Ano Letivo"
          name="calendarYear"
          type="number"
          min="2020"
          :max="dayjs().year()"
          :placeholder="'Ex: ' + dayjs().year()"
        />
      </div>

      <VVAutocompleteAPIOfertaFormacao
        v-model="selectedTrainingOffer"
        class="flex-1"
        name="trainingOffer"
        label="Formação"
        :required="false"
        :filter="{
          campusId: selectedCampusGlobalState ?? undefined,
        }"
      />

      <UIFormOptionFieldsSelect
        v-if="filteredCalendars.length > 0"
        v-model="selectedCalendarItem"
        :items="calendarSelectItems"
        label="Calendário"
        placeholder="Selecione um calendário"
        class="flex-1"
      />

      <GestaoPopover v-if="dapeVisualization" />
    </div>

    <!-- Content -->
    <UIToggle
      v-model="toggleView"
      :disabled="!selectedCalendar"
      :items="toggleItems"
      class="w-full"
    />

    <KeepAlive>
      <SectionCalendarioViewsType1
        v-if="selectedCalendar && toggleView === 0"
        :calendar-data="selectedCalendar"
      />
    </KeepAlive>

    <SectionCalendarioViewsType2
      v-if="selectedCalendar && toggleView === 1"
      :calendar-data="selectedCalendar"
      :calendar-id="selectedCalendar.id"
      :year="selectedCalendar.year || 0"
    />

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
