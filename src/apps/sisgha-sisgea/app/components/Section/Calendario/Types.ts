// # API - Calendar Types

// # COMPONENTS - Calendar Types
export type CalendarEvent = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  color: string | null;
  locale?: string | null | undefined;
  calendar?: { id: string };
  type: 'etapa' | 'agendamento';

  colecao?: { id: string } | null;
  campus?: { id: string } | null;
  autorId?: string | null;
  motivo?: string | null;
  detalhesOcultos?: boolean;
  identificadorExternoSerieOrigem?: string | null;
  dataOcorrenciaReferenciada?: string | null;
  version?: number;
  horarioInicio?: string | null;
  horarioFim?: string | null;
  ambientes?: Array<{ id: string; nome?: string | null }> | null;
};

export type CalendarData = {
  id: string;
  name: string;
  year?: number | null;
  trainingOffer: { id: string };
  campus: { id: string };
};

export type Day = {
  date?: string;
  color?: string;
  holiday?: boolean;
  school?: boolean;
  occupied?: boolean;
};

export type EmptyDays = {
  before: number;
  after: number;
};
