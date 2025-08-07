<script lang="ts" setup>
import type { Dayjs } from 'dayjs';
import { eventStatus } from '../Functions/GetEventStatus';
import NotifyEvent from './NotifyEvent.vue';

type Props = {
  id: string;
  name: string;
  color: string;

  startDate: Dayjs;
  endDate: Dayjs;

  locale?: string;
  notifyStatus: boolean;
};

const { startDate, endDate } = defineProps<Props>();

//

const _eventStatus = await eventStatus.startEvent(startDate, endDate);

//

const dayjs = useDayJs();
</script>

<template>
  <div
    class="flex border-2 border-ldsa-grey rounded-e-lg"
  >
    <div
      :style="{ borderLeftColor: color }"
      class="flex flex-col w-full h-full border-l-8 p-4 font-medium text-sm sm:text-base gap-1.5"
    >
      <!-- Event -->
      <div class="flex flex-row w-full justify-between items-center">
        <h1 class="font-semibold">{{ name }}</h1>

        <NotifyEvent
          v-if="dayjs().isBefore(endDate)"
          :event-id="id"
          :notify-status="notifyStatus"
        />
      </div>

      <!-- Infos -->
      <div class="flex flex-col items-start justify-start gap-1.5">
        <div>
          <!-- Days until start -->
          <p>
            Início: {{ startDate.format('DD/MM') }}

            <span v-if="startDate.format('HH:mm') !== '00:00'">
              às {{ startDate.format('HH:mm') }}
            </span>
          </p>

          <!-- Days until end -->
          <p>
            Término: {{ endDate.format('DD/MM') }}

            <span v-if="endDate.format('HH:mm') !== '00:00'">
              às {{ endDate.format('HH:mm') }}
            </span>
          </p>
        </div>

        <!-- Event duration -->
        <p>
          {{ _eventStatus }}
        </p>

        <!-- Locale -->
        <p v-if="locale">
          {{ locale }}
        </p>
      </div>
    </div>
  </div>
</template>
