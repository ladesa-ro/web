import type { Aula, HorString, TimeSlotObj } from './useScheduleTypes';

export const temposDeAulaExemplo: TimeSlotObj = {
  segunda: [
    { startHour: '07:30:00', endHour: '08:20:00' },
    { startHour: '08:20:00', endHour: '09:10:00' },
    { startHour: '09:10:00', endHour: '10:00:00' },
    { startHour: '10:20:00', endHour: '11:10:00' },
    { startHour: '11:10:00', endHour: '12:00:00' },

    { startHour: '13:00:00', endHour: '13:50:00' },
    { startHour: '13:50:00', endHour: '14:40:00' },
    { startHour: '14:40:00', endHour: '15:30:00' },
    { startHour: '15:50:00', endHour: '16:40:00' },
    { startHour: '16:40:00', endHour: '17:30:00' },

    { startHour: '19:00:00', endHour: '19:50:00' },
    { startHour: '19:50:00', endHour: '20:40:00' },
    { startHour: '20:40:00', endHour: '21:30:00' },
    { startHour: '21:50:00', endHour: '22:40:00' },
    { startHour: '22:40:00', endHour: '23:30:00' },
  ],
  terca: [
    { startHour: '07:30:00', endHour: '08:20:00' },
    { startHour: '08:20:00', endHour: '09:10:00' },
    { startHour: '09:10:00', endHour: '10:00:00' },
    { startHour: '10:20:00', endHour: '11:10:00' },
    { startHour: '11:10:00', endHour: '12:00:00' },

    { startHour: '13:00:00', endHour: '13:50:00' },
    { startHour: '13:50:00', endHour: '14:40:00' },
    { startHour: '14:40:00', endHour: '15:30:00' },
    { startHour: '15:50:00', endHour: '16:40:00' },
    { startHour: '16:40:00', endHour: '17:30:00' },

    { startHour: '19:00:00', endHour: '19:50:00' },
    { startHour: '19:50:00', endHour: '20:40:00' },
    { startHour: '20:40:00', endHour: '21:30:00' },
    { startHour: '21:50:00', endHour: '22:40:00' },
    { startHour: '22:40:00', endHour: '23:30:00' },
  ],
  quarta: [
    { startHour: '07:30:00', endHour: '08:20:00' },
    { startHour: '08:20:00', endHour: '09:10:00' },
    { startHour: '09:10:00', endHour: '10:00:00' },
    { startHour: '10:20:00', endHour: '11:10:00' },
    { startHour: '11:10:00', endHour: '12:00:00' },

    { startHour: '19:00:00', endHour: '19:50:00' },
    { startHour: '19:50:00', endHour: '20:40:00' },
    { startHour: '20:40:00', endHour: '21:30:00' },
    { startHour: '21:50:00', endHour: '22:40:00' },
    { startHour: '22:40:00', endHour: '23:30:00' },
  ],
  quinta: [
    { startHour: '07:30:00', endHour: '08:20:00' },
    { startHour: '08:20:00', endHour: '09:10:00' },
    { startHour: '09:10:00', endHour: '10:00:00' },
    { startHour: '10:20:00', endHour: '11:10:00' },
    { startHour: '11:10:00', endHour: '12:00:00' },

    { startHour: '13:00:00', endHour: '13:50:00' },
    { startHour: '13:50:00', endHour: '14:40:00' },
    { startHour: '14:40:00', endHour: '15:30:00' },
    { startHour: '15:50:00', endHour: '16:40:00' },
    { startHour: '16:40:00', endHour: '17:30:00' },

    { startHour: '19:00:00', endHour: '19:50:00' },
    { startHour: '19:50:00', endHour: '20:40:00' },
    { startHour: '20:40:00', endHour: '21:30:00' },
    { startHour: '21:50:00', endHour: '22:40:00' },
    { startHour: '22:40:00', endHour: '23:30:00' },
  ],
  sexta: [
    { startHour: '07:30:00', endHour: '08:20:00' },
    { startHour: '08:20:00', endHour: '09:10:00' },
    { startHour: '09:10:00', endHour: '10:00:00' },
    { startHour: '10:20:00', endHour: '11:10:00' },
    { startHour: '11:10:00', endHour: '12:00:00' },

    { startHour: '19:00:00', endHour: '19:50:00' },
    { startHour: '19:50:00', endHour: '20:40:00' },
    { startHour: '20:40:00', endHour: '21:30:00' },
    { startHour: '21:50:00', endHour: '22:40:00' },
    { startHour: '22:40:00', endHour: '23:30:00' },
  ],
  sabado: [
    { startHour: '07:30:00', endHour: '08:20:00' },
    { startHour: '08:20:00', endHour: '09:10:00' },
    { startHour: '09:10:00', endHour: '10:00:00' },
    { startHour: '10:20:00', endHour: '11:10:00' },
    { startHour: '11:10:00', endHour: '12:00:00' },
  ],
};

export const aulasSemDiaSemanaExemplo: Omit<
  Aula & HorString,
  'weekday' | 'id'
>[] = [
  {
    type: 'aula',
    diario: {
      turma: '3a inf',
      professor: 'divanea',
      disciplina: 'protuges',
    },
    startHour: '07:30:00',
    endHour: '08:20:00',
    date: '2025-08-25',
  },
  {
    type: 'aula',
    diario: {
      turma: '3a inf',
      professor: 'divanea',
      disciplina: 'protuges',
    },
    startHour: '08:20:00',
    endHour: '09:10:00',
    date: '2025-08-25',
  },
  {
    type: 'aula',
    diario: {
      turma: '3a inf',
      professor: 'divanea',
      disciplina: 'protuges',
    },
    startHour: '09:10:00',
    endHour: '10:00:00',
    date: '2025-08-25',
  },
  {
    type: 'aula',
    diario: {
      turma: '1p ads',
      professor: 'divanea',
      disciplina: 'protuges insturmental',
    },
    startHour: '10:20:00',
    endHour: '11:10:00',
    date: '2025-08-26',
  },
];
