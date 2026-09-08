import type { Dayjs } from 'dayjs';
import { capitalizeFirst } from '@ladesa-ro/web.utils';

export type WeekDay = {
  day: string;
  dayWeek: string;
  dayMonth: string;
  dayAsDayJs: Dayjs;
};

export function getWeekDays(referenceDay: Dayjs): WeekDay[] {
  const fullWeek: Dayjs[] = [];

  for (let i = 1; i <= 6; i++) {
    fullWeek.push(referenceDay.day(i));
  }

  return fullWeek.map(dayAsDayJs => ({
    day: dayAsDayJs.format('DD'),
    dayWeek: capitalizeFirst(dayAsDayJs.format('dddd')),
    dayMonth: dayAsDayJs.format('DD/MM'),
    dayAsDayJs,
  }));
}
