const FIRST_AFTERNOON_HOUR = 12;

const FIRST_EVENING_HOUR = 18;

export const DAY_PERIODS = ['Matutino', 'Vespertino', 'Noturno'] as const;

export type DayPeriod = (typeof DAY_PERIODS)[number];

export type TimeInterval = { inicio: string; fim: string };

export type DayPeriodGroup = {
  nome: DayPeriod;
  intervalos: TimeInterval[];
};

export function classifyDayPeriod(startTime: string): DayPeriod {
  const [hourText = '0'] = startTime.split(':');
  const hour = Number.parseInt(hourText, 10);

  if (hour < FIRST_AFTERNOON_HOUR) return 'Matutino';
  if (hour < FIRST_EVENING_HOUR) return 'Vespertino';
  return 'Noturno';
}

function sortByStartTime(intervals: TimeInterval[]): TimeInterval[] {
  return [...intervals].sort((a, b) => a.inicio.localeCompare(b.inicio));
}

export function groupIntervalsByDayPeriod(
  intervals: TimeInterval[]
): DayPeriodGroup[] {
  return DAY_PERIODS.map(nome => ({
    nome,
    intervalos: sortByStartTime(
      intervals.filter(interval => classifyDayPeriod(interval.inicio) === nome)
    ),
  }));
}
