import type { Aula, HorDayjs, Intervalo, Vago } from '../useScheduleTypes';

export type Cell = (Aula | Vago | Intervalo) & HorDayjs;

export type Shift = {
  turnoId: string;
  dayId: number;
  maxCapacity: number;
};
