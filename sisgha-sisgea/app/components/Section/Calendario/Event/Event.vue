<script lang="ts" setup>
import { SectionCalendarioForm } from '#components';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import isBetween from 'dayjs/plugin/isBetween';
import relativeTime from 'dayjs/plugin/relativeTime';
import { computed } from 'vue';
import type { CalendarEvent } from '../Types';

dayjs.extend(relativeTime);
dayjs.extend(isBetween);
dayjs.locale('pt-br');

type Props = {
  calendarId?: string;
  event: CalendarEvent;
};

const props = defineProps<Props>();

// Datas reativas (computed)
const startDate = computed(() => dayjs(props.event.startDate));
const endDate = computed(() => dayjs(props.event.endDate));
const now = computed(() => dayjs());

// Estados
const notStarted = computed(() => now.value.isBefore(startDate.value));
const inProgress = computed(() =>
  now.value.isBetween(startDate.value, endDate.value, undefined, '[]')
);

// dias restantes (reagindo corretamente ao estado)
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
  <div
    class="flex flex-col h-min border-2 border-ldsa-grey rounded-lg overflow-hidden p-5"
  >
    <!-- Head -->
    <div class="flex justify-between items-center">
      <!-- Color & Name -->
      <div class="flex gap-2 items-center">
        <!-- Color -->
        <div
          class="w-3 h-3 rounded-full bg-ldsa-green-1"
          :style="{ backgroundColor: props.event.color || '#ddd' }"
        ></div>

        <!-- Name -->
        <h2 class="font-bold">{{ props.event.name }}</h2>
      </div>

      <!-- Edit Button -->
      <DialogModalEditOrCreateModal
        :edit-id="props.event.id"
        :form-component="SectionCalendarioForm"
        :form-props="{
          calendarId: props.calendarId!,
          eventName: props.event.name,
          editMode: 'events',
        }"
        @refresh="$emit('refresh')"
      />
    </div>

    <!-- Content -->
    <ul>
      <li>
        <p>
          Início: <span>{{ startDate.format('DD/MM') }}</span>
        </p>
      </li>
      <li>
        <p>
          Término: <span>{{ endDate.format('DD/MM') }}</span>
        </p>
      </li>
    </ul>

    <p class="my-5" v-if="notStarted">
      Começa em <span>{{ remainingDays }}</span> dias.
    </p>
    <p class="my-5" v-else-if="inProgress">
      Termina em <span>{{ remainingDays }}</span> dias.
    </p>

    <!-- Locale -->
    <SectionCalendarioEventLocale v-show="props.event.locale" />
  </div>
</template>

<style></style>
