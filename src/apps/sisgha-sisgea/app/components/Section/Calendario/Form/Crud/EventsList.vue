<script lang="ts" setup>
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import isBetween from 'dayjs/plugin/isBetween';
import relativeTime from 'dayjs/plugin/relativeTime';
import SearchBar from '~/components/UI/SearchBar/SearchBar.vue';
import type {
  CalendarioAgendamentoFindOneOutputDto,
} from '@ladesa-ro/web.api.client';
import type { CalendarData, CalendarEvent } from '../../Types';

dayjs.extend(isBetween);
dayjs.extend(relativeTime);
dayjs.locale('pt-br');

type Props = {
  calendarData: CalendarData;
};
const props = defineProps<Props>();
const $emit = defineEmits(['close', 'refresh']);

const showEventModal = ref(true);
const searchQuery = ref('');
const sortBy = ref<'name' | 'startDate' | 'endDate'>('startDate');
const sortOrder = ref<'asc' | 'desc'>('asc');

const sortOptions = [
  { label: 'Nome', value: 'name' },
  { label: 'Data de início', value: 'startDate' },
  { label: 'Data de término', value: 'endDate' },
];

const orderOptions = [
  { label: 'Crescente', value: 'asc' },
  { label: 'Decrescente', value: 'desc' },
];

function closeModal() {
  showEventModal.value = false;
  $emit('close');
  window.dispatchEvent(new CustomEvent('calendar-events-updated'));
}

function handleForceClose() {
  closeModal();
}

// Queries reativas
const calendarioLetivo = useCalendarioLetivo();
const agendamento = useCalendarioAgendamento();

const calendarId = computed(() => props.calendarData?.id ?? null);

const calendarQuery = calendarioLetivo.findOne(calendarId);

const eventsQuery = agendamento.findAll(
  computed(() => {
    if (!calendarId.value) return {};
    return {
      'filter.calendarioLetivo.id': [calendarId.value],
      limit: 100,
    };
  }),
);

const events = computed(() => {
  const id = calendarId.value;
  if (!id) return [];

  const cal = calendarQuery.data.value;
  const etapas = cal?.etapas ?? [];

  const steps: CalendarEvent[] = etapas.map((s) => ({
    id: s.id,
    name: s.nome,
    startDate: s.dataInicio,
    endDate: s.dataTermino,
    color: s.cor ?? null,
    calendar: { id },
  }));

  const evs: CalendarEvent[] = (eventsQuery.data.value?.data ?? []).map((o: CalendarioAgendamentoFindOneOutputDto) => ({
    id: o.id,
    name: o.nome ?? '',
    color: o.cor ?? null,
    startDate: o.dataInicio,
    endDate: o.dataFim ?? o.dataInicio,
    calendar: { id },
  }));

  return Array.from(
    new Map([...steps, ...evs].map(e => [e.id, e])).values()
  ).sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
});

onMounted(() => {
  window.addEventListener('force-close-inner-modals', handleForceClose);
  window.addEventListener('calendar-events-updated', handleEventsUpdated);
});
onBeforeUnmount(() => {
  window.removeEventListener('force-close-inner-modals', handleForceClose);
  window.removeEventListener('calendar-events-updated', handleEventsUpdated);
});

// Computed
const filteredEvents = computed(() => {
  let result = events.value;

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(event => event.name.toLowerCase().includes(query));
  }

  result = [...result].sort((a, b) => {
    let comparison = 0;
    switch (sortBy.value) {
      case 'name':
        comparison = a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        break;
      case 'startDate':
        comparison = new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        break;
      case 'endDate':
        comparison = new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        break;
    }
    return sortOrder.value === 'asc' ? comparison : -comparison;
  });

  return result;
});

// Helpers
function formatDate(date: string) {
  return dayjs(date).format('DD/MM/YYYY');
}

function isNotStarted(event: CalendarEvent) {
  return dayjs().isBefore(dayjs(event.startDate));
}

function isInProgress(event: CalendarEvent) {
  return dayjs().isBetween(
    dayjs(event.startDate),
    dayjs(event.endDate),
    undefined,
    '[]'
  );
}

function remainingDays(event: CalendarEvent) {
  const now = dayjs();
  const start = dayjs(event.startDate);
  const end = dayjs(event.endDate);
  if (isNotStarted(event)) return start.diff(now, 'day');
  if (isInProgress(event)) return end.diff(now, 'day');
  return 0;
}

function handleEventsUpdated() {
  calendarioLetivo.invalidate();
  agendamento.invalidate();
}

</script>

<template>
  <DialogModalBaseLayout
    v-if="showEventModal"
    :on-close="closeModal"
    title="Ver Eventos"
  >
    <div class="mt-1">
      <SearchBar v-model="searchQuery" placeholder="Buscar evento..." />
    </div>

    <div class="flex gap-2 border-b-2 border-b-ldsa-grey pb-4">
      <VVAutocomplete
        :items="sortOptions"
        :model-value="sortBy"
        class="w-full"
        label="Classificar por"
        name="sortBy"
        placeholder="Selecione uma opção"
        @update:model-value="sortBy = $event"
      />
      <VVAutocomplete
        :items="orderOptions"
        :model-value="sortOrder"
        class="w-1/2"
        label="Ordem"
        name="sortOrder"
        placeholder="Selecione a ordem"
        @update:model-value="sortOrder = $event"
      />
    </div>

    <div class="flex flex-col w-full h-full gap-4 max-h-[90vh]">
      <div
        v-for="event in filteredEvents"
        :key="event.id"
        class="flex flex-col border-2 border-ldsa-grey rounded-lg p-3 text-ldsa-text-default"
      >
        <!-- Cabeçalho -->
        <div class="flex justify-between items-center">
          <div class="flex gap-2 items-center">
            <div
              class="rounded-full w-3 h-3"
              :style="{ backgroundColor: event.color || '#ddd' }"
            />
            <h2 class="font-bold text-base">
              {{ event.name }}
            </h2>
          </div>
        </div>

        <!-- Conteúdo -->
        <ul class="mt-2 text-sm">
          <li>
            Início: <span>{{ formatDate(event.startDate) }}</span>
          </li>
          <li>
            Término: <span>{{ formatDate(event.endDate) }}</span>
          </li>
        </ul>

        <p v-if="isNotStarted(event)" class="my-2">
          Começa em <span>{{ remainingDays(event) }}</span> dias.
        </p>
        <p v-else-if="isInProgress(event)" class="my-2">
          Termina em <span>{{ remainingDays(event) }}</span> dias.
        </p>

        <SectionCalendarioEventLocale
          v-if="event.locale"
          :locale="event.locale"
        />
      </div>

      <p
        v-if="filteredEvents.length === 0"
        class="text-center text-ldsa-grey mt-4"
      >
        Nenhum evento encontrado.
      </p>
    </div>

    <!-- Botão fechar -->
    <template #button-group>
      <UIButtonModalCancel
        type="close"
        class="flex w-full"
        @click="closeModal"
      />
    </template>
  </DialogModalBaseLayout>
</template>
