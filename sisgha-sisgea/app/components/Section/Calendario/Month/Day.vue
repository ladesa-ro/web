<script lang="ts" setup>
// # IMPORT
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import type { Day } from '../Types';

// # CODE
const props = defineProps<Day>();
</script>

<template>
  <div
    class="flex aspect-square w-6 sm:w-6 md:w-8 lg:w-10 justify-center items-center rounded-lg p-4 sm:p-1 md:p-1.5"
    :class="{
      'bg-ldsa-grey/30': !props.date,
      'bg-ldsa-grey/60 ': props.color === 'none',
    }"
    :style="{ backgroundColor: props.color }"
  >
    <p
      class="flex justify-center items-center text-ldsa-white font-bold w-full h-full"
      :class="{
        invisible: !props.date,
        'border-2 border-ldsa-white rounded-md':
          dayjs(props.date).format('YYYY-MM-DD') ===
          dayjs().format('YYYY-MM-DD'),
      }"
    >
      {{ props.date ? dayjs(props.date).format('D') : '0' }}
    </p>
  </div>
</template>

<style></style>
