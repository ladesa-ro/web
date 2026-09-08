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

  <div v-else class="u-flex u-flex-col u-gap-3 u-rounded-lg u-p-5 event-card">
    <div class="u-flex u-justify-between u-items-center">
      <div class="u-flex u-items-center u-gap-2 u-font-medium">
        <div
          class="u-rounded-full event-card__dot"
          :style="{
            backgroundColor: props.event.color || 'var(--ladesa-grey-color)',
          }"
        />

        <h1>{{ props.event.name }}</h1>

        <UIBadge :variant="props.event.type === 'etapa' ? 'info' : 'success'">
          {{ props.event.type === 'etapa' ? 'Etapa' : 'Evento' }}
        </UIBadge>

        <span
          v-if="props.event.colecao"
          class="u-flex u-items-center u-gap-1-5 u-text-xs u-px-2 u-py-0-5 u-rounded-full event-card__colecao"
        >
          <span
            class="u-rounded-full u-shrink-0 event-card__colecao-dot"
            :style="{
              backgroundColor:
                props.event.colecao.cor || 'var(--ladesa-grey-color)',
            }"
          />
          {{ props.event.colecao.nome ?? 'Coleção' }}
        </span>
      </div>

      <div
        v-if="props.event.type === 'agendamento'"
        class="u-flex u-items-center u-gap-1"
      >
        <button
          v-if="canShowHistorico"
          type="button"
          class="u-flex u-p-2 u-justify-center u-items-center u-rounded-lg event-card__icon-button"
          title="Histórico"
          @click="timelineDrawerOpen = true"
        >
          <IconsClock class="event-card__icon" />
        </button>

        <UIPopover v-if="isRecorrente" v-model="eventMenuOpen">
          <template #activator>
            <button
              type="button"
              class="u-flex u-p-2 u-justify-center u-items-center u-rounded-lg event-card__icon-button"
              title="Mais opções"
            >
              <IconsMoreItems class="event-card__icon" />
            </button>
          </template>

          <div
            class="u-flex u-flex-col u-gap-1 u-rounded-lg u-p-2 event-card__menu"
          >
            <button
              type="button"
              class="u-flex u-items-center u-gap-2 u-px-3 u-py-2 u-rounded-md u-text-sm u-text-left event-card__menu-item"
              @click="openAddOccurrence"
            >
              <IconsAdd class="event-card__menu-icon" />
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
      v-if="
        props.event.type === 'agendamento' && props.event.version !== undefined
      "
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

    <ul class="u-text-sm">
      <li class="event-card__list-item">
        Início: <span>{{ startDate.format('DD/MM/YYYY') }}</span>
      </li>
      <li>
        Término: <span>{{ endDate.format('DD/MM/YYYY') }}</span>
      </li>
    </ul>

    <p v-if="notStarted" class="u-text-sm u-font-medium">
      Começa em {{ remainingDays }} dias.
    </p>
    <p v-else-if="inProgress" class="u-text-sm u-font-medium">
      Termina em {{ remainingDays }} dias.
    </p>

    <SectionCalendarioEventLocale
      v-if="props.event.locale"
      :locale="props.event.locale"
    />
  </div>
</template>

<style scoped>
.event-card {
  border: 2px solid var(--ladesa-grey-color);
}

.event-card__dot {
  width: 0.625rem;
  height: 0.625rem;
}

.event-card__colecao {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 15%);
  color: var(--ladesa-text-default-color);
}

.event-card__colecao-dot {
  width: 0.5rem;
  height: 0.5rem;
}

.event-card__icon-button {
  color: var(--ladesa-text-default-color);
  transition: background-color var(--ui-duration-fast) var(--ui-easing-standard);
}

.event-card__icon-button:hover {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 30%);
}

.event-card__icon {
  color: var(--ladesa-text-default-color);
  width: 1.25rem;
  height: 1.25rem;
}

.event-card__menu {
  border: 2px solid var(--ladesa-grey-color);
  background-color: var(--ladesa-background-color);
  margin-top: var(--ui-space-2);
  min-width: 12rem;
}

.event-card__menu-item {
  color: var(--ladesa-text-default-color);
}

.event-card__menu-item:hover {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 20%);
}

.event-card__menu-icon {
  width: 0.875rem;
  height: 0.875rem;
}

.event-card__list-item {
  margin-bottom: 0.125rem;
}
</style>
