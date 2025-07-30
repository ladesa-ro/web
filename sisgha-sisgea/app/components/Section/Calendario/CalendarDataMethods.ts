// # IMPORT
import type { EtapaListData } from '@ladesa-ro/api-client-fetch';
import type { CalendarEvent } from './Types';

// # CODE

export const calendarDataMethods = {
  // Steps
  steps: {
    async getSteps(calendarId?: string): Promise<CalendarEvent[]> {
      let remodelSteps: Array<CalendarEvent> = [];

      try {
        if (calendarId) {
          // Get steps in API
          const steps =
            await getApiClient().etapas.etapaList({
            filterCalendarioId: [calendarId],
          }).promise;

          // Remodel step object
          for (let i = 0; i < steps.data!.length; i++) {
            const step: CalendarEvent = {
              name: `${steps.data[i]!.numero}° Etapa`,
              startDate: steps.data[i]!.dataInicio,
              endDate: steps.data[i]!.dataTermino,
              color: steps.data[i]!.cor,
            };
            remodelSteps.push(step);
          }
        }
      } catch (e) {
        console.error(`Erro: ${e}`);
      }

      return remodelSteps;
    },
  },

  // Events
  events: {
    async getEvents(calendarId?: string): Promise<CalendarEvent[]> {
      let remodelEvents: Array<CalendarEvent> = [];

      try {
        if (calendarId) {
          // Get events in API
          const events = await getApiClient().eventos.eventoList({
            filterCalendarioId: [calendarId],
          }).promise;

          // Remodel event object
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
        }
      } catch (e) {
        console.error(`Erro: ${e}`);
      }

      return remodelEvents;
    },
  },
};
