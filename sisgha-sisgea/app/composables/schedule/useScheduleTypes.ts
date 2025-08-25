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

//

// intervalos de tempo recebidos pela api e editáveis pelo usuário
export type HorarioEditavelType = 'aula' | 'vago';

// intervalos de tempo automaticamente calculados por useCompleteSchedule()
export type HorarioNaoEditavelType =
  | 'intervalo'
  | 'quebraTurnos'
  | 'transicaoDia';

export type HorarioType = HorarioEditavelType | HorarioNaoEditavelType;

export type HorarioEditavel = Horario & {
  tipo: HorarioEditavelType;
  diaSemana: string | number;
  turnoId: string;
};

export type HorarioNaoEditavel = Horario & { tipo: HorarioNaoEditavelType };

//

type HorarioBase = {
  id: string;
  tipo: HorarioType;
  horaInicio: StringOrDayjs;
  horaFim: StringOrDayjs;
  data: StringOrDayjs;
};

export type Aula = HorarioBase & {
  tipo: 'aula';
  ambiente: string;
  diario: { turma: string; professor: string; disciplina: string };
};

export type Vago = HorarioBase & { tipo: 'vago' };

export type Intervalo = HorarioBase & {
  tipo: 'intervalo';
};

export type QuebraTurnos = HorarioBase & { tipo: 'quebraTurnos' };

export type TransicaoDia = HorarioBase & { tipo: 'transicaoDia' };

export type Horario = Aula | Vago | Intervalo | QuebraTurnos | TransicaoDia;

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
