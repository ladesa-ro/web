<script lang="ts" setup>
import type { TurmaEventoMergedItem } from '~/composables/useTurmaEventosState';

defineProps<{
  eventos: TurmaEventoMergedItem[];
  disabled?: boolean;
}>();

const emit = defineEmits<{
  create: [];
  edit: [id: string];
  remove: [id: string];
}>();

const TIPO_LABELS: Record<string, { label: string; color: string }> = {
  EVENTO: { label: 'Evento', color: 'bg-ldsa-blue' },
  AULA: { label: 'Aula', color: 'bg-ldsa-green-1' },
  INDISPONIBILIDADE: { label: 'Indisponibilidade', color: 'bg-ldsa-red' },
  RESERVA: { label: 'Reserva', color: 'bg-ldsa-yellow' },
};

function getTipoInfo(evento: TurmaEventoMergedItem): { label: string; color: string } {
  const status = (evento.data as Record<string, unknown>).status as string | undefined;
  const tipo = (evento.data as Record<string, unknown>).tipo as string | undefined;
  if (tipo && TIPO_LABELS[tipo]) return TIPO_LABELS[tipo]!;
  if (status && TIPO_LABELS[status]) return TIPO_LABELS[status]!;
  return TIPO_LABELS.EVENTO!;
}

function getCorHex(evento: TurmaEventoMergedItem): string {
  return ((evento.data as Record<string, unknown>).cor as string) ?? '#2f9e41';
}

function getNome(evento: TurmaEventoMergedItem): string {
  return ((evento.data as Record<string, unknown>).nome as string) ?? 'Sem nome';
}

function formatPeriodo(evento: TurmaEventoMergedItem): string {
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
  <div class="flex flex-col">
    <div
      v-for="evento in eventos"
      :key="evento.id"
      class="flex flex-col gap-0.5 border-b border-ldsa-grey/30 px-2 py-2.5"
      :class="{ 'opacity-50': evento.isPendingDelete }"
    >
      <div class="flex items-center gap-2">
        <span
          class="inline-block size-2 shrink-0 rounded-full"
          :style="{ backgroundColor: getCorHex(evento) }"
        />

        <span class="flex-1 truncate text-xs font-medium text-ldsa-text-default">
          {{ getNome(evento) }}
        </span>

        <span
          class="shrink-0 rounded px-1.5 py-0.5 text-[9px] font-semibold text-white"
          :class="getTipoInfo(evento).color"
        >
          {{ getTipoInfo(evento).label }}
        </span>

        <template v-if="evento.isLocal">
          <span class="shrink-0 rounded bg-ldsa-grey/20 px-1.5 py-0.5 text-[9px] font-medium text-ldsa-grey">
            pendente
          </span>
        </template>

        <button
          v-if="!evento.isPendingDelete"
          type="button"
          class="shrink-0 text-ldsa-grey hover:text-ldsa-text-default disabled:opacity-40"
          :disabled="disabled"
          @click="emit('edit', evento.id)"
        >
          <IconsEdit class="size-3.5" />
        </button>

        <button
          v-if="!evento.isPendingDelete"
          type="button"
          class="shrink-0 text-ldsa-grey hover:text-ldsa-red disabled:opacity-40"
          :disabled="disabled"
          @click="emit('remove', evento.id)"
        >
          <IconsExclude class="size-3.5" />
        </button>
      </div>

      <span class="pl-4 text-[10px] text-ldsa-grey">
        {{ formatPeriodo(evento) }}
      </span>
    </div>
  </div>
</template>
