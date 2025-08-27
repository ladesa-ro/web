import type { Dayjs } from 'dayjs';

export type TempoDeAula = { horaInicio: string; horaFim: string };

export type TemposDeAula = {
  segunda: TempoDeAula[];
  terca: TempoDeAula[];
  quarta: TempoDeAula[];
  quinta: TempoDeAula[];
  sexta: TempoDeAula[];
  sabado: TempoDeAula[];
};

export type TemposDeAulaMap = Map<
  { data: string; diaSemana: string },
  TempoDeAula[]
>;

//

// intervalos de tempo recebidos pela api e editáveis pelo usuário
export type HorarioEditavelType = 'aula' | 'vago';

// intervalos de tempo automaticamente calculados por useCompleteSchedule()
export type HorarioNaoEditavelType =
  | 'intervalo'
  | 'quebraTurno'
  | 'transicaoDia';

export type HorarioType = HorarioEditavelType | HorarioNaoEditavelType;

//

export type HorarioEditavel = {
  diaSemana: string;

  // TODO: adicionar lugar que provê valor de turnoId (talvez na divisão de turnos)
  turnoId?: string;
};

//

type HorarioBase = {
  id: string;
  tipo: HorarioType;
  horaInicio: StringOrDayjs;
  horaFim: StringOrDayjs;
  data: StringOrDayjs;
};

// TODO: adaptar a estrutura de aula quando integrar à api
// extenderá o tipo Ladesa_ManagementService_Domain_Contracts_AulaFindOneOutput
export type Aula = HorarioBase &
  HorarioEditavel & {
    tipo: 'aula';
    diario: { turma: string; professor: string; disciplina: string };
    // ambiente: string;
    // intervaloDeTempo: TempoDeAula;
    // modalidade: string;
  };

export type Vago = HorarioBase & HorarioEditavel & { tipo: 'vago' };

export type Intervalo = HorarioBase & { tipo: 'intervalo' };

export type quebraTurno = HorarioBase & { tipo: 'quebraTurno' };

export type TransicaoDia = HorarioBase & {
  tipo: 'transicaoDia';
  dataFim: StringOrDayjs;
};

export type Horario = Aula | Vago | Intervalo | quebraTurno | TransicaoDia;

//

export type StringOrDayjs = string | Dayjs;

export type HorDayjs = Horario & {
  data: Dayjs;
  horaInicio: Dayjs;
  horaFim: Dayjs;
};

export type HorString = Horario & {
  data: string;
  horaInicio: string;
  horaFim: string;
};

//

export type DiaEmTurnos = {
  manha: (Horario & HorDayjs)[];
  tarde: (Horario & HorDayjs)[];
  noite: (Horario & HorDayjs)[];
};

export type CompleteSchedule = {
  manha: ((Aula | Vago) & HorDayjs)[];
  tarde: ((Aula | Vago) & HorDayjs)[];
  noite: ((Aula | Vago) & HorDayjs)[];
}[];
