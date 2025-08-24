import type { Dayjs } from 'dayjs';

export type StringOrDayjs = string | Dayjs;

export type HorarioEditavelType = 'aula' | 'vago' | 'outro';

export type HorarioCalculadoAutomaticamenteType =
  | 'intervaloEntreAulas'
  | 'quebraDeTurno';

export type HorarioType =
  | HorarioEditavelType
  | HorarioCalculadoAutomaticamenteType;

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

export type Intervalo = HorarioBase & { tipo: 'intervaloEntreAulas' };

export type Quebra = HorarioBase & { tipo: 'quebraEntreTurnos' };

export type Outro = HorarioBase & { tipo: 'outro'; atividade: string };

export type Horario = Aula | Vago | Intervalo | Quebra | Outro;

//

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

export const getActivityName = (
  horario: Horario & { tipo: HorarioEditavelType },
  isProfessorView: boolean
) => {
  switch (horario.tipo) {
    case 'vago':
      return '-';

    case 'aula':
      return isProfessorView
        ? `${horario.disciplina} - ${horario.turma}`
        : `${horario.disciplina} - ${horario.professor}`;

    case 'outro':
      return horario.atividade;
  }
};
