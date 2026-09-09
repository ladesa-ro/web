export type ScheduleWeekDay = {
  nome: string;
};

export type ScheduleWeekDays = ScheduleWeekDay[];

export type ScheduleShiftSlot = {
  hora: string;
  horaFim?: string;
  tipo: 'intervalo' | 'aula';
};

export type ScheduleShiftSlots = ScheduleShiftSlot[];

export type ScheduleShift = {
  nome: string;
  horarios: ScheduleShiftSlots;
};

export type ScheduleShifts = ScheduleShift[];

export type ScheduleDiscipline = {
  diaDaSemana: number;
  horarios: number[];
  disciplina: string;
  professor: string;
};

export type ScheduleLesson = {
  id?: string;
  version?: number;
  occurrenceDate?: string;
  repeticao?: string | null;
  discipline: string;
  class: string;
  environment: string;
  campus: string;
  teacher: string;
  startsAt: string;
  endsAt: string;
};
