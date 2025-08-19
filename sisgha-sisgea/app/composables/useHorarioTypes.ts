import type { Dayjs } from 'dayjs';

export type StringOrDayjs = string | Dayjs;

export type DiaSemana = 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado';

export type Data = { data: StringOrDayjs };

export type HorarioBaseComData = HorarioBase & Data;

// tipos principais

type HorarioBase = {
  id: number;
  tipo: 'aula' | 'vago' | 'intervaloEntreAulas' | 'quebraDeTurno';
  horaInicio: StringOrDayjs;
  horaFim: StringOrDayjs;
  diaSemana: DiaSemana;
  colunaId: number;
};

export type Aula = HorarioBaseComData & {
  tipo: 'aula';
  disciplina: string;
  professor: string;
  turma: string;
};

export type Vago = HorarioBaseComData & { tipo: 'vago' };

export type Intervalo = HorarioBaseComData & { tipo: 'intervaloEntreAulas' };

export type Quebra = HorarioBaseComData & { tipo: 'quebraEntreTurnos' };

export type Horario = Aula | Vago | Intervalo | Quebra;

export type HorarioDayjs = Horario & {
  data: Dayjs;
  inicio: Dayjs;
  fim: Dayjs;
  // diaSemana: Dayjs;
};

export type HorarioString = Horario & {
  data: string;
  inicio: string;
  fim: string;
  // diaSemana: string;
};

export const getActivityName = (horario: Horario, isProfessorView: boolean) => {
  switch (horario.tipo) {
    case 'vago':
      return '-';
    case 'aula':
      return isProfessorView
        ? `${horario.disciplina} - ${horario.turma}`
        : `${horario.disciplina} - ${horario.professor}`;
    case 'intervaloEntreAulas':
      return 'Intervalo';
  }
};