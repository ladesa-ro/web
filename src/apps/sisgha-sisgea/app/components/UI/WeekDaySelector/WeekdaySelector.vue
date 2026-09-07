<script setup lang="ts">
import { type OptionItem, WeekDaySelector, type WeekDaySelectorProps } from '@ladesa-ro/web.ui';

defineProps<WeekDaySelectorProps>();
const selectedItem = defineModel<OptionItem>();
</script>

<template>
  <WeekDaySelector v-model="selectedItem" :items="items" :selected-item-default-index="selectedItemDefaultIndex" :mode="mode" />
</template>
