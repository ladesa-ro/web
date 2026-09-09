<script lang="ts" setup>
import { EventLocale, type EventLocaleProps } from '@ladesa-ro/web.ui';

defineProps<EventLocaleProps>();
</script>

<template>
  <EventLocale v-bind="$props" />
</template>
