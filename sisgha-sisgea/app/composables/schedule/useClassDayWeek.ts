import type { Aula, HorString } from "./useScheduleTypes";

// TODO: aceitar um parâmetro do tipo Ladesa_ManagementService_Domain_Contracts_AulaFindOneOutput ao integrar à api

/** Adiciona o dia da semana de um horário à sua estrutura com base em sua data */
export const useClassDayWeek = (aula: Omit<Aula & HorString,'diaSemana'>): Aula & HorString => {
  const dayweek = useDayJs()(aula.data).format('dddd');

  return {...aula, diaSemana: dayweek };
}
