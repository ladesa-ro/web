<script lang="ts" setup>
// # IMPORT
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { CalendarEvent } from '../Types';

// # CODE
type Props = CalendarEvent;
const props = defineProps<Props>();

// Remaining time
let remainingDays: number = 0;
let remainingText: string = '';

// Formatting dates
dayjs.extend(relativeTime);

const currentDate = dayjs();
const _startDate = dayjs(props.startDate);
const _endDate = dayjs(props.endDate);

if (currentDate.isAfter(_startDate))
  remainingDays = Number(_endDate.diff(currentDate, 'day'));
else remainingDays = Number(_startDate.diff(currentDate, 'day'));
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
          :style="{ backgroundColor: props.color! }"
        ></div>

        <!-- Name -->
        <h2 class="font-bold">{{ props.name }}</h2>
      </div>

      <!-- Notification Button -->
      <UIButtonNotification />
    </div>

    <!-- Content -->
    <ul>
      <!-- Start and End Date -->
      <li>
        <p>
          Início: <span>{{ dayjs(props.startDate).format('DD/MM') }}</span>
        </p>
      </li>
      <li>
        <p>
          Término: <span>{{ dayjs(props.endDate).format('DD/MM') }}</span>
        </p>
      </li>
    </ul>

    <!-- Remaining time for start/end -->
    <p class="my-5" v-show="currentDate.isAfter(_startDate)">
      Começa em <span>{{ remainingDays }}</span> dias.
    </p>
    <p class="my-5" v-show="!currentDate.isAfter(_startDate)">
      Termina em <span>{{ remainingDays }}</span> dias.
    </p>

    <!-- Locale -->
    <SectionCalendarioEventLocale v-show="props.locale" />
  </div>
</template>

<style></style>
