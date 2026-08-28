export const DIAS_SEMANA = [
  { value: 0, label: 'Domingo' },
  { value: 1, label: 'Segunda' },
  { value: 2, label: 'Terça' },
  { value: 3, label: 'Quarta' },
  { value: 4, label: 'Quinta' },
  { value: 5, label: 'Sexta' },
  { value: 6, label: 'Sábado' },
] as const;

export type TipoEntidadeIndisponibilidade = 'professor' | 'ambiente';

export type TipoIndisponibilidade = 'BLOQUEIO' | 'PREFERENCIA';

export type IndisponibilidadeItem = {
  id: string;
  tipo: TipoIndisponibilidade;
  diaSemana?: number | null;
  data?: string | null;
  inicio: string;
  fim: string;
  motivo?: string | null;
};

export type IndisponibilidadeFormPayload = {
  tipo: TipoIndisponibilidade;
  diaSemana?: number | null;
  data?: string | null;
  inicio: string;
  fim: string;
  motivo?: string | null;
};
