// # IMPORT
import dayjs from 'dayjs';
import type { CalendarData, CalendarEvent } from './Types';
import customParseFormat from "dayjs/plugin/customParseFormat.js";

// # CODE
dayjs.extend(customParseFormat);

export const calendarDataMethods = {
  // Calendar
  calendar: {
    // TODO: Temp. Get Calendar Method
    async getCalendarById(
      calendarId: string,
      campus: string
    ): Promise<CalendarData> {
      let calendar: CalendarData = {
        id: '',
        name: '',
        year: null,
        trainingOffer: { id: '' },
        campus: { id: '' },
      };

      try {
        const getCalendar =
          await getApiClient().calendariosLetivos.calendarioLetivoList({
            filterCampusId: [campus],
          }).promise;

        const filterCalendar = getCalendar.data.find(
          item => item.id === calendarId
        );

        if (filterCalendar) {
          calendar = {
            id: filterCalendar!.id,
            name: filterCalendar!.nome,
            year: filterCalendar!.ano,
            trainingOffer: { id: filterCalendar!.ofertaFormacao.id },
            campus: { id: filterCalendar!.campus.id },
          };
        }
        return calendar;
      } catch (error) {
        console.error(`Erro: ${error}`);
        return calendar;
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
      } catch (error) {
        console.error('Erro: ', error);
        return null;
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
      } catch (error) {
        console.error('Erro: ', error);
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
        // String(
        //   dayjs(`${start.date}T${start.hour}`).format(
        //     'YYYY-MM-DD HH:mm:ss'
        //   )
        // )
        await getApiClient().eventos.eventoCreate({
          requestBody: {
            nome: name,
            rrule: '',
            cor: color,
            calendario: { id: calendarId },
            data_inicio: start.hour
              ? `${dayjs(start.date).format("YYYY-MM-DD")}T${dayjs(start.hour, "HH:mm").format("HH:mm:ss")}Z`
              : dayjs(start.date).format('YYYY-MM-DD'),
            data_fim: end.hour
              ? `${dayjs(end.date).format("YYYY-MM-DD")}T${dayjs(end.hour, "HH:mm").format("HH:mm:ss")}Z`
              : dayjs(end.date).format('YYYY-MM-DD'),
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
  },

  getAnyEventByName: async (
    name: string,
    calendarId: string,
    returnType?: 'id' | null
  ): Promise<any | string> => {
    try {
      let returnObject = { id: '' };

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
    } catch (error) {
      console.error('Erro: ', error);
      return {};
    }
  },
};
