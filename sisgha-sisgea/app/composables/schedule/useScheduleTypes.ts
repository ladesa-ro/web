import type { UseManualRefHistoryReturn } from '@vueuse/core';
import type { Dayjs } from 'dayjs';
import type { Cell } from './edit/useScheduleEditTypes';

// hello dev who came here some time after i did this code! if you need to change this code, im so sorry because its so confusing and i mixed languages (portuguese and english). i didnt improve this because my mental health wouldnt allow it. namaste

export type TimeSlot = { startHour: string; endHour: string };

export type TimeSlotObj = Record<string, TimeSlot[]>;

export type WeekdayInfo = { date: string; weekday: string };

export type TimeSlots = Map<WeekdayInfo, TimeSlot[]>;

//

// intervalos de tempo recebidos pela api e editáveis pelo usuário
export type EditableCellType = 'aula' | 'vago';

// intervalos de tempo automaticamente calculados por useWeekSchedule()
type NonEditablePeriodsType = 'intervalo' | 'quebraTurno' | 'transicaoDia';

type TimePeriodType = EditableCellType | NonEditablePeriodsType;

//

export type EditableCell = {
  weekday: string;
  dayIndex?: number;
  shiftIndex?: number;
  cellIndex?: number;
};

//

type TimePeriodBase = {
  id: string;
  type: TimePeriodType;
  startHour: StringOrDayjs;
  endHour: StringOrDayjs;
  date: StringOrDayjs;
};

// TODO: adaptar a estrutura de aula quando integrar à api
// extenderá o tipo Ladesa_ManagementService_Domain_Contracts_AulaFindOneOutput
export type Aula = TimePeriodBase &
  EditableCell & {
    type: 'aula';
    diario: { turma: string; professor: string; disciplina: string };
    // ambiente: string;
    // intervaloDeTempo: TempoDeAula;
    // modalidade: string;
  };

export type Vago = TimePeriodBase & EditableCell & { type: 'vago' };

export type Intervalo = TimePeriodBase & {
  type: 'intervalo';
  shiftIndex?: number;
};

export type QuebraTurno = TimePeriodBase & { type: 'quebraTurno' };

export type TransicaoDia = TimePeriodBase & {
  type: 'transicaoDia';
  endDate: StringOrDayjs;
};

export type Horario = Aula | Vago | Intervalo | QuebraTurno | TransicaoDia;

//

export type StringOrDayjs = string | Dayjs;

export type HorDayjs = Horario & {
  date: Dayjs;
  startHour: Dayjs;
  endHour: Dayjs;
};

export type HorString = Horario & {
  date: string;
  startHour: string;
  endHour: string;
};

//

export type ShiftName = 'morning' | 'afternoon' | 'night';

//

type ScheduleInfo = { letivo: boolean; modalidade: string };

export type Shift = { shiftInfo: ScheduleInfo; shiftSchedule: Cell[] };

export type DayInShifts = {
  dayInfo: ScheduleInfo;
  daySchedule: Record<ShiftName, Shift>;
};

export type WeekSchedule = Record<string, DayInShifts>;

export type WeekScheduleHistory = UseManualRefHistoryReturn<unknown, unknown>;

//

export type ShiftWhithoutInfo = Omit<Shift, 'shiftInfo'>;

export type DayInShiftsWithoutInfo = {
  daySchedule: Record<ShiftName, ShiftWhithoutInfo>;
};

export type WeekScheduleWhithoutInfo = Record<string, DayInShiftsWithoutInfo>;
