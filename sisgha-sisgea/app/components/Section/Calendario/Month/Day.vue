<script lang="ts" setup>
import type { Day } from '../Types.ts';

const props = defineProps<Day>();
</script>

<template>
  <div
    class="flex w-14 h-14 justify-center items-center rounded-lg"
    :class="{
      'bg-ldsa-grey opacity-30': !props.number,
      'bg-purple-600': props.number,
    }"
  >
    <p class="text-ldsa-white font-bold">{{ props.number }}</p>
  </div>
</template>

<style></style>
