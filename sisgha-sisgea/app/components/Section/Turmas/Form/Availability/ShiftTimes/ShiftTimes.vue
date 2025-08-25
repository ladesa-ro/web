<script lang="ts" setup>
import { capitalizeFirst } from '../../../../Horario/-Helpers/CapitalizeFirst';

const props = defineProps<{
  dayShifts: { title: string; times: string[] }[],
  selectedTimes: string[]
}>();

const emit = defineEmits(['update:selectedTimes']);
</script>

<template>
  <section class="flex justify-between gap-4">
    <div v-for="shift in dayShifts" :key="shift.title" class="flex-1">
      <h1 class="font-medium mb-2">{{ capitalizeFirst(shift.title) }}</h1>
      <UICheckbox
        v-model="props.selectedTimes"
        :items="shift.times"
        class="nunito"
        @update:modelValue="(val) => emit('update:selectedTimes', val)"
      />
    </div>
  </section>
</template>
