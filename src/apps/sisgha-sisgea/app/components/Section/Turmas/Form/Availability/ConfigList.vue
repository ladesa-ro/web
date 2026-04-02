<script setup lang="ts">
interface ConfigItem {
  id?: string;
  data_inicio: string;
  data_fim?: string | null;
  identificador_externo_grade_horaria?: string | null;
  horarios: Array<{
    dia_semana: number;
    intervalos: Array<{ inicio: string; fim: string }>;
  }>;
}

const props = defineProps<{
  configs: ConfigItem[];
  pendingConfigs?: ConfigItem[];
  pendingDeactivationIds?: string[];
  isLoading?: boolean;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  'navigate-to': [dataInicio: string];
  'deactivate': [configId: string];
  'undo-deactivation': [configId: string];
  'undo-pending': [dataInicio: string];
}>();

function getTipo(config: ConfigItem): 'permanente' | 'temporario' {
  return config.data_fim ? 'temporario' : 'permanente';
}

const dayjs = useDayJs();
const today = dayjs().format('YYYY-MM-DD');

function formatDate(iso: string): string {
  return dayjs(iso).format('DD/MM/YYYY');
}

function getLabel(config: ConfigItem): string {
  const tipo = getTipo(config);
  const inicio = config.data_inicio;
  const fim = config.data_fim;

  if (tipo === 'permanente') {
    return inicio <= today
      ? `Permanente desde ${formatDate(inicio)}`
      : `Permanente a partir de ${formatDate(inicio)}`;
  }

  if (fim! < today) {
    return `Temporário entre ${formatDate(inicio)} e ${formatDate(fim!)}`;
  }
  if (inicio <= today) {
    return `Temporário desde ${formatDate(inicio)} até ${formatDate(fim!)}`;
  }
  return `Temporário a partir de ${formatDate(inicio)} até ${formatDate(fim!)}`;
}

function getHorariosCount(config: ConfigItem): number {
  return config.horarios.reduce((sum, dia) => sum + dia.intervalos.length, 0);
}

function getDiasCount(config: ConfigItem): number {
  return config.horarios.filter(d => d.intervalos.length > 0).length;
}

function isMarkedForDeactivation(config: ConfigItem): boolean {
  return !!config.id && (props.pendingDeactivationIds ?? []).includes(config.id);
}

const activeConfigs = computed(() =>
  props.configs.filter(c => !isMarkedForDeactivation(c)),
);

const deactivatingConfigs = computed(() =>
  props.configs.filter(c => isMarkedForDeactivation(c)),
);
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- Pending new configs (novo arranjo) -->
    <div v-if="(pendingConfigs && pendingConfigs.length > 0) || deactivatingConfigs.length > 0" class="flex flex-col gap-2">
      <h3 class="text-xs font-semibold text-ldsa-text-default uppercase tracking-wide">
        Novo arranjo
      </h3>

      <!-- Pending additions -->
      <div
        v-for="config in pendingConfigs"
        :key="`pending-${config.data_inicio}`"
        class="flex items-center justify-between w-full rounded-lg px-3 py-2.5 text-xs font-medium border-2 border-dashed cursor-pointer transition-colors"
        :class="getTipo(config) === 'permanente'
          ? 'border-ldsa-green-2/40 bg-ldsa-green-2/5 text-ldsa-green-2 hover:bg-ldsa-green-2/10'
          : 'border-ldsa-blue/40 bg-ldsa-blue/5 text-ldsa-blue hover:bg-ldsa-blue/10'"
        @click="emit('navigate-to', config.data_inicio)"
      >
        <span class="flex-1 min-w-0">
          {{ getLabel(config) }}
          <span class="opacity-60">({{ getDiasCount(config) }} dias, {{ getHorariosCount(config) }} horários)</span>
        </span>

        <button
          :disabled="disabled"
          class="shrink-0 p-1 rounded opacity-60 hover:opacity-100 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
          title="Desfazer"
          @click.stop="emit('undo-pending', config.data_inicio)"
        >
          <IconsExclude class="w-3.5 h-3.5" />
        </button>
      </div>

      <!-- Pending deactivations -->
      <div
        v-for="config in deactivatingConfigs"
        :key="`deact-${config.id}`"
        class="flex items-center justify-between w-full rounded-lg px-3 py-2.5 text-xs font-medium border-2 border-dashed border-ldsa-red/40 bg-ldsa-red/5 text-ldsa-red/70 line-through cursor-pointer transition-colors hover:bg-ldsa-red/10"
        @click="emit('navigate-to', config.data_inicio)"
      >
        <span class="flex-1 min-w-0">
          {{ getLabel(config) }}
          <span class="opacity-60 no-underline">(será desativada)</span>
        </span>

        <button
          :disabled="disabled"
          class="shrink-0 p-1 rounded opacity-60 hover:opacity-100 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed no-underline"
          title="Desfazer desativação"
          @click.stop="emit('undo-deactivation', config.id!)"
        >
          <IconsExclude class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>

    <!-- Active configs (servidor) -->
    <div class="flex flex-col gap-2">
      <h3 class="text-xs font-semibold text-ldsa-text-default uppercase tracking-wide">
        Configurações ativas
      </h3>

      <UILoading v-if="isLoading" />

      <div v-else-if="activeConfigs.length === 0" class="text-sm text-ldsa-grey text-center py-3">
        Nenhuma configuração ativa.
      </div>

      <div
        v-for="config in activeConfigs"
        v-else
        :key="config.data_inicio"
        class="flex items-center justify-between w-full rounded-lg px-3 py-2.5 text-xs font-medium cursor-pointer transition-colors"
        :class="getTipo(config) === 'permanente'
          ? 'bg-ldsa-green-2/10 text-ldsa-green-2 hover:bg-ldsa-green-2/20'
          : 'bg-ldsa-blue/10 text-ldsa-blue hover:bg-ldsa-blue/20'"
        @click="emit('navigate-to', config.data_inicio)"
      >
        <span class="flex-1 min-w-0">
          {{ getLabel(config) }}
          <span class="opacity-60">({{ getDiasCount(config) }} dias, {{ getHorariosCount(config) }} horários)</span>
        </span>

        <button
          v-if="config.id"
          :disabled="disabled"
          class="shrink-0 p-1 rounded opacity-60 hover:opacity-100 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
          title="Desativar configuração"
          @click.stop="emit('deactivate', config.id!)"
        >
          <IconsExclude class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  </div>
</template>
