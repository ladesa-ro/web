import type { Aula, Intervalo, Vago } from "../useScheduleTypes";

export type Cell = Aula | Vago | Intervalo;

export type Shift = { id: string };
