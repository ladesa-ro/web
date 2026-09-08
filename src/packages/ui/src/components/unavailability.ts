export const UNAVAILABILITY_WEEK_DAYS = [
  { value: 0, label: 'Domingo' },
  { value: 1, label: 'Segunda' },
  { value: 2, label: 'Terça' },
  { value: 3, label: 'Quarta' },
  { value: 4, label: 'Quinta' },
  { value: 5, label: 'Sexta' },
  { value: 6, label: 'Sábado' },
] as const;

export type UnavailabilityKind = 'BLOQUEIO' | 'PREFERENCIA';

export type UnavailabilityItem = {
  id: string;
  tipo: UnavailabilityKind;
  diaSemana?: number | null;
  data?: string | null;
  inicio: string;
  fim: string;
  motivo?: string | null;
};
