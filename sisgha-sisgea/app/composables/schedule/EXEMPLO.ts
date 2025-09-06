import type { Aula, HorString, TemposDeAula } from './useScheduleTypes';

export const temposDeAulaExemplo: TemposDeAula = {
  segunda: [
    { horaInicio: '07:30:00', horaFim: '08:20:00' },
    { horaInicio: '08:20:00', horaFim: '09:10:00' },
    { horaInicio: '09:10:00', horaFim: '10:00:00' },
    { horaInicio: '10:20:00', horaFim: '11:10:00' },
    { horaInicio: '11:10:00', horaFim: '12:00:00' },

    { horaInicio: '13:00:00', horaFim: '13:50:00' },
    { horaInicio: '13:50:00', horaFim: '14:40:00' },
    { horaInicio: '14:40:00', horaFim: '15:30:00' },
    { horaInicio: '15:50:00', horaFim: '16:40:00' },
    { horaInicio: '16:40:00', horaFim: '17:30:00' },

    { horaInicio: '19:00:00', horaFim: '19:50:00' },
    { horaInicio: '19:50:00', horaFim: '20:40:00' },
    { horaInicio: '20:40:00', horaFim: '21:30:00' },
    { horaInicio: '21:50:00', horaFim: '22:40:00' },
    { horaInicio: '22:40:00', horaFim: '23:30:00' },
  ],
  terca: [
    { horaInicio: '07:30:00', horaFim: '08:20:00' },
    { horaInicio: '08:20:00', horaFim: '09:10:00' },
    { horaInicio: '09:10:00', horaFim: '10:00:00' },
    { horaInicio: '10:20:00', horaFim: '11:10:00' },
    { horaInicio: '11:10:00', horaFim: '12:00:00' },

    { horaInicio: '13:00:00', horaFim: '13:50:00' },
    { horaInicio: '13:50:00', horaFim: '14:40:00' },
    { horaInicio: '14:40:00', horaFim: '15:30:00' },
    { horaInicio: '15:50:00', horaFim: '16:40:00' },
    { horaInicio: '16:40:00', horaFim: '17:30:00' },

    { horaInicio: '19:00:00', horaFim: '19:50:00' },
    { horaInicio: '19:50:00', horaFim: '20:40:00' },
    { horaInicio: '20:40:00', horaFim: '21:30:00' },
    { horaInicio: '21:50:00', horaFim: '22:40:00' },
    { horaInicio: '22:40:00', horaFim: '23:30:00' },
  ],
  quarta: [
    { horaInicio: '07:30:00', horaFim: '08:20:00' },
    { horaInicio: '08:20:00', horaFim: '09:10:00' },
    { horaInicio: '09:10:00', horaFim: '10:00:00' },
    { horaInicio: '10:20:00', horaFim: '11:10:00' },
    { horaInicio: '11:10:00', horaFim: '12:00:00' },

    { horaInicio: '19:00:00', horaFim: '19:50:00' },
    { horaInicio: '19:50:00', horaFim: '20:40:00' },
    { horaInicio: '20:40:00', horaFim: '21:30:00' },
    { horaInicio: '21:50:00', horaFim: '22:40:00' },
    { horaInicio: '22:40:00', horaFim: '23:30:00' },
  ],
  quinta: [
    { horaInicio: '07:30:00', horaFim: '08:20:00' },
    { horaInicio: '08:20:00', horaFim: '09:10:00' },
    { horaInicio: '09:10:00', horaFim: '10:00:00' },
    { horaInicio: '10:20:00', horaFim: '11:10:00' },
    { horaInicio: '11:10:00', horaFim: '12:00:00' },

    { horaInicio: '13:00:00', horaFim: '13:50:00' },
    { horaInicio: '13:50:00', horaFim: '14:40:00' },
    { horaInicio: '14:40:00', horaFim: '15:30:00' },
    { horaInicio: '15:50:00', horaFim: '16:40:00' },
    { horaInicio: '16:40:00', horaFim: '17:30:00' },

    { horaInicio: '19:00:00', horaFim: '19:50:00' },
    { horaInicio: '19:50:00', horaFim: '20:40:00' },
    { horaInicio: '20:40:00', horaFim: '21:30:00' },
    { horaInicio: '21:50:00', horaFim: '22:40:00' },
    { horaInicio: '22:40:00', horaFim: '23:30:00' },
  ],
  sexta: [
    { horaInicio: '07:30:00', horaFim: '08:20:00' },
    { horaInicio: '08:20:00', horaFim: '09:10:00' },
    { horaInicio: '09:10:00', horaFim: '10:00:00' },
    { horaInicio: '10:20:00', horaFim: '11:10:00' },
    { horaInicio: '11:10:00', horaFim: '12:00:00' },

    { horaInicio: '19:00:00', horaFim: '19:50:00' },
    { horaInicio: '19:50:00', horaFim: '20:40:00' },
    { horaInicio: '20:40:00', horaFim: '21:30:00' },
    { horaInicio: '21:50:00', horaFim: '22:40:00' },
    { horaInicio: '22:40:00', horaFim: '23:30:00' },
  ],
  sabado: [
    { horaInicio: '07:30:00', horaFim: '08:20:00' },
    { horaInicio: '08:20:00', horaFim: '09:10:00' },
    { horaInicio: '09:10:00', horaFim: '10:00:00' },
    { horaInicio: '10:20:00', horaFim: '11:10:00' },
    { horaInicio: '11:10:00', horaFim: '12:00:00' },
  ],
};

export const aulasSemDiaSemanaExemplo: Omit<
  Aula & HorString,
  'diaSemana' | 'id'
>[] = [
  {
    tipo: 'aula',
    diario: {
      turma: '3a inf',
      professor: 'divanea',
      disciplina: 'protuges',
    },
    horaInicio: '07:30:00',
    horaFim: '08:20:00',
    data: '2025-08-25',
  },
  {
    tipo: 'aula',
    diario: {
      turma: '3a inf',
      professor: 'divanea',
      disciplina: 'protuges',
    },
    horaInicio: '08:20:00',
    horaFim: '09:10:00',
    data: '2025-08-25',
  },
  {
    tipo: 'aula',
    diario: {
      turma: '3a inf',
      professor: 'divanea',
      disciplina: 'protuges',
    },
    horaInicio: '09:10:00',
    horaFim: '10:00:00',
    data: '2025-08-25',
  },
  {
    tipo: 'aula',
    diario: {
      turma: '1p ads',
      professor: 'divanea',
      disciplina: 'protuges insturmental',
    },
    horaInicio: '10:20:00',
    horaFim: '11:10:00',
    data: '2025-08-26',
  },
];
