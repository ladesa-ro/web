import type {
  Aula,
  HorDayjs,
  Intervalo,
  Vago,
} from '../useScheduleTypes';

export type EditableCell = (Aula | Vago);

export type NonEditableCell = Intervalo;

export type Cell = (EditableCell | NonEditableCell) & HorDayjs & {
  cellIndex?: number;
  shiftIndex?: number;
  dayIndex?: number;
};

//

export type ShiftEdit = {
  shiftIndex: string;
  dayIndex: number;
  maxCapacity: number;
};
