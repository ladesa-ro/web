<script lang="ts" setup>
import IconCompleteCalendar from '~/components/Icons/Calendar/CompleteCalendar.vue';
import IconPartialCalendar from '~/components/Icons/Calendar/PartialCalendar.vue';

const toggleItems = [
  { text: 'Calendário parcial', value: 'parcial', icon: IconPartialCalendar },
  {
    text: 'Calendário completo',
    value: 'completo',
    icon: IconCompleteCalendar,
  },
];

const visualizacao = defineModel<'parcial' | 'completo'>({
  required: true,
});
</script>

<template>
  <UIToggle
    class="w-full"
    :items="toggleItems"
    v-model:model-value="visualizacao"
  />
</template>
