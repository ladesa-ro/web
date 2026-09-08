<script lang="ts" setup>
import { ref } from 'vue';
import PopoverEdit from './PopoverEdit.vue';
import Toggle from './Toggle.vue';
const schoolDayItems = [
  { text: 'Letivo', value: 'letivo' },
  { text: 'Não letivo', value: 'nao-letivo' },
];

const schoolDaySelectedItem = ref('letivo');

const inPersonDayItems = [
  { text: 'Presencial', value: 'presencial' },
  { text: 'Não presencial', value: 'nao-presencial' },
];
const inPersonSelectedItem = ref('presencial');
</script>

<template>
  <PopoverEdit :handle-confirm-button-click="() => {}">
    <template #activator>
      <slot />
    </template>

    <Toggle v-model="schoolDaySelectedItem" :items="schoolDayItems" />

    <Toggle
      v-if="schoolDaySelectedItem !== 'nao-letivo'"
      v-model="inPersonSelectedItem"
      :items="inPersonDayItems"
    />
  </PopoverEdit>
</template>
