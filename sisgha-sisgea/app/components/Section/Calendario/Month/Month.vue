<script lang="ts" setup>
import type { Dayjs } from 'dayjs';
import Day from './Day.vue';

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
</script>

<template>
  <div
    class="flex flex-col border-2 border-ldsa-grey rounded-lg overflow-hidden"
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
      <Day />
      <Day />
      <Day />
      <Day />
      <Day />
      <Day />
      <Day />
    </div>
  </div>
</template>

<style></style>
