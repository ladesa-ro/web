<script lang="ts" setup>
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import isBetween from 'dayjs/plugin/isBetween';
import relativeTime from 'dayjs/plugin/relativeTime';
import SearchBar from '~/components/UI/SearchBar/SearchBar.vue';
import type { CalendarioAgendamentoFindOneOutputDto } from '@ladesa-ro/web.api.client';
import type { CalendarData, CalendarEvent } from '../../Types';
import {
  useInjectCalendarioEvents,
  useOnCalendarioEventsUpdated,
  useOnCalendarioForceClose,
} from '../../useCalendarioEventBus';

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

const calendarioEvents = useInjectCalendarioEvents();

function closeModal() {
  showEventModal.value = false;
  $emit('close');
  calendarioEvents.emitEventsUpdated();
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
  })
);

const events = computed(() => {
  const id = calendarId.value;
  if (!id) return [];

  const cal = calendarQuery.data.value;
  const etapas = cal?.etapas ?? [];

  const steps: CalendarEvent[] = etapas.map(s => ({
    id: s.id,
    name: s.nome,
    startDate: s.dataInicio,
    endDate: s.dataTermino,
    color: s.cor ?? null,
    calendar: { id },
    type: 'etapa',
  }));

  const evs: CalendarEvent[] = (eventsQuery.data.value?.data ?? []).map(
    (o: CalendarioAgendamentoFindOneOutputDto) => ({
      id: o.id,
      name: o.nome ?? '',
      color: o.cor ?? null,
      startDate: o.dataInicio,
      endDate: o.dataFim ?? o.dataInicio,
      calendar: { id },
      type: 'agendamento',
    })
  );

  return Array.from(
    new Map([...steps, ...evs].map(e => [e.id, e])).values()
  ).sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
});

useOnCalendarioForceClose(handleForceClose);
useOnCalendarioEventsUpdated(handleEventsUpdated);

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
        comparison =
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        break;
      case 'endDate':
        comparison =
          new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
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
    <div class="events-list__search">
      <SearchBar v-model="searchQuery" placeholder="Buscar evento..." />
    </div>

    <div class="u-flex u-gap-2 u-pb-4 events-list__sort-bar">
      <VVAutocomplete
        :items="sortOptions"
        :model-value="sortBy"
        class="u-w-full"
        label="Classificar por"
        name="sortBy"
        placeholder="Selecione uma opção"
        @update:model-value="sortBy = $event"
      />
      <VVAutocomplete
        :items="orderOptions"
        :model-value="sortOrder"
        class="events-list__sort-order"
        label="Ordem"
        name="sortOrder"
        placeholder="Selecione a ordem"
        @update:model-value="sortOrder = $event"
      />
    </div>

    <div class="u-flex u-flex-col u-w-full u-h-full u-gap-4 events-list__events">
      <div
        v-for="event in filteredEvents"
        :key="event.id"
        class="u-flex u-flex-col u-rounded-lg u-p-3 events-list__card"
      >
        <!-- Cabeçalho -->
        <div class="u-flex u-justify-between u-items-center">
          <div class="u-flex u-gap-2 u-items-center">
            <div
              class="u-rounded-full events-list__dot"
              :style="{ backgroundColor: event.color || '#ddd' }"
            />
            <h2 class="u-font-bold u-text-base">
              {{ event.name }}
            </h2>
            <UIBadge :variant="event.type === 'etapa' ? 'info' : 'success'">
              {{ event.type === 'etapa' ? 'Etapa' : 'Evento' }}
            </UIBadge>
          </div>
        </div>

        <!-- Conteúdo -->
        <ul class="u-text-sm events-list__meta">
          <li>
            Início: <span>{{ formatDate(event.startDate) }}</span>
          </li>
          <li>
            Término: <span>{{ formatDate(event.endDate) }}</span>
          </li>
        </ul>

        <p v-if="isNotStarted(event)" class="events-list__remaining">
          Começa em <span>{{ remainingDays(event) }}</span> dias.
        </p>
        <p v-else-if="isInProgress(event)" class="events-list__remaining">
          Termina em <span>{{ remainingDays(event) }}</span> dias.
        </p>

        <SectionCalendarioEventLocale
          v-if="event.locale"
          :locale="event.locale"
        />
      </div>

      <p
        v-if="filteredEvents.length === 0"
        class="u-text-center events-list__empty"
      >
        Nenhum evento encontrado.
      </p>
    </div>

    <!-- Botão fechar -->
    <template #button-group>
      <UIButtonModalCancel
        type="close"
        class="u-flex u-w-full"
        @click="closeModal"
      />
    </template>
  </DialogModalBaseLayout>
</template>

<style scoped>
.events-list__search {
  margin-top: var(--ui-space-1);
}

.events-list__sort-bar {
  border-bottom: 2px solid var(--ladesa-grey-color);
}

.events-list__sort-order {
  width: 50%;
}

.events-list__events {
  max-height: 90vh;
}

.events-list__card {
  border: 2px solid var(--ladesa-grey-color);
  color: var(--ladesa-text-default-color);
}

.events-list__dot {
  width: 0.75rem;
  height: 0.75rem;
}

.events-list__meta {
  margin-top: var(--ui-space-2);
}

.events-list__remaining {
  margin-block: var(--ui-space-2);
}

.events-list__empty {
  color: var(--ladesa-grey-color);
  margin-top: var(--ui-space-4);
}
</style>
