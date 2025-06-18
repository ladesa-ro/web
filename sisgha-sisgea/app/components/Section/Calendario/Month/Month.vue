<script lang="ts" setup>
// # Import Libs & Others
import 'dayjs/locale/pt-br';

// # Import Types
import type { EmptyDays } from '../Types';

// # Import Functions
import { renderDays } from './RenderMonthDays';

// # Code

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

let emptyDays = ref<EmptyDays>(renderDays.EmptyDays(2025, 'julho'));
</script>

<template>
  <div
    class="flex flex-col border-2 border-ldsa-grey rounded-lg overflow-hidden h-min"
  >
    <!-- Month Head -->
    <div class="flex w-full justify-between items-center bg-purple-600 p-4">
      <UIButtonArrow />

      <h2 class="text-ldsa-white uppercase font-bold">Janeiro</h2>

      <UIButtonArrow class="rotate-180" />
    </div>

    <!-- Days of Month -->
    <div class="grid p-4 gap-4 grid-cols-7 place-items-center">
      <!-- Name Columns -->
      <p class="font-semibold text-center" v-for="item of weekDays">
        {{ item }}
      </p>

      <!-- Days -->
      <SectionCalendarioMonthDay v-for="firstEmptyDay in emptyDays.before" />

      <SectionCalendarioMonthDay v-for="monthDay in 31" :number="monthDay" />

      <SectionCalendarioMonthDay v-for="lastEmptyDay in emptyDays.after" />
    </div>
  </div>
</template>

<style></style>
