<script lang="ts" setup>
import IconCompleteCalendar from '~/components/Icons/Calendar/IconCompleteCalendar.vue';
import IconPartialCalendar from '~/components/Icons/Calendar/IconPartialCalendar.vue';

const toggleItems = [
  { text: 'Calendário parcial', value: 'parcial', icon: IconPartialCalendar },
  {
    text: 'Calendário completo',
    value: 'completo',
    icon: IconCompleteCalendar,
  },
];

const views = defineModel<'partial' | 'complete'>({
  required: true,
});
</script>

<template>
  <UIToggle class="w-full" :items="toggleItems" v-model:model-value="views" />
</template>