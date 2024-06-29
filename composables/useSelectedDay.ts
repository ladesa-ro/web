import type dayjs from 'dayjs';

export const useSelectedDay = () => {
  return inject<Ref<dayjs.Dayjs>>('selectedDay')!;
};
