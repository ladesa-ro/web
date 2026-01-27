import type {
  Aula,
  HorDayjs,
  Intervalo,
  Vago,
} from '../useScheduleTypes';

export type EditableCell = (Aula | Vago);

export type NonEditableCell = Intervalo;

export type Cell = (EditableCell | NonEditableCell) & HorDayjs & {
  shiftIndex?: number;
  dayIndex?: number;
  
  // manter essas aqui
  cellIndex?: number;
  shiftName?: string;
  dayDate?: string;
};

//

export type ShiftEdit = {
  shiftIndex: string;
  dayIndex: number;
  maxCapacity: number;
};
