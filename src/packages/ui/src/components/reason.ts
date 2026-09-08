export type ReasonEntry = {
  horario: string;
  motivo: string;
};

export type ReasonsByDay = Record<string, ReasonEntry[]>;

const WEEK_DAYS_WITH_FEIRA = [
  'segunda',
  'terca',
  'terça',
  'quarta',
  'quinta',
  'sexta',
];

export function formatWeekDayLabel(dia: string): string {
  return WEEK_DAYS_WITH_FEIRA.includes(dia.toLowerCase())
    ? `${dia}-feira`
    : dia;
}

export function normalizeWeekDayKey(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}
