<script lang="ts" setup>
import type { CalendarioAgendamentoFindOneOutputDto } from '@ladesa-ro/web.api.client';

const props = defineProps<{
  evento: CalendarioAgendamentoFindOneOutputDto;
}>();

const emit = defineEmits<{
  edit: [id: string];
}>();

const TIPO_COLORS: Record<string, string> = {
  EVENTO: '#f59e0b',
  AULA: '#22c55e',
  INDISPONIBILIDADE: '#ef4444',
  RESERVA: '#3b82f6',
};

const dotColor = computed(() => {
  if (props.evento.cor) return props.evento.cor;
  if (props.evento.tipo && TIPO_COLORS[props.evento.tipo]) return TIPO_COLORS[props.evento.tipo];
  return '#6b7280';
});

const nome = computed(() => props.evento.nome ?? 'Sem nome');

function formatDateShort(iso: string): string {
  const date = new Date(iso + 'T00:00:00');
  return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatTime(t: string): string {
  return t?.slice(0, 5) ?? '';
}

const periodo = computed(() => {
  const { dataInicio, dataFim, diaInteiro, horarioInicio, horarioFim } = props.evento;

  if (dataFim && dataFim !== dataInicio) {
    return `${formatDateShort(dataInicio)} - ${formatDateShort(dataFim)}`;
  }

  if (diaInteiro) {
    return formatDateShort(dataInicio);
  }

  return `${formatDateShort(dataInicio)} ${formatTime(horarioInicio)} - ${formatTime(horarioFim)}`;
});

const turmasText = computed(() => {
  const turmas = props.evento.turmas;
  if (!turmas || turmas.length === 0) return null;
  return turmas.map((t) => t.nome ?? t.id.substring(0, 8)).join(', ');
});

const professoresText = computed(() => {
  const perfis = props.evento.perfis;
  if (!perfis || perfis.length === 0) return null;
  return perfis
    .map((p) => {
      if (p.usuario?.nome) return p.usuario.nome;
      return p.id.substring(0, 8);
    })
    .join(', ');
});

const locais = computed(() => {
  const ambientes = props.evento.ambientes;
  if (!ambientes || ambientes.length === 0) return null;
  return ambientes.map((a) => a.nome ?? a.id.substring(0, 8)).join(', ');
});

const statusLabel = computed(() => {
  const s = props.evento.status;
  if (!s) return null;
  const map: Record<string, string> = {
    ATIVO: 'Ativo',
    INATIVO: 'Inativo',
    RASCUNHO: 'Rascunho',
  };
  return map[s] ?? s;
});

const statusClass = computed(() => {
  const s = props.evento.status;
  const map: Record<string, string> = {
    ATIVO: 'bg-green-100 text-green-700',
    INATIVO: 'bg-red-100 text-red-700',
    RASCUNHO: 'bg-yellow-100 text-yellow-700',
  };
  return s && map[s] ? map[s] : 'bg-gray-100 text-gray-600';
});
</script>

<template>
  <div
    class="p-5 rounded-lg border-2 border-ldsa-grey flex flex-col gap-3.5 hover:bg-ldsa-grey/10 h-full transition-colors"
  >
    <div class="flex-1 flex justify-between items-center">
      <div class="flex gap-2 items-center font-medium text-lg min-w-0">
        <div
          class="rounded-full w-2.5 h-2.5 shrink-0"
          :style="{ backgroundColor: dotColor }"
        />
        <h2 class="truncate">{{ nome }}</h2>
      </div>

      <div class="flex items-center gap-2 shrink-0 ml-2">
        <span
          v-if="statusLabel"
          class="rounded px-2 py-0.5 text-xs font-medium"
          :class="statusClass"
        >
          {{ statusLabel }}
        </span>

        <UIButtonEdit @click.prevent="emit('edit', evento.id)" />
      </div>
    </div>

    <span class="text-sm text-ldsa-text-default">{{ periodo }}</span>

    <div class="flex flex-col gap-1.5 text-sm text-ldsa-grey">
      <span v-if="turmasText">
        Turmas: {{ turmasText }}
      </span>
      <span v-if="professoresText">
        Professores: {{ professoresText }}
      </span>
    </div>

    <SectionCalendarioEventLocale
      v-if="locais"
      :locale="locais"
    />
  </div>
</template>
