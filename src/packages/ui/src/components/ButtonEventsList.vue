<script setup lang="ts">
import IconCalendarCalendarItems from '../icons/Calendar/CalendarItems.vue';

defineEmits<{
  open: [];
}>();
</script>

<template>
  <button class="ui-button-events-list" @click="$emit('open')">
    <IconCalendarCalendarItems class="ui-button-events-list__icon" />
    Ver eventos
  </button>
</template>
