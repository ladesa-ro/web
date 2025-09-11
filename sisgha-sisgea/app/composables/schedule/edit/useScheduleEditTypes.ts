import type {
  Aula,
  HorDayjs,
  Intervalo,
  Vago,
} from '../useScheduleTypes';

export type EditableCell = (Aula | Vago) & HorDayjs;
export type NonEditableCell = Intervalo & HorDayjs;
export type Cell = EditableCell | NonEditableCell;

export type Shift = {
  shiftIndex: string;
  dayIndex: number;
  maxCapacity: number;
};

// export type WeekScheduleEditable = {
//   data: WeekdayInfo;
//   schedule: DiaEditavelEmTurnos;
// }[];
