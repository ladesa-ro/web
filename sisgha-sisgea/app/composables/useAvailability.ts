import { ref, computed, watch } from 'vue';
import { getWeekDays } from '../components/Section/Horario/-Helpers/GetWeekDays';

export interface DayShift {
  title: string;
  times: string[];
}

export function useAvailability() {
  const currentDay = useCurrentDay();
  const week = getWeekDays(currentDay.value);
  const weekDays = week.map(day => day.dayWeek);

  const dayShifts: DayShift[] = [
    { title: 'matutino', times: ['07:30','08:20','09:10','10:00','10:20','11:10'] },
    { title: 'vespertino', times: ['13:00','13:50','14:40','15:30','15:50','16:40'] },
    { title: 'noturno', times: ['19:00','19:50','20:40','21:30','21:50','22:40'] },
  ];

  const allTimes = dayShifts.flatMap(s => s.times);

  const selectedDayWeek = ref(weekDays[0] ?? '');
  const availabilityByDay = ref<Record<string, string[]>>({});

  weekDays.forEach(day => {
    availabilityByDay.value[day] = [...allTimes];
  });

  const selectedTimes = ref([...availabilityByDay.value[selectedDayWeek.value] ?? allTimes]);

  watch(selectedDayWeek, (newDay) => {
    selectedTimes.value = [...(availabilityByDay.value[newDay] ?? allTimes)];
  });

  watch(selectedTimes, (newTimes) => {
    availabilityByDay.value[selectedDayWeek.value] = [...newTimes];
  });

  return {
    dayShifts,
    weekDays,
    selectedDayWeek,
    selectedTimes,
    availabilityByDay
  };
}
