<script setup lang="ts">
import {
  IconsCalendarCompleteCalendar,
  IconsCalendarPartialCalendar,
} from '#components';

const toggleItems = [
  {
    text: 'Dias não letivos do mês',
    value: 'mes',
    icon: IconsCalendarPartialCalendar,
  },
  {
    text: 'Dias não letivos do ano',
    value: 'ano',
    icon: IconsCalendarCompleteCalendar,
  },
];

const toggleView = ref('mes');
</script>

<template>
  <UIContainer>
    <nav class="flex justify-between items-center">
      <UITitleWithGoBack to="." text="Dias não letivos" />

      <!-- add EditOrCreateModal aqui -->
      <UIButtonDefaultSquare>
        <IconsAdd class="w-6 h-full" />
      </UIButtonDefaultSquare>
    </nav>

    <!-- // -->

    <UIToggle v-model="toggleView" :items="toggleItems" class="w-full" />
  </UIContainer>
</template>
