import type { DayInShifts } from "~/composables/schedule/useScheduleTypes";

export const shiftNames: (keyof DayInShifts['daySchedule'])[] = [
  'morning',
  'afternoon',
  'night',
];

export const getRowShiftName = (rowShift: string) => {
  switch (rowShift) {
    case 'morning':
      return 'Matutino';
    case 'afternoon':
      return 'Vespertino';
    case 'night':
      return 'Noturno';
  }
};