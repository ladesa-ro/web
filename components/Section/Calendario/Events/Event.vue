<script lang="ts" setup>
// Import
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

// Import functions
import { eventStatus } from './Functions/GetEventStatus.js';
import NotifyEvent from './NotifyEvent.vue';

// Interface and types

// Props
const props = defineProps({
  id: String,
  name: String,
  color: String,
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs,
  locale: String,
  notifyStatus: Boolean
});

const _eventStatus = await eventStatus.startEvent(
  props.startDate!,
  props.endDate!
);
</script>

<template>
  <v-card class="-event flex-shrink-0 mx-auto rounded-lg w-full">
    <v-container
      class="flex flex-col w-full h-full border-l-8"
      :style="{ borderLeftColor: props.color! }"
    >
      <!-- Event -->
      <div class="flex flex-row w-full justify-between items-center">
        <p class="font-semibold text-sm sm:text-[16px]">{{ props.name! }}</p>
        <NotifyEvent
          v-show="dayjs().isBefore(props.endDate)"
          :event-id="props.id"
          :notify-status="props.notifyStatus"
        />
      </div>

      <!-- Infos -->
      <p class="font-medium text-sm sm:text-[16px] mt-2">
        Início: {{ startDate?.format('DD/MM') }}
        <span v-show="startDate?.format('HH:mm') !== '00:00'"
          >às {{ startDate?.format('HH:mm') }}
        </span>
      </p>

      <!-- Days for start and end -->
      <p class="font-medium text-sm sm:text-[16px]">
        Término: {{ endDate?.format('DD/MM') }}
        <span v-show="endDate?.format('HH:mm') !== '00:00'"
          >às {{ endDate?.format('HH:mm') }}</span
        >
      </p>

      <!-- Event duration -->
      <p class="font-medium text-sm sm:text-[16px] mt-2">
        {{ _eventStatus }}
      </p>

      <!-- Locale -->
      <p
        class="font-medium text-sm sm:text-[16px]"
        v-show="props.locale!"
        :class="{ 'mt-2': props.locale! !== '' }"
      >
        {{ props.locale! }}
      </p>
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
