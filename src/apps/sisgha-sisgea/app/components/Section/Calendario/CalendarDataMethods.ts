// # IMPORT
import type { CalendarioAgendamentoFindOneOutputDto } from '@ladesa-ro/web.api.client';
import {
  calendarioAgendamentoCreate,
  calendarioAgendamentoDeleteOneById,
  calendarioAgendamentoUpdate,
  calendarioLetivoCreate,
  calendarioLetivoDeleteOneById,
  calendarioLetivoEtapaBulkReplace,
  calendarioLetivoEtapaFindAll,
  calendarioLetivoFindAll,
  calendarioLetivoFindById,
  calendarioLetivoUpdate,
  consultaOcorrenciasPorData,
} from '@ladesa-ro/web.api.client';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
import type { CalendarData, CalendarEvent } from './Types';

// # CODE
dayjs.extend(customParseFormat);
dayjs.extend(timezone);
dayjs.extend(utc);

export const calendarDataMethods = {
  // Check
  check: {
    validHour: async (hour: string | null | undefined): Promise<boolean> => {
      try {
        if (!hour) return false;

        const [h, m] = hour.split(':');
        const hourNum = Number(h);
        const minNum = Number(m);

        if (isNaN(hourNum) || isNaN(minNum)) return false;

        if (hourNum < 0 || hourNum > 23 || minNum < 0 || minNum > 59) {
          return false;
        }

        return true;
      } catch (e) {
        console.error(`Erro: ${e}`);
        return false;
      }
    },
  },

  // Calendar
  calendar: {
    // TODO: Temp. Get Calendar Method
    async getCalendarById(calendarId: string): Promise<CalendarData> {
      let calendar: CalendarData = {
        id: '',
        name: '',
        year: null,
        trainingOffer: { id: '' },
        campus: { id: '' },
      };

      try {
        const getCalendar = await getApiClient().call(
          calendarioLetivoFindById,
          {
            path: {
              id: calendarId,
            },
          }
        );

        if (getCalendar) {
          calendar = {
            id: getCalendar!.id,
            name: getCalendar!.nome,
            year: getCalendar!.ano,
            trainingOffer: { id: getCalendar!.ofertaFormacao.id },
            campus: { id: getCalendar!.campus.id },
          };
        }
        return calendar;
      } catch (e) {
        console.error(`Erro: ${e}`);
        return calendar;
      }
    },

    async getCalendarIdByData(
      name: string,
      year: number,
      campus: string,
      trainingOffer: string
    ): Promise<string> {
      try {
        const getCalendar = await getApiClient().call(calendarioLetivoFindAll, {
          query: {
            'filter.campus.id': [campus],
            'filter.ofertaFormacao.id': [trainingOffer],
            search: name,
          },
        });

        const filterCalendar = getCalendar.data.find(
          item =>
            item.nome === name &&
            item.ano === year &&
            item.campus.id === campus &&
            item.ofertaFormacao.id === trainingOffer
        );

        if (filterCalendar) return filterCalendar.id;
        else return '';
      } catch (e) {
        console.error(`Erro: ${e}`);
        return '';
      }
    },

    async postCalendar(
      name: string,
      year: number,
      campus: string,
      trainingOffer: string
    ): Promise<any> {
      try {
        await getApiClient().call(calendarioLetivoCreate, {
          body: {
            nome: name,
            ano: year,
            campus: { id: campus },
            ofertaFormacao: { id: trainingOffer },
          },
        });
      } catch (e) {
        console.error(`Erro: ${e}`);
      }
    },
    async putCalendar(
      id: string,
      name: string,
      year: number,
      campus: string,
      trainingOffer: string
    ): Promise<void> {
      try {
        await getApiClient().call(calendarioLetivoUpdate, {
          path: {
            id,
          },
          body: {
            nome: name,
            ano: year,
            campus: { id: campus },
            ofertaFormacao: { id: trainingOffer },
          },
        });
      } catch (e) {
        console.error(`Erro: ${e}`);
      }
    },

    async deleteCalendar(id: string): Promise<void> {
      try {
        await getApiClient().call(calendarioLetivoDeleteOneById, {
          path: {
            id,
          },
        });
      } catch (e) {
        console.error(`Erro: ${e}`);
      }
    },
  },
  // Steps (etapas — now managed via bulk replace on calendar)
  steps: {
    async getSteps(calendarId: string): Promise<CalendarEvent[]> {
      const remodelSteps: Array<CalendarEvent> = [];

      try {
        const steps = await getApiClient().call(calendarioLetivoEtapaFindAll, {
          path: {
            calendarioLetivoId: calendarId,
          },
        });

        for (let i = 0; i < steps.data!.length; i++) {
          const step: CalendarEvent = {
            id: steps.data[i]!.id,
            name: `${steps.data[i]!.nomeEtapa}`,
            startDate: steps.data[i]!.dataInicio,
            endDate: steps.data[i]!.dataTermino,
            color: null,
            calendar: { id: calendarId },
          };
          remodelSteps.push(step);
        }
      } catch (e) {
        console.error(`Erro: ${e}`);
      }

      return remodelSteps;
    },
    async getStepByName(name: string, calendarId: string): Promise<any> {
      try {
        const getStep = await getApiClient()
          .call(calendarioLetivoEtapaFindAll, {
            path: {
              calendarioLetivoId: calendarId,
            },
          })
          .then((res: any) => res.data);

        const findStep = getStep.find(
          (step: any) =>
            step.numero === Number(name.replace(/\D/g, '')) &&
            step.calendario.id === calendarId
        );
        return findStep ? findStep : null;
      } catch (e) {
        console.error(`Erro: ${e}`);
        return null;
      }
    },

    // Etapas are now managed via bulk replace — individual CRUD is no longer available.
    // To add/update/remove a single etapa, fetch all, mutate locally, then bulk replace.
    async bulkReplaceSteps(
      calendarId: string,
      etapas: Array<{
        ofertaFormacaoPeriodoEtapaId: string;
        dataInicio: string;
        dataTermino: string;
      }>
    ): Promise<void> {
      try {
        await getApiClient().call(calendarioLetivoEtapaBulkReplace, {
          path: { calendarioLetivoId: calendarId },
          body: { etapas },
        });
      } catch (e) {
        console.error(`Erro bulkReplaceSteps: `, e);
      }
    },
  },

  // Events (now calendarioAgendamento)
  events: {
    async getEvents(calendarId: string): Promise<CalendarEvent[]> {
      const remodelEvents: Array<CalendarEvent> = [];

      try {
        const result = await getApiClient().call(
          consultaOcorrenciasPorData,
          {
            query: {
              dateStart: '2000-01-01',
              dateEnd: '2100-12-31',
              tipo: 'EVENTO',
            },
          }
        );

        for (const ocorrencia of result.ocorrencias) {
          const event: CalendarEvent = {
            id: ocorrencia.id,
            name: `${ocorrencia.nome}`,
            color: ocorrencia.cor ?? null,
            startDate: ocorrencia.dataInicio,
            endDate: ocorrencia.dataFim!,
            calendar: { id: calendarId },
          };
          remodelEvents.push(event);
        }
      } catch (e) {
        console.error(`Erro: ${e}`);
      }

      return remodelEvents;
    },
    async getEventByName(name: string, _calendarId: string): Promise<CalendarEvent | null> {
      try {
        const result = await getApiClient().call(
          consultaOcorrenciasPorData,
          {
            query: {
              dateStart: '2000-01-01',
              dateEnd: '2100-12-31',
              tipo: 'EVENTO',
            },
          }
        );

        const findEvent = result.ocorrencias.find(
          (event: CalendarioAgendamentoFindOneOutputDto) => event.id === name || event.nome === name
        );

        return findEvent
          ? {
            id: findEvent.id,
            name: `${findEvent.nome}`,
            color: findEvent.cor ?? null,
            startDate: findEvent.dataInicio,
            endDate: findEvent.dataFim!,
          }
          : null;
      } catch (e) {
        console.error(`Erro: ${e}`);
        return null;
      }
    },
    async postEvent(
      name: string,
      color: string,
      start: { date: string; hour?: string },
      end: { date: string; hour?: string },
      calendarId: string,
      localArray?: CalendarEvent[]
    ): Promise<CalendarEvent | null> {
      try {
        const userTz = dayjs.tz.guess();

        const hasHours = !!start.hour && !!end.hour;

        const formattedDates = {
          startDate: start.hour
            ? dayjs(`${start.date} ${start.hour}:00`).tz(userTz).format()
            : dayjs(`${start.date} 00:00:00`).tz(userTz).format(),
          endDate: end.hour
            ? dayjs(`${end.date} ${end.hour}:00`).tz(userTz).format()
            : dayjs(`${end.date} 00:00:00`).tz(userTz).format(),
        };

        const createdEvent = await getApiClient().call(
          calendarioAgendamentoCreate,
          {
            body: {
              tipo: "EVENTO",
              nome: name,
              cor: color,
              diaInteiro: !hasHours,
              dataInicio: formattedDates.startDate,
              dataFim: formattedDates.endDate,
              horarioInicio: start.hour,
              horarioFim: end.hour,
              calendariosLetivos: [{ id: calendarId }],
            },
          }
        );

        const newEvent: CalendarEvent = {
          id: createdEvent.id,
          name,
          color,
          startDate: formattedDates.startDate,
          endDate: formattedDates.endDate,
          calendar: { id: calendarId },
        };

        if (localArray && !localArray.some(e => e.id === newEvent.id)) {
          localArray.push(newEvent);
        }

        return newEvent;
      } catch (e) {
        console.error(`Erro: ${e}`);
        return null;
      }
    },
    async putEvent(
      event: CalendarEvent,
      localArray?: CalendarEvent[]
    ): Promise<void> {
      try {
        await getApiClient().call(calendarioAgendamentoUpdate, {
          path: { id: event.id },
          body: {
            nome: event.name,
            cor: event.color,
            dataInicio: event.startDate,
            dataFim: event.endDate,
            calendariosLetivos: event.calendar?.id
              ? [{ id: event.calendar.id }]
              : undefined,
          },
        });

        if (localArray) {
          const index = localArray.findIndex(e => e.id === event.id);
          if (index !== -1) {
            localArray[index] = event;
          } else {
            localArray.push(event);
          }
        }
      } catch (e) {
        console.error('Erro updateEvent: ', e);
      }
    },
    async deleteEvent(id: string): Promise<void> {
      try {
        await getApiClient().call(calendarioAgendamentoDeleteOneById, {
          path: { id },
        });
      } catch (e) {
        console.error('Erro deleteEvent: ', e);
      }
    },
  },

  getAnyEventByName: async (
    name: string,
    calendarId: string,
    returnType?: 'id' | null
  ): Promise<any | string | null> => {
    try {
      const checkEvents = await calendarDataMethods.events.getEventByName(
        name,
        calendarId
      );

      if (checkEvents) {
        return returnType === 'id' ? checkEvents.id : checkEvents;
      }

      const checkSteps = await calendarDataMethods.steps.getStepByName(
        name,
        calendarId
      );

      if (checkSteps) {
        return returnType === 'id' ? checkSteps.id : checkSteps;
      }

      return null;
    } catch (e) {
      console.error(`Erro: ${e}`);
      return null;
    }
  },
};
