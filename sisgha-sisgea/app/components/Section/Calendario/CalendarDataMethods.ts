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
  },

  getAnyEventByName: async (
    name: string,
    calendarId: string,
    returnType?: 'id' | null
  ): Promise<any | string> => {
    try {
      let returnObject = { id: ''};

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
