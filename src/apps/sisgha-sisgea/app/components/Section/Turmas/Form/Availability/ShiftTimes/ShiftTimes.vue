<script lang="ts" setup>
import { capitalizeFirst } from '@ladesa-ro/web.utils';

const props = defineProps<{
  dayShifts: { title: string; times: string[] }[];
  selectedTimes: string[];
  disabled?: boolean;
}>();

const emit = defineEmits(['update:selectedTimes']);

const disabledItems = computed(() =>
  props.disabled ? props.dayShifts.flatMap(s => s.times) : []
);

const disabledSelectAll = computed(() =>
  props.disabled ? [''] : []
);

const isAllSelected = (shift: { times: string[] }) => {
  return shift.times.every(time => props.selectedTimes.includes(time));
};

const toggleAll = (shift: { times: string[] }) => {
  const allSelected = isAllSelected(shift);
  let newSelectedTimes = [...props.selectedTimes];

  if (allSelected) {
    newSelectedTimes = newSelectedTimes.filter(
      time => !shift.times.includes(time)
    );
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
          :disabled-items="disabledSelectAll"
          :model-value="isAllSelected(shift) ? [''] : []"
          class="mr-2 w-5 h-5"
          @update:model-value="() => toggleAll(shift)"
        />
        <h1 class="font-medium text-ldsa-text-default">{{ capitalizeFirst(shift.title) }}</h1>
      </div>
      <UICheckbox
        :model-value="props.selectedTimes"
        :items="shift.times"
        :disabled-items="disabledItems"
        class="nunito flex flex-col justify-between"
        @update:model-value="val => emit('update:selectedTimes', val)"
      />
    </div>
  </section>
</template>
