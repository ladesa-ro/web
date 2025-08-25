import type { Dayjs } from 'dayjs';

// intervalos de tempo recebidos pela api e editáveis pelo usuário
export type HorarioEditavelType = 'aula' | 'vago';

// intervalos de tempo automaticamente calculados por useCompleteSchedule()
export type HorarioNaoEditavelType =
| 'intervalo'
| 'quebraTurnos'
| 'transicaoDia';

export type HorarioType = HorarioEditavelType | HorarioNaoEditavelType;

export type HorarioEditavel = Horario & { tipo: HorarioEditavelType };

export type HorarioNaoEditavel = Horario & { tipo: HorarioNaoEditavelType };

//

type HorarioBase = {
  id: number;
  tipo: HorarioType;
  horaInicio: StringOrDayjs;
  horaFim: StringOrDayjs;
  data: StringOrDayjs;
  turnoId: number;
};

export type Aula = HorarioBase & {
  tipo: 'aula';
  disciplina: string;
  professor: string;
  turma: string;
};

export type Vago = HorarioBase & { tipo: 'vago' };

export type Intervalo = HorarioBase & { tipo: 'intervalo' };

export type QuebraTurnos = HorarioBase & { tipo: 'quebraTurnos' };

export type TransicaoDia = HorarioBase & { tipo: 'transicaoDia' };

export type Horario = Aula | Vago | Intervalo | QuebraTurnos | TransicaoDia;

//

export type StringOrDayjs = string | Dayjs;

export type HorarioDayjs = Horario & {
  data: Dayjs;
  horaInicio: Dayjs;
  horaFim: Dayjs;
};

export type HorarioString = Horario & {
  data: string;
  horaInicio: string;
  horaFim: string;
};
