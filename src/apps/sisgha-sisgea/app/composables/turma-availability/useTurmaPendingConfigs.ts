import type { TurmaDisponibilidadeConfigInputDto } from '@ladesa-ro/web.api.client';
import { toDisplayFormat } from '~/utils/horarios';

export function useTurmaPendingConfigs() {
  const dayjs = useDayJs();

  const pendingConfigs = ref<Map<string, TurmaDisponibilidadeConfigInputDto>>(
    new Map()
  );
  const pendingDeactivations = ref<Set<string>>(new Set());

  const hasPendingSave = computed(
    () => pendingConfigs.value.size > 0 || pendingDeactivations.value.size > 0
  );

  function addPendingDeactivation(configId: string) {
    const newSet = new Set(pendingDeactivations.value);
    newSet.add(configId);
    pendingDeactivations.value = newSet;
  }

  function undoPendingDeactivation(configId: string) {
    const newSet = new Set(pendingDeactivations.value);
    newSet.delete(configId);
    pendingDeactivations.value = newSet;
  }

  function findPendingForWeek(
    weekSunday: string
  ): TurmaDisponibilidadeConfigInputDto | undefined {
    const exact = pendingConfigs.value.get(weekSunday);
    if (exact) return exact;

    const saturday = dayjs(weekSunday).add(6, 'day').format('YYYY-MM-DD');

    let best: TurmaDisponibilidadeConfigInputDto | undefined;
    for (const config of pendingConfigs.value.values()) {
      const configCoversWeek =
        config.data_inicio <= saturday &&
        (config.data_fim == null || config.data_fim >= weekSunday);

      if (configCoversWeek) {
        if (!best || config.data_inicio > best.data_inicio) {
          best = config;
        }
      }
    }
    return best;
  }

  function mapPendingToAvailability(
    pending: TurmaDisponibilidadeConfigInputDto
  ): Record<number, string[]> {
    const mapped: Record<number, string[]> = {};
    for (const dia of pending.horarios) {
      mapped[dia.dia_semana] = dia.intervalos.map(i =>
        toDisplayFormat(i.inicio)
      );
    }
    return mapped;
  }

  function addPendingConfig(config: TurmaDisponibilidadeConfigInputDto) {
    const newMap = new Map(pendingConfigs.value);
    newMap.set(config.data_inicio, config);
    pendingConfigs.value = newMap;
  }

  function undoPendingConfig(dataInicio: string) {
    const newMap = new Map(pendingConfigs.value);
    newMap.delete(dataInicio);
    pendingConfigs.value = newMap;
  }

  function clearAll() {
    pendingConfigs.value = new Map();
    pendingDeactivations.value = new Set();
  }

  return {
    pendingConfigs,
    pendingDeactivations,
    hasPendingSave,
    addPendingDeactivation,
    undoPendingDeactivation,
    findPendingForWeek,
    mapPendingToAvailability,
    addPendingConfig,
    undoPendingConfig,
    clearAll,
  };
}
