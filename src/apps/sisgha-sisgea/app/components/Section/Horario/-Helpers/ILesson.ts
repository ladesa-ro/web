export type ILesson = {
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
