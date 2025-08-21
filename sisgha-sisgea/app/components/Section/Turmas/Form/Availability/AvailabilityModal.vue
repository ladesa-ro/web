<script lang="ts" setup>
import WeekdaySelector from '../../../../UI/WeekDaySelector/WeekdaySelector.vue';
import ShiftTimes from './ShiftTimes/ShiftTimes.vue';
import { useAvailability } from '../../../../../composables/useAvailability';

const emit = defineEmits(['close']);
const onClose = () => emit('close');

const props = withDefaults(defineProps<{
  disabled?: boolean;
  isLoading?: boolean;
}>(), {
  disabled: false,
  isLoading: false,
});

const { dayShifts, weekDays, selectedDayWeek, selectedTimes } = useAvailability();
</script>

<template>
  <DialogModalBaseLayout
    :close-button="false"
    :on-close="onClose"
    title="Disponibilidade"
  >
    <WeekdaySelector
      :items="weekDays"
      v-model="selectedDayWeek"
      class="font-semibold gap-2"
    />

    <div class="flex flex-col gap-4 mt-2 w-full">
      <ShiftTimes
        :dayShifts="dayShifts"
        v-model:selectedTimes="selectedTimes"
      />
    </div>
  </DialogModalBaseLayout>
</template>
