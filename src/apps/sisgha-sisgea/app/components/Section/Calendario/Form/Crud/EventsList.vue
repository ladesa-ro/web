<script lang="ts" setup>
import {
  SectionCalendarioEventLocale,
  UIButtonModalCancel,
  VVAutocomplete,
} from '#components';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import isBetween from 'dayjs/plugin/isBetween';
import relativeTime from 'dayjs/plugin/relativeTime';
import { computed, onBeforeUnmount, onMounted, ref, toRef } from 'vue';
import DialogModalBaseLayout from '~/components/Dialog/Modal/ModalBaseLayout.vue';
import SearchBar from '~/components/UI/SearchBar/SearchBar.vue';
import { calendarDataMethods } from '../../CalendarDataMethods';
import type { CalendarData, CalendarEvent } from '../../Types';

dayjs.extend(isBetween);
dayjs.extend(relativeTime);
dayjs.locale('pt-br');

type Props = {
  calendarData: CalendarData;
};
const props = defineProps<Props>();
const $emit = defineEmits(['close', 'refresh']);

const calendar = toRef(props, 'calendarData');
const events = ref<CalendarEvent[]>([]);
const calendarId = calendar.value.id;

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

async function loadEvents() {
  if (!calendar.value?.id) return;
  const steps = await calendarDataMethods.steps.getSteps(calendar.value.id);
  const evs = await calendarDataMethods.events.getEvents(calendar.value.id);

  events.value = Array.from(
    new Map([...steps, ...evs].map(e => [e.id, e])).values()
  );

  events.value.sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
}

onMounted(() => {
  loadEvents();
  window.addEventListener('force-close-inner-modals', handleForceClose);
});
onBeforeUnmount(() => {
  window.removeEventListener('force-close-inner-modals', handleForceClose);
});

// Computed
const filteredEvents = computed(() => {
  let result = events.value;

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(event => event.name.toLowerCase().includes(query));
  }

  result = [...result].sort((a, b) => {
    let aValue: any, bValue: any;
    switch (sortBy.value) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'startDate':
        aValue = new Date(a.startDate).getTime();
        bValue = new Date(b.startDate).getTime();
        break;
      case 'endDate':
        aValue = new Date(a.endDate).getTime();
        bValue = new Date(b.endDate).getTime();
        break;
    }
    return sortOrder.value === 'asc' ? aValue - bValue : bValue - aValue;
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
  loadEvents(); // recarrega a lista de eventos
}

onMounted(() => {
  loadEvents();

  window.addEventListener('force-close-inner-modals', handleForceClose);
  window.addEventListener('calendar-events-updated', handleEventsUpdated);
});

onBeforeUnmount(() => {
  window.removeEventListener('force-close-inner-modals', handleForceClose);
  window.removeEventListener('calendar-events-updated', handleEventsUpdated);
});
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
        @update:modelValue="sortBy = $event"
        class="w-full"
        label="Classificar por"
        name="sortBy"
        placeholder="Selecione uma opção"
      />
      <VVAutocomplete
        :items="orderOptions"
        :model-value="sortOrder"
        @update:modelValue="sortOrder = $event"
        class="w-1/2"
        label="Ordem"
        name="sortOrder"
        placeholder="Selecione a ordem"
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
            ></div>
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

        <p class="my-2" v-if="isNotStarted(event)">
          Começa em <span>{{ remainingDays(event) }}</span> dias.
        </p>
        <p class="my-2" v-else-if="isInProgress(event)">
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
        @click="closeModal"
        type="close"
        class="flex w-full"
      />
    </template>
  </DialogModalBaseLayout>
</template>
