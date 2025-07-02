// # IMPORT
import type { EtapaListData } from '@ladesa-ro/api-client-fetch';
import type { CalendarEvent } from './Types';

// # CODE

export const calendarDataMethods = {
  // Events
  // events: {
  //   async getEvents(calendarId?: string) {
  //     let remodelEvents: Array<CalendarEvent> = [];

  //     try {
  //       if (calendarId) {
  //         // Get steps in API
  //         const eventFilter: EventoListData = {
  //           filterCalendarioId: [calendarId],
  //         };
  //         const events =
  //           await getApiClient().eventos.eventoList(eventFilter).promise;

  //         // Remodel step object
  //         for (let i = 0; i < events.data!.length; i++) {
  //           const event: CalendarEvent = {
  //             name: `${events.data[i]!.nome}`,
  //             startDate: events.data[i]!.,
  //             endDate: events.data[i]!.dataTermino,
  //             color: events.data[i]!.cor,
  //           };
  //           remodelEvents.push(event);
  //         }
  //       }
  //     } catch (e) {
  //       console.log(`Erro: ${e}`);
  //     }

  //     return remodelEvents;
  //   },
  // },

  // Steps
  steps: {
    async getSteps(calendarId?: string): Promise<CalendarEvent[]> {
      let remodelSteps: Array<CalendarEvent> = [];

      try {
        if (calendarId) {
          // Get steps in API
          const stepFilter: EtapaListData = {
            filterCalendarioId: [calendarId],
          };
          const steps =
            await getApiClient().etapas.etapaList(stepFilter).promise;

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
        console.log(`Erro: ${e}`);
      }

      return remodelSteps;
    },
  },
};
