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

defineProps<{
  configs: ConfigItem[];
  isLoading?: boolean;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  'navigate-to': [dataInicio: string];
  'deactivate': [configId: string];
}>();

function getTipo(config: ConfigItem): 'permanente' | 'temporario' {
  return config.data_fim ? 'temporario' : 'permanente';
}

const dayjs = useDayJs();

function formatDate(iso: string): string {
  return dayjs(iso).format('DD/MM/YYYY');
}

function getHorariosCount(config: ConfigItem): number {
  return config.horarios.reduce((sum, dia) => sum + dia.intervalos.length, 0);
}

function getDiasCount(config: ConfigItem): number {
  return config.horarios.filter(d => d.intervalos.length > 0).length;
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center justify-between">
      <h3 class="text-xs font-semibold text-ldsa-text-default uppercase tracking-wide">
        Configurações ativas
      </h3>
    </div>

    <UILoading v-if="isLoading" />

    <div v-else-if="configs.length === 0" class="text-sm text-ldsa-grey text-center py-3">
      Nenhuma configuração ativa.
    </div>

    <div
      v-for="config in configs"
      v-else
      :key="config.data_inicio"
      class="flex items-center justify-between w-full rounded-lg px-3 py-2.5 text-xs font-medium cursor-pointer transition-colors"
      :class="getTipo(config) === 'permanente'
        ? 'bg-ldsa-green-2/10 text-ldsa-green-2 hover:bg-ldsa-green-2/20'
        : 'bg-ldsa-blue/10 text-ldsa-blue hover:bg-ldsa-blue/20'"
      @click="emit('navigate-to', config.data_inicio)"
    >
      <span class="flex-1 min-w-0">
        {{ getTipo(config) === 'permanente' ? 'Permanente' : 'Temporário' }}
        a partir de {{ formatDate(config.data_inicio) }}<template v-if="config.data_fim"> até {{ formatDate(config.data_fim) }}</template>
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
</template>
