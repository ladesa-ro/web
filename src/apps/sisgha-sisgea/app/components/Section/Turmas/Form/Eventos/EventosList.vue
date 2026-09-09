<script lang="ts" setup>
import type { AgendamentoMergedItem } from '~/composables/useAgendamentosState';

defineProps<{
  eventos: AgendamentoMergedItem[];
  disabled?: boolean;
}>();

const emit = defineEmits<{
  create: [];
  edit: [id: string];
  remove: [id: string];
}>();

const TIPO_LABELS: Record<string, { label: string; color: string }> = {
  EVENTO: { label: 'Evento', color: 'evento-badge--blue' },
  AULA: { label: 'Aula', color: 'evento-badge--green' },
  INDISPONIBILIDADE: { label: 'Indisponibilidade', color: 'evento-badge--red' },
  RESERVA: { label: 'Reserva', color: 'evento-badge--yellow' },
};

function getTipoInfo(evento: AgendamentoMergedItem): {
  label: string;
  color: string;
} {
  const status = (evento.data as Record<string, unknown>).status as
    | string
    | undefined;
  const tipo = (evento.data as Record<string, unknown>).tipo as
    | string
    | undefined;
  if (tipo && TIPO_LABELS[tipo]) return TIPO_LABELS[tipo]!;
  if (status && TIPO_LABELS[status]) return TIPO_LABELS[status]!;
  return TIPO_LABELS.EVENTO!;
}

function getCorHex(evento: AgendamentoMergedItem): string {
  return ((evento.data as Record<string, unknown>).cor as string) ?? '#2f9e41';
}

function getNome(evento: AgendamentoMergedItem): string {
  return (
    ((evento.data as Record<string, unknown>).nome as string) ?? 'Sem nome'
  );
}

function formatPeriodo(evento: AgendamentoMergedItem): string {
  const d = evento.data as Record<string, unknown>;
  const dataInicio = d.dataInicio as string;
  const dataFim = d.dataFim as string | null | undefined;
  const diaInteiro = d.diaInteiro as boolean;
  const horarioInicio = d.horarioInicio as string | undefined;
  const horarioFim = d.horarioFim as string | undefined;

  const fmtDate = (iso: string) => {
    const date = new Date(iso + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });
  };

  const fmtTime = (t: string) => t?.slice(0, 5) ?? '';

  if (dataFim && dataFim !== dataInicio) {
    return `${fmtDate(dataInicio)} - ${fmtDate(dataFim)}`;
  }

  if (diaInteiro) {
    return fmtDate(dataInicio);
  }

  return `${fmtDate(dataInicio)} ${fmtTime(horarioInicio ?? '')} - ${fmtTime(horarioFim ?? '')}`;
}
</script>

<template>
  <div class="u-flex u-flex-col">
    <div
      v-for="evento in eventos"
      :key="evento.id"
      class="evento-row u-flex u-flex-col u-gap-0-5 u-px-2 u-py-2-5"
      :class="{ 'evento-row--pending-delete': evento.isPendingDelete }"
    >
      <div class="u-flex u-items-center u-gap-2">
        <span
          class="evento-dot u-shrink-0 u-rounded-full"
          :style="{ backgroundColor: getCorHex(evento) }"
        />

        <span class="evento-name u-flex-1 u-truncate u-text-xs u-font-medium">
          {{ getNome(evento) }}
        </span>

        <span
          class="evento-badge u-shrink-0 u-rounded-sm u-px-1-5 u-py-0-5 u-font-semibold"
          :class="getTipoInfo(evento).color"
        >
          {{ getTipoInfo(evento).label }}
        </span>

        <template v-if="evento.isLocal">
          <span
            class="evento-badge-pending u-shrink-0 u-rounded-sm u-px-1-5 u-py-0-5 u-font-medium"
          >
            pendente
          </span>
        </template>

        <button
          v-if="!evento.isPendingDelete"
          type="button"
          class="evento-action u-shrink-0"
          :disabled="disabled"
          @click="emit('edit', evento.id)"
        >
          <IconsEdit class="evento-action-icon" />
        </button>

        <button
          v-if="!evento.isPendingDelete"
          type="button"
          class="evento-action evento-action--danger u-shrink-0"
          :disabled="disabled"
          @click="emit('remove', evento.id)"
        >
          <IconsExclude class="evento-action-icon" />
        </button>
      </div>

      <span class="evento-period u-pl-4">
        {{ formatPeriodo(evento) }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.evento-row {
  border-bottom: 1px solid rgb(from var(--ladesa-grey-color) R G B / 30%);
}

.evento-row--pending-delete {
  opacity: 0.5;
}

.evento-dot {
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
}

.evento-name {
  color: var(--ladesa-text-default-color);
}

.evento-badge {
  font-size: 0.5625rem;
  color: var(--ladesa-white-color);
}

.evento-badge--blue {
  background-color: var(--ladesa-blue-color);
}

.evento-badge--green {
  background-color: var(--ladesa-green-1-color);
}

.evento-badge--red {
  background-color: var(--ladesa-red-color);
}

.evento-badge--yellow {
  background-color: var(--ladesa-yellow-color);
}

.evento-badge-pending {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 20%);
  font-size: 0.5625rem;
  color: var(--ladesa-grey-color);
}

.evento-action {
  color: var(--ladesa-grey-color);
}

.evento-action:hover {
  color: var(--ladesa-text-default-color);
}

.evento-action:disabled {
  opacity: 0.4;
}

.evento-action--danger:hover {
  color: var(--ladesa-red-color);
}

.evento-action-icon {
  width: 0.875rem;
  height: 0.875rem;
}

.evento-period {
  font-size: 0.625rem;
  color: var(--ladesa-grey-color);
}
</style>
