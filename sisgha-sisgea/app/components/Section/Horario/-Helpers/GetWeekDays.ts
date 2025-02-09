import type { Dayjs } from 'dayjs';
import { capitalizeFirst } from './CapitalizeFirst';
import type { IWeekDay } from './IWeekDay';

export function getWeekDays(referenceDay: Dayjs): IWeekDay[] {
  const fullWeek: Dayjs[] = [];

  for (let i = 1; i <= 6; i++) {
    fullWeek.push(referenceDay.day(i));
  }

  const weekDays: IWeekDay[] = fullWeek.map((dayAsDayJs): IWeekDay => {
    return {
      day: dayAsDayJs.format('DD'),
      dayWeek: capitalizeFirst(dayAsDayJs.format('dddd')),
      dayMonth: dayAsDayJs.format('DD/MM'),
      dayAsDayJs,
    };
  });

  return weekDays;
}
