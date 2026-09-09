<script lang="ts" setup>
import type { Dayjs } from 'dayjs';
import { DaySquareList } from '@ladesa-ro/web.ui';

const selectedDay = defineModel<Dayjs>({ required: true });
</script>

<template>
  <DaySquareList v-model="selectedDay" />
</template>
