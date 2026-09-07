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

const disabledSelectAll = computed(() => (props.disabled ? [''] : []));

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
  <section class="u-flex u-justify-between u-gap-4">
    <div v-for="shift in dayShifts" :key="shift.title" class="u-flex-1">
      <div class="shift-header u-flex u-items-center u-pb-2 u-mb-2">
        <UICheckbox
          :items="['']"
          :disabled-items="disabledSelectAll"
          :model-value="isAllSelected(shift) ? [''] : []"
          class="shift-checkbox u-mr-2"
          @update:model-value="() => toggleAll(shift)"
        />
        <h1 class="shift-title u-font-medium">
          {{ capitalizeFirst(shift.title) }}
        </h1>
      </div>
      <UICheckbox
        :model-value="props.selectedTimes"
        :items="shift.times"
        :disabled-items="disabledItems"
        class="nunito u-flex u-flex-col u-justify-between"
        @update:model-value="val => emit('update:selectedTimes', val)"
      />
    </div>
  </section>
</template>

<style scoped>
.shift-header {
  border-bottom: 1px solid var(--ladesa-grey-color);
}

.shift-checkbox {
  width: 1.25rem;
  height: 1.25rem;
}

.shift-title {
  color: var(--ladesa-text-default-color);
}
</style>
