// # IMPORT
import type { CalendarEvent } from './Types';

// # CODE

export const calendarDataMethods = {
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
    async getStepByName(e: string, calendarId: string): Promise<any> {
      try {
        const getStep = await getApiClient()
          .etapas.etapaList({
            search: `${e.replace(/\D/g, '')}`,
          })
          .promise.then(res => res.data);

        const findStep = getStep.find(
          step =>
            step.numero === Number(e.replace(/\D/g, '')) &&
            step.calendario.id === calendarId
        );
        return findStep ? findStep : {};
      } catch (error) {
        console.error('Erro: ', error);
        return {};
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
            name: `${events.data[i]!.nome}`,
            color: events.data[i]!.cor,
            // ALERT: The events in API dont have start and end dates
            startDate: '',
            endDate: '',
          };
          remodelEvents.push(event);
        }
      } catch (e) {
        console.error(`Erro: ${e}`);
      }

      return remodelEvents;
    },
    async getEventByName(e: string, calendarId: string): Promise<any> {
      try {
        const getEvents = await getApiClient()
          .eventos.eventoList({
            search: `${calendarId}`,
          })
          .promise.then(res => res.data);

        const findEvent = getEvents.find(event => event.id === e);
        return findEvent ? findEvent : {};
      } catch (error) {
        console.error('Erro: ', error);
        return {};
      }
    },
  },
};
