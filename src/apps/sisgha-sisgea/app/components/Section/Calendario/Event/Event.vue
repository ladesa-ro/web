<script lang="ts" setup>
import { SectionCalendarioForm } from '#components';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import isBetween from 'dayjs/plugin/isBetween';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { CalendarEvent } from '../Types';

dayjs.extend(relativeTime);
dayjs.extend(isBetween);
dayjs.locale('pt-br');

type Props = {
  calendarId?: string;
  event: CalendarEvent;
};

const props = defineProps<Props>();

const emit = defineEmits<{ refresh: [] }>();

const startDate = computed(() => dayjs(props.event.startDate));
const endDate = computed(() => dayjs(props.event.endDate));
const now = computed(() => dayjs());

const notStarted = computed(() => now.value.isBefore(startDate.value));
const inProgress = computed(() =>
  now.value.isBetween(startDate.value, endDate.value, undefined, '[]')
);

const remainingDays = computed(() => {
  if (notStarted.value) {
    return startDate.value.diff(now.value, 'day');
  }
  if (inProgress.value) {
    return endDate.value.diff(now.value, 'day');
  }
  return 0;
});

const isRecorrente = computed(() => !!props.event.repeticao);
const canShowHistorico = computed(
  () => props.event.type === 'agendamento' && !props.event.detalhesOcultos
);

const eventMenuOpen = ref(false);
const addOccurrenceModalOpen = ref(false);
const timelineDrawerOpen = ref(false);

function openAddOccurrence() {
  eventMenuOpen.value = false;
  addOccurrenceModalOpen.value = true;
}

function onOccurrenceAdded() {
  emit('refresh');
}
</script>

<template>
  <SectionCalendarioEventOcupado
    v-if="props.event.detalhesOcultos"
    :horario-inicio="props.event.horarioInicio"
    :horario-fim="props.event.horarioFim"
    :ambientes="props.event.ambientes"
  />

  <div v-else class="flex flex-col gap-3 border-2 border-ldsa-grey rounded-lg p-5">
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2 font-medium">
        <div
          class="rounded-full w-2.5 h-2.5"
          :style="{
            backgroundColor: props.event.color || 'var(--ladesa-grey-color)',
          }"
        />

        <h1>{{ props.event.name }}</h1>

        <span
          class="text-xs px-2 py-0.5 rounded-full"
          :class="
            props.event.type === 'etapa'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
              : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
          "
        >
          {{ props.event.type === 'etapa' ? 'Etapa' : 'Evento' }}
        </span>

        <span
          v-if="props.event.colecao"
          class="flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full bg-ldsa-grey/15 text-ldsa-text-default"
        >
          <span
            class="rounded-full w-2 h-2 shrink-0"
            :style="{
              backgroundColor: props.event.colecao.cor || 'var(--ladesa-grey-color)',
            }"
          />
          {{ props.event.colecao.nome ?? 'Coleção' }}
        </span>
      </div>

      <div
        v-if="props.event.type === 'agendamento'"
        class="flex items-center gap-1"
      >
        <button
          v-if="canShowHistorico"
          type="button"
          class="flex p-2 justify-center items-center rounded-lg transition-colors duration-150 hover:bg-ldsa-grey/30"
          title="Histórico"
          @click="timelineDrawerOpen = true"
        >
          <IconsClock class="text-ldsa-text-default w-5 h-5" />
        </button>

        <UIPopover v-if="isRecorrente" v-model="eventMenuOpen">
          <template #activator>
            <button
              type="button"
              class="flex p-2 justify-center items-center rounded-lg transition-colors duration-150 hover:bg-ldsa-grey/30"
              title="Mais opções"
            >
              <IconsMoreItems class="text-ldsa-text-default w-5 h-5" />
            </button>
          </template>

          <div
            class="flex flex-col border-2 gap-1 border-ldsa-grey rounded-lg p-2 bg-ldsa-bg mt-2 min-w-[12rem]"
          >
            <button
              type="button"
              class="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-left hover:bg-ldsa-grey/20"
              @click="openAddOccurrence"
            >
              <IconsAdd class="w-3.5 h-3.5" />
              Adicionar data avulsa
            </button>
          </div>
        </UIPopover>

        <DialogModalEditOrCreateModal
          ref="editModalRef"
          :edit-id="props.event.id"
          :form-component="SectionCalendarioForm"
          :form-props="{
            calendarId: props.calendarId ?? '',
            eventName: props.event.name,
            eventId: props.event.id,
            editMode: 'events',
          }"
          @refresh="$emit('refresh')"
        />
      </div>

      <DialogModalEditOrCreateModal
        v-else-if="props.event.type === 'etapa'"
        :edit-id="props.event.id"
        :form-component="SectionCalendarioForm"
        :form-props="{
          calendarId: props.calendarId ?? '',
          editMode: 'calendar',
        }"
        @refresh="$emit('refresh')"
      />
    </div>

    <SectionCalendarioEventAddOccurrenceModal
      v-if="props.event.type === 'agendamento' && props.event.version !== undefined"
      v-model="addOccurrenceModalOpen"
      :event-id="props.event.id"
      :version="props.event.version ?? 0"
      @success="onOccurrenceAdded"
    />

    <SectionCalendarioTimelineAgendamentoTimelineDrawer
      v-if="props.event.type === 'agendamento'"
      v-model="timelineDrawerOpen"
      :identificador-externo="props.event.identificadorExterno ?? null"
    />

    <ul class="text-sm">
      <li class="mb-0.5">
        Início: <span>{{ startDate.format('DD/MM/YYYY') }}</span>
      </li>
      <li>
        Término: <span>{{ endDate.format('DD/MM/YYYY') }}</span>
      </li>
    </ul>

    <p v-if="notStarted" class="text-sm font-medium">
      Começa em {{ remainingDays }} dias.
    </p>
    <p v-else-if="inProgress" class="text-sm font-medium">
      Termina em {{ remainingDays }} dias.
    </p>

    <SectionCalendarioEventLocale
      v-if="props.event.locale"
      :locale="props.event.locale"
    />
  </div>
</template>
