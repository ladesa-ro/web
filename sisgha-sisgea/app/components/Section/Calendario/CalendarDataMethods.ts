// # IMPORT
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
    async putCalendar(
      id: string,
      name: string,
      year: number,
      campus: string,
      trainingOffer: string
    ): Promise<void> {
      try {
        await getApiClient().calendariosLetivos.calendarioLetivoUpdateOneById({
          id,
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

    async deleteCalendar(id: string): Promise<void> {
      try {
        await getApiClient().calendariosLetivos.calendarioLetivoDeleteOneById({
          id,
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
            dataInicio: dayjs(start.date).format('YYYY-MM-DD'),
            dataTermino: dayjs(end.date).format('YYYY-MM-DD'),
          },
        });
      } catch (e) {
        console.error(`Erro: ${e}`);
      }
    },
    async putStep(step: CalendarEvent): Promise<void> {
      try {
        await getApiClient().etapas.etapaUpdateOneById({
          id: step.id,
          requestBody: {
            numero: Number(step.name.replace(/\D/g, '')),
            cor: step.color,
            calendario: { id: step.calendar!.id },
            dataInicio: step.startDate,
            dataTermino: step.endDate,
          },
        });
      } catch (e) {
        console.error('Erro putStep: ', e);
      }
    },
    async deleteStep(id: string): Promise<void> {
      try {
        await getApiClient().etapas.etapaDeleteOneById({ id });
      } catch (e) {
        console.error('Erro deleteStep: ', e);
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
            locale: events.data[i]?.local,
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
        // buscamos eventos no calendário (o filter ajuda a reduzir resultados)
        const getEvents = await getApiClient()
          .eventos.eventoList({
            filterCalendarioId: [calendarId],
            search: `${name}`,
          })
          .promise.then(res => res.data);

        // Aceita se o name for id ou nome
        const findEvent = getEvents.find(
          (event: any) =>
            (event.id === name || event.nome === name) &&
            event.calendario.id === calendarId
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
    async putEvent(event: CalendarEvent): Promise<void> {
      try {
        await getApiClient().eventos.eventoUpdateOneById({
          id: event.id,
          requestBody: {
            nome: event.name,
            cor: event.color,
            data_inicio: event.startDate,
            data_fim: event.endDate,
            calendario: { id: event.calendar!.id },
          },
        });
      } catch (e) {
        console.error('Erro updateEvent: ', e);
      }
    },
    async deleteEvent(id: string): Promise<void> {
      try {
        await getApiClient().eventos.eventoDeleteOneById({ id });
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
