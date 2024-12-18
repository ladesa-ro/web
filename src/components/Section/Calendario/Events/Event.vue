<script lang="ts" setup>
// Import functions
import type { Dayjs } from 'dayjs';
import { eventStatus } from '../Functions/GetEventStatus';
import NotifyEvent from './NotifyEvent.vue';

// Dayjs
const dayjs = useDayJs();

// Interface and types

// Props

type Props = {
  id: string;
  name: string;
  color: string;

  startDate: Dayjs;
  endDate: Dayjs;

  locale?: string;
  notifyStatus: boolean;
};

const props = defineProps<Props>();

const _eventStatus = await eventStatus.startEvent(
  props.startDate,
  props.endDate
);
</script>

<template>
  <v-card class="-event flex-shrink-0 mx-auto rounded-lg w-full">
    <v-container
      class="flex flex-col w-full h-full border-l-8"
      :style="{ borderLeftColor: props.color }"
    >
      <!-- Event -->
      <div class="flex flex-row w-full justify-between items-center">
        <p class="font-semibold text-sm sm:text-[16px]">{{ props.name }}</p>
        <NotifyEvent
          v-show="dayjs().isBefore(props.endDate)"
          :event-id="props.id"
          :notify-status="props.notifyStatus"
        />
      </div>

      <!-- Infos -->
      <div class="flex flex-col items-start justify-start">
        <!-- Days for start -->
        <p class="font-medium text-sm sm:text-[16px] mt-2">
          Início: {{ props.startDate.format('DD/MM') }}

          <span v-show="props.startDate.format('HH:mm') !== '00:00'">
            às {{ props.startDate.format('HH:mm') }}
          </span>
        </p>

        <!-- Days for end -->
        <p class="font-medium text-sm sm:text-[16px]">
          Término: {{ props.endDate.format('DD/MM') }}

          <span v-show="props.endDate.format('HH:mm') !== '00:00'">
            às {{ props.endDate.format('HH:mm') }}
          </span>
        </p>

        <!-- Event duration -->
        <p class="font-medium text-sm sm:text-[16px] mt-2">
          {{ _eventStatus }}
        </p>

        <!-- Locale -->
        <p
          v-show="props.locale"
          class="font-medium text-sm sm:text-[16px]"
          :class="{ 'mt-2': props.locale !== '' }"
        >
          {{ props.locale }}
        </p>
      </div>
    </v-container>
  </v-card>
</template>

<style scoped>
.-event {
  display: flex;
  flex-direction: row;

  height: max-content !important;

  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
  border: solid 2px #9ab69e;

  box-shadow: none;
}
</style>
