import { defineStore } from 'pinia';

export const useCalendarioFiltersStore = defineStore(
  'calendario-filters',
  () => {
    // Shared filters
    const anoLetivo = useState<number>('calendario:anoLetivo', () =>
      new Date().getFullYear()
    );
    const formacaoId = ref<string | null>(null);
    const calendarioId = ref<string | null>(null);
    const campusId = ref<string | null>(null);

    // Gestão de Calendários
    const gestaoCalendariosStatus = ref<string | null>(null);

    // Gestão de Eventos
    const gestaoEventosStatus = ref<string | null>(null);
    const gestaoEventosTipo = ref<string | null>(null);
    const gestaoEventosParticipantes = ref<string | null>(null);
    const gestaoEventosPeriodoInicio = ref<string | null>(null);
    const gestaoEventosPeriodoFim = ref<string | null>(null);
    const gestaoEventosCalendarioId = ref<string | null>(null);

    const searchQuery = ref('');

    function resetAll() {
      anoLetivo.value = new Date().getFullYear();
      formacaoId.value = null;
      calendarioId.value = null;
      campusId.value = null;
      gestaoCalendariosStatus.value = null;
      gestaoEventosStatus.value = null;
      gestaoEventosTipo.value = null;
      gestaoEventosParticipantes.value = null;
      gestaoEventosPeriodoInicio.value = null;
      gestaoEventosPeriodoFim.value = null;
      gestaoEventosCalendarioId.value = null;
      searchQuery.value = '';
    }

    function resetGestaoEventos() {
      gestaoEventosStatus.value = null;
      gestaoEventosTipo.value = null;
      gestaoEventosParticipantes.value = null;
      gestaoEventosPeriodoInicio.value = null;
      gestaoEventosPeriodoFim.value = null;
      gestaoEventosCalendarioId.value = null;
    }

    function resetGestaoCalendarios() {
      gestaoCalendariosStatus.value = null;
    }

    return {
      anoLetivo,
      formacaoId,
      calendarioId,
      campusId,
      searchQuery,
      gestaoCalendariosStatus,
      gestaoEventosStatus,
      gestaoEventosTipo,
      gestaoEventosParticipantes,
      gestaoEventosPeriodoInicio,
      gestaoEventosPeriodoFim,
      gestaoEventosCalendarioId,
      resetAll,
      resetGestaoEventos,
      resetGestaoCalendarios,
    };
  }
);
