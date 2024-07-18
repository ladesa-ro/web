import type { Dayjs } from 'dayjs';

export const useSelectedDay = () => {
  return inject<Ref<Dayjs>>('selectedDay')!;
};
