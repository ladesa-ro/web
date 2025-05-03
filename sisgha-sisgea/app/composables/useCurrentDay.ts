import type { Dayjs } from 'dayjs';

export const useCurrentDay = () => {
  return inject<Ref<Dayjs>>('currentDay')!;
};
