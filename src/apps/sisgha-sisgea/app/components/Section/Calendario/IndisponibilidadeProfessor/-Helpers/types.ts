export {
  UNAVAILABILITY_WEEK_DAYS as DIAS_SEMANA,
  type UnavailabilityItem as IndisponibilidadeItem,
  type UnavailabilityKind as TipoIndisponibilidade,
} from '@ladesa-ro/web.ui';

export type TipoEntidadeIndisponibilidade = 'professor' | 'ambiente';

export type IndisponibilidadeFormPayload = {
  tipo: 'BLOQUEIO' | 'PREFERENCIA';
  diaSemana?: number | null;
  data?: string | null;
  inicio: string;
  fim: string;
  motivo?: string | null;
};
