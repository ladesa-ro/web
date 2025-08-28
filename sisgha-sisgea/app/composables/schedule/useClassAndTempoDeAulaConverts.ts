import { getWeekDays } from '../../components/Section/Horario/-Helpers/GetWeekDays';
import type {
  Aula,
  HorString,
  TemposDeAula,
  TemposDeAulaMap,
} from './useScheduleTypes';

// TODO: aceitar um parâmetro do tipo Ladesa_ManagementService_Domain_Contracts_AulaFindOneOutput ao integrar à api

/** Adiciona o dia da semana de um horário à sua estrutura com base em sua data. */
export const useClassDayWeek = (
  aula: Omit<Aula & HorString, 'diaSemana' | 'id'>
): Aula & HorString => {
  const dayweek = useFilterText(useDayJs()(aula.data).format('dddd'));

  return {
    ...aula,
    diaSemana: dayweek,
    id: `${useCampusContext().value}::${aula.data}::${aula.horaInicio}-${aula.horaFim}::${aula.diario.disciplina}-${aula.diario.professor}-${aula.diario.turma}`,
  };
};

/** Adiciona o dia do mês à estrutura de tempo de aulas com base na data e dia da semana de uma aula. */
export const useTempoDeAulaDayMonth = (
  aula: Aula & HorString,
  temposDeAula: TemposDeAula
): TemposDeAulaMap => {
  const temposAulaMap: TemposDeAulaMap = new Map();

  const weekDays = getWeekDays(useDayJs()(aula.data));

  Object.entries(temposDeAula).forEach(([diaSemana, arrTemposAula], index) => {
    temposAulaMap.set(
      {
        data: weekDays[index]?.dayAsDayJs.format('YYYY-MM-DD') ?? '',
        diaSemana,
      },
      arrTemposAula
    );
  });

  return temposAulaMap;
};
