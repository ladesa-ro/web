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
</script>

<template>
  <div class="flex flex-col gap-3 border-2 border-ldsa-grey rounded-lg p-5">
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2 font-medium">
        <div
          class="rounded-full w-2.5 h-2.5"
          :style="{
            backgroundColor: props.event.color || 'var(--ladesa-grey-color)',
          }"
        />

        <h1>{{ props.event.name }}</h1>
      </div>

      <DialogModalEditOrCreateModal
        ref="editModalRef"
        :edit-id="props.event.id"
        :form-component="SectionCalendarioForm"
        :form-props="{
          calendarId: props.calendarId!,
          eventName: props.event.name,
          eventId: props.event.id,
          editMode: 'events',
        }"
        @refresh="$emit('refresh')"
      />
    </div>

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
