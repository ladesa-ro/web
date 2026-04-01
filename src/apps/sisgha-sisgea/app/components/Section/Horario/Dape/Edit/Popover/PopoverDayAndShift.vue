<script setup lang="ts">
const schoolDayItems = [
  { text: 'Letivo', value: 'letivo' },
  { text: 'Não letivo', value: 'nao-letivo' },
];

const schoolDaySelectedItem = ref('letivo');

//

const inPersonDayItems = [
  { text: 'Presencial', value: 'presencial' },
  { text: 'Não presencial', value: 'nao-presencial' },
];
const inPersonSelectedItem = ref('presencial');
</script>

<template>
  <SectionHorarioDapeEditPopoverEdit :handle-confirm-button-click="() => {}">
    <template #activator>
      <slot />
    </template>

    <UIToggle v-model="schoolDaySelectedItem" :items="schoolDayItems" />

    <UIToggle
      v-if="schoolDaySelectedItem !== 'nao-letivo'"
      v-model="inPersonSelectedItem"
      :items="inPersonDayItems"
    />
  </SectionHorarioDapeEditPopoverEdit>
</template>
