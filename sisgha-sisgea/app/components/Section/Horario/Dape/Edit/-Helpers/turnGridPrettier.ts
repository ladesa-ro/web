import type { Cell } from '~/composables/schedule/edit/useScheduleEditTypes';
import type {
  ShiftName,
  WeekSchedule,
} from '~/composables/schedule/useScheduleTypes';

export function getEmptyShift(
  weekSchedule: WeekSchedule,
  dayDate: string,
  dayIndex: number,
  shiftName: ShiftName
) {
  // weekSchedule[dayDate]?.daySchedule[shiftName].shiftSchedule ?? [];

  const baseShift: Cell[] =
    Object.values(weekSchedule)
      .flatMap(day => day.daySchedule[shiftName])
      .find(shift => shift.shiftSchedule.length > 0)?.shiftSchedule ?? [];

  baseShift.forEach(cell => {
    cell.id = crypto.randomUUID();
    cell.dayIndex = dayIndex;
    cell.dayDate = dayDate;

    if (cell.type !== 'intervalo') {
      cell.type = 'vago';
    }
  });

  return baseShift;
}

type hoursPerShift = {
  morning: Set<string>;
  afternoon: Set<string>;
  night: Set<string>;
};

export function getAllStartHours(weekSchedule: WeekSchedule): hoursPerShift {
  // ou so refatorar essa lenda aqui que eu fiz

  // let startHours = new Set<string>();

  // Object.values(weekSchedule)
  //   .flatMap(day => Object.values(day.daySchedule))
  //   .flatMap(shift => shift.shiftSchedule)
  //   .forEach(cell => {
  //     startHours.add(
  //       `${useDayJs()(cell.startHour).format('HH:mm')}  ${cell.type === 'intervalo' ? ' intervalo' : ''}`
  //     );
  //   });

  // const hoursSet = new Set<string>();

  const hours: hoursPerShift = {
    morning: new Set<string>(),
    afternoon: new Set<string>(),
    night: new Set<string>(),
  };

  Object.values(weekSchedule)
    .flatMap(day => Object.entries(day.daySchedule))
    .forEach(([shiftName, shift]) => {
      // const shiftHours = shift.shiftSchedule.map(
      //   cell =>
      //     `${useDayJs()(cell.startHour).format('HH:mm')}${cell.type === 'intervalo' ? ' intervalo' : ''}`
      // );

      shift.shiftSchedule.forEach(cell =>
        hours[shiftName as ShiftName].add(
          `${useDayJs()(cell.startHour).format('HH:mm')}${cell.type === 'intervalo' ? ' intervalo' : ''}`
        )
      );

      // add(...shiftHours);

      // shift.shiftSchedule.forEach(cell => {

      //   hoursSet.add(
      //     `${shiftName} ${useDayJs()(cell.startHour).format('HH:mm')} ${cell.type === 'intervalo' ? 'intervalo' : ''}`
      //   );
      // });
    });

  // hoursSet.forEach(hour => {});
  // .flatMap(shift => shift.shiftSchedule)
  // .forEach(cell => {
  //   startHours.add(
  //     `${useDayJs()(cell.startHour).format('HH:mm')}  ${cell.type === 'intervalo' ? ' intervalo' : ''}`
  //   );
  // });

  // Object.values(weekSchedule).forEach(day => {
  //   Object.values(day.daySchedule).forEach(shift => {
  //     shift.shiftSchedule.forEach(cell => {
  //       startHours.add(
  //         `${useDayJs()(cell.startHour).format('HH:mm')}${cell.type === 'intervalo' ? ' intervalo' : ''} shiftIndex=${cell.shiftIndex}`
  //       );
  //     });
  //   });
  // });

  // const startHoursArray = [...startHours];

  // startHoursArray.sort((a, b) => {
  //   const dateA = new Date(`2000/01/01 ${a}`);
  //   const dateB = new Date(`2000/01/01 ${b}`);

  //   return dateA.getTime() - dateB.getTime();
  // });

  // startHours = new Set(startHoursArray);

  return hours;
}
