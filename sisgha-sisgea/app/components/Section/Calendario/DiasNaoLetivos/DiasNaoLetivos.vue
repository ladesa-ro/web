<script setup lang="ts">
import IconCompleteCalendar from '~/components/Icons/Calendar/CompleteCalendar.vue';
import IconPartialCalendar from '~/components/Icons/Calendar/PartialCalendar.vue';

const toggleItems = [
  {
    text: 'Dias não letivos do mês',
    value: 'mes',
    icon: IconPartialCalendar,
  },
  {
    text: 'Dias não letivos do ano',
    value: 'ano',
    icon: IconCompleteCalendar,
  },
];

const toggleView = ref('mes');
</script>

<template>
  <UIContainer>
    <UITitleWithGoBack text="Dias não letivos" />
    <UIToggle v-model="toggleView" :items="toggleItems" class="w-full" />
  </UIContainer>
</template>
