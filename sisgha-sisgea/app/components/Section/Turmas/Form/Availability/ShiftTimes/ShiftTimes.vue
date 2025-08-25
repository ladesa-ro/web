<script lang="ts" setup>
import { capitalizeFirst } from '../../../../Horario/-Helpers/CapitalizeFirst';

const props = defineProps<{
  dayShifts: { title: string; times: string[] }[],
  selectedTimes: string[]
}>();

const emit = defineEmits(['update:selectedTimes']);

const isAllSelected = (shift: { times: string[] }) => {
  return shift.times.every(time => props.selectedTimes.includes(time));
}

const toggleAll = (shift: { times: string[] }) => {
  const allSelected = isAllSelected(shift);
  let newSelectedTimes = [...props.selectedTimes];

  if (allSelected) {
    newSelectedTimes = newSelectedTimes.filter(time => !shift.times.includes(time));
  } else {
    shift.times.forEach(time => {
      if (!newSelectedTimes.includes(time)) newSelectedTimes.push(time);
    });
  }

  emit('update:selectedTimes', newSelectedTimes);
};
</script>

<template>
  <section class="flex justify-between gap-4">
    <div v-for="shift in dayShifts" :key="shift.title" class="flex-1">
      <div class="flex items-center pb-2 mb-2 border-b-1 border-ldsa-grey">
        <UICheckbox
          :items="['']"           
          :model-value="isAllSelected(shift) ? [''] : []"
          @update:modelValue="() => toggleAll(shift)"
          class="mr-2 w-5 h-5"   
        />
        <h1 class="font-medium">{{ capitalizeFirst(shift.title) }}</h1>
      </div>
      <UICheckbox
        v-model="props.selectedTimes"
        :items="shift.times"
        class="nunito flex flex-col justify-between"
        @update:modelValue="(val) => emit('update:selectedTimes', val)"
      />
    </div>
  </section>
</template>