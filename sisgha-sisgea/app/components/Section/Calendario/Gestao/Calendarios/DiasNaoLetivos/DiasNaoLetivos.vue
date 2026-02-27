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
