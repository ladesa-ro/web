<script lang="ts" setup>
import WeekdaySelector from '../../../../UI/WeekDaySelector/WeekdaySelector.vue';
import { capitalizeFirst } from '../../../Horario/-Helpers/CapitalizeFirst';
import { getWeekDays } from '../../../Horario/-Helpers/GetWeekDays';

const emit = defineEmits(['close']);
const onClose = () => emit('close');

const props = withDefaults(defineProps<{
  disabled?: boolean;
  isLoading?: boolean;
}>(), {
  disabled: false,
  isLoading: false,
});

const currentDay = useCurrentDay();
const week = getWeekDays(currentDay.value);

const dayShifts = [
  {
    title: 'matutino',
    times: ['07:30', '08:20', '09:10', '10:00', '10:20', '11:10'],
  },
  {
    title: 'vespertino',
    times: ['13:00', '13:50', '14:40', '15:30', '15:50', '16:40'],
  },
  {
    title: 'noturno',
    times: ['19:00', '19:50', '20:40', '21:30', '21:50', '22:40'],
  },
];
const allTimes = dayShifts.flatMap(s => s.times);
const weekDays = week.map(day => day.dayWeek);
const selectedDayWeek = ref(weekDays[0] ?? '');
const availabilityByDay = ref<Record<string, string[]>>({});

// inicializa tudo como disponível
weekDays.forEach(day => {
  availabilityByDay.value[day] = [...allTimes];
});

const selectedTimes = ref([
  ...(availabilityByDay.value[selectedDayWeek.value] ?? allTimes)
]);


// troca de dia
watch(selectedDayWeek, (newDay) => {
  selectedTimes.value = [...(availabilityByDay.value[newDay] ?? allTimes)];
});


// atualiza os horários do dia atual
watch(selectedTimes, (newTimes) => {
  availabilityByDay.value[selectedDayWeek.value] = [...newTimes];
});

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
      <section class="flex justify-between">
        <div v-for="shift in dayShifts" :key="shift.title">
          <h1 class="font-medium mb-2">{{ capitalizeFirst(shift.title) }}</h1>
          <UICheckbox
            v-model="selectedTimes"
            :items="shift.times"
            class="nunito"
          />
        </div>
      </section>
    </div>
  </DialogModalBaseLayout>
</template>
