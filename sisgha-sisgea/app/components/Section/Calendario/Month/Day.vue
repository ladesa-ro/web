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
    class="flex w-14 h-14 justify-center items-center rounded-lg p-1"
    :class="{
      'bg-ldsa-grey/30': !props.date,
      'bg-purple-600': props.date,
    }"
  >
    <p
      class="justify-center items-center text-ldsa-white font-bold w-full h-full"
      :class="{
        'hidden ': !props.date,
        'flex ': props.date,
      }"
    >
      {{ dayjs(props.date).format('D') }}
    </p>
  </div>
</template>

<style></style>

<!-- border-2 border-ldsa-white rounded-md -->
