import type { Dayjs } from 'dayjs';
import { convertStringToDayJs } from './scheduleConverts';
import type {
  Horario,
  HorDayjs,
  HorString,
  Intervalo,
  QuebraTurno,
  TransicaoDia,
} from './types';

export const getNonTeachingPeriods = (
  horarioSemIntervalos: (Horario & HorString)[],
  deveTerTransicaoDeDias: boolean = true
): (Horario & HorDayjs)[] => {
  const horarioDayjs = horarioSemIntervalos.map(horario =>
    convertStringToDayJs(horario)
  );

  for (let i = 0; i + 1 < horarioDayjs.length; i++) {
    const diferencaMin = Math.abs(
      (horarioDayjs[i]?.endHour as Dayjs).diff(
        horarioDayjs[i + 1]!.startHour,
        'minute'
      )
    );
    const diferencaDia = Math.abs(
      horarioDayjs[i]!.date.diff(horarioDayjs[i + 1]!.date, 'day')
    );

    if (diferencaMin >= 10 && diferencaMin <= 30) {
      const intervalo: Intervalo & HorDayjs = {
        id: crypto.randomUUID(),
        type: 'intervalo',
        date: horarioDayjs[i]!.date,
        startHour: horarioDayjs[i]!.endHour,
        endHour: horarioDayjs[i + 1]!.startHour,
      };

      horarioDayjs.splice(i + 1, 0, intervalo);
    } else if (diferencaMin > 30 && diferencaDia === 0) {
      const quebra: QuebraTurno & HorDayjs = {
        id: crypto.randomUUID(),
        type: 'quebraTurno',
        date: horarioDayjs[i]!.date,
        startHour: horarioDayjs[i]!.endHour,
        endHour: horarioDayjs[i + 1]!.startHour,
      };

      horarioDayjs.splice(i + 1, 0, quebra);
    } else if (
      diferencaDia >= 1 &&
      horarioDayjs[i]?.type !== 'transicaoDia' &&
      deveTerTransicaoDeDias
    ) {
      const transicao: TransicaoDia & HorDayjs = {
        id: crypto.randomUUID(),
        type: 'transicaoDia',
        date: horarioDayjs[i]!.date,
        startHour: horarioDayjs[i]!.endHour,
        endHour: horarioDayjs[i + 1]!.startHour,
        endDate: horarioDayjs[i + 1]!.date,
      };

      horarioDayjs.splice(i + 1, 0, transicao);
    }
  }

  return horarioDayjs;
};
