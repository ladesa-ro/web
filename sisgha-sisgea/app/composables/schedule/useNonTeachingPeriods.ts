import type { Dayjs } from 'dayjs';
import { convertStringToDayJs } from './useScheduleConverts';
import type {
  Horario,
  HorDayjs,
  HorString,
  Intervalo,
  quebraTurno,
  TransicaoDia,
} from './useScheduleTypes';

/**
 * Adiciona intervalos entre aulas, quebras de turno e, caso especificado nos parâmetros, transição entre dias de aula.
 * @param horarioSemIntervalos Horário que contenha apenas aulas (type `Aula`) e tempos vagos (type `Vago`).
 * @param deveTerTransicaoDeDias Indica se o tempo de transição entre a última aula de um dia e primeira aula do dia seguinte deve vir contabilizado como um horário do tipo TransicaoDias.
 */
export const useNonTeachingPeriods = (
  horarioSemIntervalos: (Horario & HorString)[],
  deveTerTransicaoDeDias: boolean = true
): (Horario & HorDayjs)[] => {
  const horarioDayjs = horarioSemIntervalos.map(horario =>
    convertStringToDayJs(horario)
  );

  // analisar tempo entre 2 aulas e classificar
  for (let i = 0; i + 1 < horarioDayjs.length; i++) {
    const diferencaMin = Math.abs(
      (horarioDayjs[i]?.horaFim as Dayjs).diff(
        horarioDayjs[i + 1]!.horaInicio,
        'minute'
      )
    );
    const diferencaDia = Math.abs(
      horarioDayjs[i]!.data.diff(horarioDayjs[i + 1]!.data, 'day')
    );

    if (diferencaMin >= 10 && diferencaMin <= 30) {
      const intervalo: Intervalo & HorDayjs = {
        id: crypto.randomUUID(),
        tipo: 'intervalo',
        data: horarioDayjs[i]!.data,
        horaInicio: horarioDayjs[i]!.horaFim,
        horaFim: horarioDayjs[i + 1]!.horaInicio,
      };

      horarioDayjs.splice(i + 1, 0, intervalo);
    }

    //
    else if (diferencaMin > 30 && diferencaDia === 0) {
      const quebra: quebraTurno & HorDayjs = {
        id: crypto.randomUUID(),
        tipo: 'quebraTurno',
        data: horarioDayjs[i]!.data,
        horaInicio: horarioDayjs[i]!.horaFim,
        horaFim: horarioDayjs[i + 1]!.horaInicio,
      };

      horarioDayjs.splice(i + 1, 0, quebra);
    }

    //
    else if (
      diferencaDia >= 1 &&
      horarioDayjs[i]?.tipo !== 'transicaoDia' &&
      deveTerTransicaoDeDias
    ) {
      const transicao: TransicaoDia & HorDayjs = {
        id: crypto.randomUUID(),
        tipo: 'transicaoDia',
        data: horarioDayjs[i]!.data,
        horaInicio: horarioDayjs[i]!.horaFim,
        horaFim: horarioDayjs[i + 1]!.horaInicio,
        dataFim: horarioDayjs[i + 1]!.data,
      };

      horarioDayjs.splice(i + 1, 0, transicao);
    }
  }

  // agora o horario tem intervalos e tem data e horarios com dayjs
  return horarioDayjs;
};
