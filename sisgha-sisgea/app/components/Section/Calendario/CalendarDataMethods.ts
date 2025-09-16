// # IMPORT
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
import type { CalendarData, CalendarEvent } from './Types';
import { useApiContext } from '../../API/Context/setup-context';

// # CODE
dayjs.extend(customParseFormat);
dayjs.extend(timezone);
dayjs.extend(utc);

export const calendarDataMethods = {
  // Check
  check: {
    validHour: async (hour: string | null | undefined): Promise<boolean> => {
      try {
        if (!hour) return true;

        const trimHour = String(hour).trim();

        if (trimHour.length !== 5) return false;
        else {
          if (trimHour[2] !== ':') return false;
          else {
            const [_hour, minutes] = trimHour.split(':');

            if (isNaN(Number(_hour)) || isNaN(Number(minutes))) return false;
            else {
              if (
                (Number(_hour) < 0 || Number(_hour) > 23) &&
                (Number(minutes) < 0 || Number(minutes) > 59)
              )
                return false;
              else return true;
            }
          }
        }
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
        const getCalendar =
          await getApiClient().calendariosLetivos.calendarioLetivoFindOneById({
            id: calendarId,
          });

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
        const getCalendar =
          await getApiClient().calendariosLetivos.calendarioLetivoList({
            filterCampusId: [campus],
            filterOfertaFormacaoId: [trainingOffer],
            search: name,
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
        await getApiClient().calendariosLetivos.calendarioLetivoCreate({
          requestBody: {
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
  },
  // Steps
  steps: {
    async getSteps(calendarId: string): Promise<CalendarEvent[]> {
      let remodelSteps: Array<CalendarEvent> = [];

      try {
        const steps = await getApiClient().etapas.etapaList({
          filterCalendarioId: [calendarId],
        }).promise;

        for (let i = 0; i < steps.data!.length; i++) {
          const step: CalendarEvent = {
            id: steps.data[i]!.id,
            name: `${steps.data[i]!.numero}° Etapa`,
            startDate: steps.data[i]!.dataInicio,
            endDate: steps.data[i]!.dataTermino,
            color: steps.data[i]!.cor,
            calendar: { id: calendarId }
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
          .etapas.etapaList({
            search: `${name.replace(/\D/g, '')}`,
          })
          .promise.then(res => res.data);

        const findStep = getStep.find(
          step =>
            step.numero === Number(name.replace(/\D/g, '')) &&
            step.calendario.id === calendarId
        );
        return findStep ? findStep : null;
      } catch (e) {
        console.error(`Erro: ${e}`);
        return null;
      }
    },
    async postStep(
      num: number,
      color: string,
      start: { date: string },
      end: { date: string },
      calendarId: string
    ): Promise<void> {
      try { 
        await getApiClient().etapas.etapaCreate({
          requestBody: {
            numero: num,
            cor: color,
            calendario: { id: calendarId },
            dataInicio: dayjs(start.date).format("YYYY-MM-DD"),
            dataTermino: dayjs(end.date).format("YYYY-MM-DD"),
          },
        });
      } catch (e) {
        console.error(`Erro: ${e}`);
      }
    },
  },

  // Events
  events: {
    async getEvents(calendarId: string): Promise<CalendarEvent[]> {
      let remodelEvents: Array<CalendarEvent> = [];

      try {
        const events = await getApiClient().eventos.eventoList({
          filterCalendarioId: [calendarId],
        }).promise;

        for (let i = 0; i < events.data!.length; i++) {
          const event: CalendarEvent = {
            id: events.data[i]!.id,
            name: `${events.data[i]!.nome}`,
            color: events.data[i]!.cor,
            startDate: events.data[i]!.data_inicio!,
            endDate: events.data[i]!.data_fim!,
            calendar: { id: calendarId },
            locale: events.data[i]?.local
          };
          remodelEvents.push(event);
        }
      } catch (e) {
        console.error(`Erro: ${e}`);
      }

      return remodelEvents;
    },
    async getEventByName(name: string, calendarId: string): Promise<any> {
      try {
        const getEvents = await getApiClient()
          .eventos.eventoList({
            search: `${name}`,
          })
          .promise.then(res => res.data);

        const findEvent = getEvents.find(
          event => event.id === name && event.calendario.id === calendarId
        );
        return findEvent ? findEvent : null;
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
      calendarId: string
    ): Promise<void> {
      try {
        const userTz = dayjs.tz.guess();

        const formattedDates = {
          startDate: start.hour
            ? dayjs(`${start.date} ${start.hour}:00`, 'YYYY-MM-DD HH:mm:ss')
                .tz(userTz)
                .format()
            : dayjs(`${start.date} 00:00:00`, 'YYYY-MM-DD HH:mm:ss')
                .tz(userTz)
                .format(),
          endDate: end.hour
            ? dayjs(`${end.date} ${end.hour}:00`, 'YYYY-MM-DD HH:mm:ss')
                .tz(userTz)
                .format()
            : dayjs(`${end.date} 00:00:00`, 'YYYY-MM-DD HH:mm:ss')
                .tz(userTz)
                .format(),
        };

        await getApiClient().eventos.eventoCreate({
          requestBody: {
            nome: name,
            rrule: '',
            cor: color,
            calendario: { id: calendarId },
            data_inicio: formattedDates.startDate,
            data_fim: formattedDates.endDate,
          },
        });
      } catch (e) {
        console.error(`Erro: ${e}`);
      }
    },
  },

  getAnyEventByName: async (
    name: string,
    calendarId: string,
    returnType?: 'id' | null
  ): Promise<any | string> => {
    try {
      const event = async (): Promise<any> => {
        const checkEvents = await calendarDataMethods.events.getEventByName(
          name!,
          calendarId!
        );

        if (checkEvents) return checkEvents;
        else {
          const checkSteps = await calendarDataMethods.steps.getStepByName(
            name!,
            calendarId!
          );
          if (checkSteps) return checkSteps;
          else return null;
        }
      };

      if (returnType === 'id') return event;
    } catch (e) {
      console.error(`Erro: ${e}`);
      return {};
    }
  },
};
