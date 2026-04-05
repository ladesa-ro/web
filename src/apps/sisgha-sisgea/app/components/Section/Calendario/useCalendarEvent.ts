import dayjs from 'dayjs';
import { ref, watch, type Ref } from 'vue';
import {
  calendarioLetivoEtapaFindAll,
  calendarioAgendamentoFindAll,
} from '@ladesa-ro/web.api.client';
import type {
  CalendarioLetivoEtapaFindOneOutputDto,
  CalendarioAgendamentoFindOneOutputDto,
} from '@ladesa-ro/web.api.client';
import type { CalendarEvent } from './Types';

export function useCalendarEvents(calendarId: Ref<string | undefined>) {
  const events = ref<CalendarEvent[]>([]);
  const isLoading = ref(false);

  const loadEvents = async () => {
    if (!calendarId.value) return;
    isLoading.value = true;
    try {
      const api = getApiClient();
      const id = calendarId.value;

      const [stepsRes, eventsRes] = await Promise.all([
        api.call(calendarioLetivoEtapaFindAll, {
          path: { calendarioLetivoId: id },
        }),
        api.call(calendarioAgendamentoFindAll, {
          query: {
            'filter.calendarioLetivo.id': [id],
            limit: 100,
          },
        }),
      ]);

      const steps: CalendarEvent[] = (stepsRes.data ?? []).map((s: CalendarioLetivoEtapaFindOneOutputDto) => ({
        id: s.id,
        name: s.nomeEtapa,
        startDate: s.dataInicio,
        endDate: s.dataTermino,
        color: null,
        calendar: { id },
      }));

      const evs: CalendarEvent[] = (eventsRes.data ?? []).map((o: CalendarioAgendamentoFindOneOutputDto) => ({
        id: o.id,
        name: o.nome ?? '',
        color: o.cor ?? null,
        startDate: o.dataInicio,
        endDate: o.dataFim ?? o.dataInicio,
        calendar: { id },
      }));

      events.value = Array.from(
        new Map([...steps, ...evs].map(e => [e.id, e])).values()
      ).sort(
        (a, b) => dayjs(a.startDate).valueOf() - dayjs(b.startDate).valueOf()
      );
    } finally {
      isLoading.value = false;
    }
  };

  watch(
    calendarId,
    async () => {
      await loadEvents();
    },
    { immediate: true }
  );

  return { events, isLoading, reload: loadEvents };
}
