import type { UseManualRefHistoryReturn } from '@vueuse/core';
import type { Dayjs } from 'dayjs';
import type { Cell } from '~/composables/schedule/edit/useScheduleEditTypes';

export type TimeSlot = { startHour: string; endHour: string };

export type TimeSlotObj = Record<string, TimeSlot[]>;

export type WeekdayInfo = { date: string; weekday: string };

export type TimeSlots = Map<WeekdayInfo, TimeSlot[]>;

export type EditableCellType = 'aula' | 'vago';

type NonEditablePeriodsType = 'intervalo' | 'quebraTurno' | 'transicaoDia';

type TimePeriodType = EditableCellType | NonEditablePeriodsType;

export type EditableCell = {
  weekday: string;
  dayIndex?: number;
  shiftIndex?: number;
  cellIndex?: number;
};

type TimePeriodBase = {
  id: string;
  type: TimePeriodType;
  startHour: StringOrDayjs;
  endHour: StringOrDayjs;
  date: StringOrDayjs;
};

export type Aula = TimePeriodBase &
  EditableCell & {
    type: 'aula';
    diario: { turma: string; professor: string; disciplina: string };
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

export type ShiftName = 'morning' | 'afternoon' | 'night';

type ScheduleInfo = { letivo: boolean; modalidade: string };

export type Shift = { shiftInfo: ScheduleInfo; shiftSchedule: Cell[] };

export type DayInShifts = {
  dayInfo: ScheduleInfo;
  daySchedule: Record<ShiftName, Shift>;
};

export type WeekSchedule = Record<string, DayInShifts>;

export type WeekScheduleHistory = UseManualRefHistoryReturn<unknown, unknown>;

export type ShiftWhithoutInfo = Omit<Shift, 'shiftInfo'>;

export type DayInShiftsWithoutInfo = {
  daySchedule: Record<ShiftName, ShiftWhithoutInfo>;
};

export type WeekScheduleWhithoutInfo = Record<string, DayInShiftsWithoutInfo>;
