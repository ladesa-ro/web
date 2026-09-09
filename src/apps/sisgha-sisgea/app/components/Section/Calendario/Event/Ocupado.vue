<script lang="ts" setup>
import { EventOcupado, type EventOcupadoProps } from '@ladesa-ro/web.ui';

defineProps<EventOcupadoProps>();
</script>

<template>
  <EventOcupado v-bind="$props" />
</template>
