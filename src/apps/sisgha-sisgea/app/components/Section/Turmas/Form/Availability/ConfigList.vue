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
  deactivate: [configId: string];
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
    return `Permanente (a partir de ${formatDate(inicio)})`;
  }

  if (fim! < today) {
    return `Temporário (entre ${formatDate(inicio)} - ${formatDate(fim!)})`;
  }
  if (inicio <= today) {
    return `Temporário (entre ${formatDate(inicio)} - ${formatDate(fim!)})`;
  }
  return `Temporário (entre ${formatDate(inicio)} - ${formatDate(fim!)})`;
}

function getHorariosCount(config: ConfigItem): number {
  return config.horarios.reduce((sum, dia) => sum + dia.intervalos.length, 0);
}

function getDiasCount(config: ConfigItem): number {
  return config.horarios.filter(d => d.intervalos.length > 0).length;
}

function isMarkedForDeactivation(config: ConfigItem): boolean {
  return (
    !!config.id && (props.pendingDeactivationIds ?? []).includes(config.id)
  );
}

const activeConfigs = computed(() =>
  props.configs.filter(c => !isMarkedForDeactivation(c))
);

const deactivatingConfigs = computed(() =>
  props.configs.filter(c => isMarkedForDeactivation(c))
);

const possuiPendencias = computed(() => {
  return (
    (props.pendingConfigs && props.pendingConfigs.length > 0) ||
    deactivatingConfigs.value.length > 0
  );
});
</script>

<template>
  <div class="u-flex u-flex-col u-gap-2">
    <!-- Active configs (servidor) -->
    <div class="u-flex u-flex-col u-gap-2">
      <h3
        v-if="possuiPendencias"
        class="config-group-title u-text-xs u-font-semibold"
      >
        Configurações pré-existentes
      </h3>

      <UILoading v-if="isLoading" />

      <div
        v-else-if="activeConfigs.length === 0"
        class="config-empty u-text-sm u-text-center u-py-3"
      >
        Nenhuma configuração ativa.
      </div>

      <div
        v-for="config in activeConfigs"
        v-else
        :key="config.data_inicio"
        class="config-row u-flex u-items-center u-justify-between u-w-full u-rounded-lg u-px-3 u-py-0-5 u-text-xs u-font-medium"
        :class="
          getTipo(config) === 'permanente'
            ? 'config-row--permanente'
            : 'config-row--temporario'
        "
        @click="emit('navigate-to', config.data_inicio)"
      >
        <span class="config-row__label u-flex-1">
          {{ getLabel(config) }}
        </span>

        <button
          v-if="config.id"
          :disabled="disabled"
          class="config-row__action u-shrink-0 u-p-1 u-rounded-sm"
          title="Desativar configuração"
          @click.stop="emit('deactivate', config.id!)"
        >
          <IconsExclude class="action-icon" />
        </button>
      </div>
    </div>

    <!-- Pending new configs (novo arranjo) -->
    <div v-if="possuiPendencias" class="u-flex u-flex-col u-gap-2">
      <h3 class="config-group-title u-text-xs u-font-semibold">Novo arranjo</h3>

      <!-- Pending additions -->
      <div
        v-for="config in pendingConfigs"
        :key="`pending-${config.data_inicio}`"
        class="config-row config-row--pending u-flex u-items-center u-justify-between u-w-full u-rounded-lg u-px-3 u-py-0-5 u-text-xs u-font-medium"
        :class="
          getTipo(config) === 'permanente'
            ? 'config-row--pending-permanente'
            : 'config-row--pending-temporario'
        "
        @click="emit('navigate-to', config.data_inicio)"
      >
        <span class="config-row__label u-flex-1">
          {{ getLabel(config) }}
        </span>

        <button
          :disabled="disabled"
          class="config-row__action u-shrink-0 u-p-1 u-rounded-sm"
          title="Desfazer"
          @click.stop="emit('undo-pending', config.data_inicio)"
        >
          <IconsExclude class="action-icon" />
        </button>
      </div>

      <!-- Pending deactivations -->
      <div
        v-for="config in deactivatingConfigs"
        :key="`deact-${config.id}`"
        class="config-row config-row--deactivating u-flex u-items-center u-justify-between u-w-full u-rounded-lg u-px-3 u-py-2-5 u-text-xs u-font-medium"
        @click="emit('navigate-to', config.data_inicio)"
      >
        <span class="config-row__label u-flex-1">
          {{ getLabel(config) }}
          <span class="config-row__note">(será desativada)</span>
        </span>

        <button
          :disabled="disabled"
          class="config-row__action config-row__action--no-underline u-shrink-0 u-p-1 u-rounded-sm"
          title="Desfazer desativação"
          @click.stop="emit('undo-deactivation', config.id!)"
        >
          <IconsExclude class="action-icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.config-group-title {
  color: var(--ladesa-text-default-color);
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.config-empty {
  color: var(--ladesa-grey-color);
}

.config-row {
  cursor: pointer;
  transition: background-color var(--ui-duration-base) var(--ui-easing-standard);
}

.config-row--permanente {
  background-color: rgb(from var(--ladesa-green-2-color) R G B / 10%);
  color: var(--ladesa-green-2-color);
}

.config-row--permanente:hover {
  background-color: rgb(from var(--ladesa-green-2-color) R G B / 20%);
}

.config-row--temporario {
  background-color: rgb(from var(--ladesa-blue-color) R G B / 10%);
  color: var(--ladesa-blue-color);
}

.config-row--temporario:hover {
  background-color: rgb(from var(--ladesa-blue-color) R G B / 20%);
}

.config-row--pending {
  border-style: dashed;
  border-width: 2px;
}

.config-row--pending-permanente {
  border-color: rgb(from var(--ladesa-green-2-color) R G B / 40%);
  background-color: rgb(from var(--ladesa-green-2-color) R G B / 5%);
  color: var(--ladesa-green-2-color);
}

.config-row--pending-permanente:hover {
  background-color: rgb(from var(--ladesa-green-2-color) R G B / 10%);
}

.config-row--pending-temporario {
  border-color: rgb(from var(--ladesa-blue-color) R G B / 40%);
  background-color: rgb(from var(--ladesa-blue-color) R G B / 5%);
  color: var(--ladesa-blue-color);
}

.config-row--pending-temporario:hover {
  background-color: rgb(from var(--ladesa-blue-color) R G B / 10%);
}

.config-row--deactivating {
  border-style: dashed;
  border-width: 2px;
  border-color: rgb(from var(--ladesa-red-color) R G B / 40%);
  background-color: rgb(from var(--ladesa-red-color) R G B / 5%);
  color: rgb(from var(--ladesa-red-color) R G B / 70%);
  text-decoration: line-through;
}

.config-row--deactivating:hover {
  background-color: rgb(from var(--ladesa-red-color) R G B / 10%);
}

.config-row__label {
  min-width: 0;
}

.config-row__note {
  opacity: 0.6;
  text-decoration: none;
}

.config-row__action {
  opacity: 0.6;
  transition: opacity var(--ui-duration-base) var(--ui-easing-standard);
}

.config-row__action:hover {
  opacity: 1;
}

.config-row__action:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.config-row__action--no-underline {
  text-decoration: none;
}

.action-icon {
  width: 0.875rem;
  height: 0.875rem;
}
</style>
