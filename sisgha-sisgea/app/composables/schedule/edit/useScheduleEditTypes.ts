import type { Aula, DiaEditavelEmTurnos, HorDayjs, Intervalo, Vago, WeekdayMeta } from '../useScheduleTypes';

export type Cell = (Aula | Vago | Intervalo) & HorDayjs;

export type Shift = {
  turnoId: string;
  dayId: number;
  maxCapacity: number;
};

export type WeekScheduleEditable = {
  data: WeekdayMeta;
  schedule: DiaEditavelEmTurnos;
}[];
