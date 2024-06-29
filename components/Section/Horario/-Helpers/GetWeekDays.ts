import { capitalizeFirst } from './CapitalizeFirst';
import type { IWeekDay } from './IWeekDay';
import dayjs from './dayjs';

export function getWeekDays(referenceDay: dayjs.Dayjs): IWeekDay[] {
  const fullWeek: dayjs.Dayjs[] = [];

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
