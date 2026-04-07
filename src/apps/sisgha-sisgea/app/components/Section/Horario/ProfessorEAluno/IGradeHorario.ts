export type IDiaDaSemana = {
  nome: string;
};

export type IDiasDaSemana = Array<IDiaDaSemana>;

export type ITurnoHorario = {
  hora: string;
  horaFim?: string;
  tipo: 'intervalo' | 'aula';
};

export type ITurnoHorarios = ITurnoHorario[];

export type ITurno = {
  nome: string;
  horarios: ITurnoHorarios;
};

export type ITurnos = ITurno[];

export type IGradeDisciplina = {
  diaDaSemana: number;
  horarios: number[];
  disciplina: string;
  professor: string;
};
