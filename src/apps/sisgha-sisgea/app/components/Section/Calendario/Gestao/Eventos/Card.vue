<script lang="ts" setup>
import type { BadgeVariant } from '@ladesa-ro/web.ui';
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
  if (props.evento.tipo && TIPO_COLORS[props.evento.tipo])
    return TIPO_COLORS[props.evento.tipo];
  return '#6b7280';
});

const nome = computed(() => props.evento.nome ?? 'Sem nome');

function formatDateShort(iso: string): string {
  const date = new Date(iso + 'T00:00:00');
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatTime(t: string): string {
  return t?.slice(0, 5) ?? '';
}

const periodo = computed(() => {
  const { dataInicio, dataFim, diaInteiro, horarioInicio, horarioFim } =
    props.evento;

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
  return turmas.map(t => t.nome ?? t.id.substring(0, 8)).join(', ');
});

const professoresText = computed(() => {
  const perfis = props.evento.perfis;
  if (!perfis || perfis.length === 0) return null;
  return perfis
    .map(p => {
      if (p.usuario?.nome) return p.usuario.nome;
      return p.id.substring(0, 8);
    })
    .join(', ');
});

const locais = computed(() => {
  const ambientes = props.evento.ambientes;
  if (!ambientes || ambientes.length === 0) return null;
  return ambientes.map(a => a.nome ?? a.id.substring(0, 8)).join(', ');
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

const statusVariant = computed(() => {
  const s = props.evento.status;
  const map: Record<string, BadgeVariant> = {
    ATIVO: 'success',
    INATIVO: 'danger',
    RASCUNHO: 'warning',
  };
  return (s && map[s]) || 'neutral';
});

const timelineDrawerOpen = ref(false);
</script>

<template>
  <SectionCalendarioEventOcupado
    v-if="evento.detalhesOcultos"
    :horario-inicio="evento.horarioInicio"
    :horario-fim="evento.horarioFim"
    :ambientes="evento.ambientes"
  />

  <div
    v-else
    class="evento-card u-p-5 u-rounded-lg u-flex u-flex-col u-gap-3-5 u-h-full"
  >
    <div class="u-flex-1 u-flex u-justify-between u-items-center">
      <div
        class="evento-card__title u-flex u-gap-2 u-items-center u-font-medium u-text-lg"
      >
        <div
          class="evento-card__dot u-rounded-full u-shrink-0"
          :style="{ backgroundColor: dotColor }"
        />
        <h2 class="u-truncate">{{ nome }}</h2>
      </div>

      <div class="u-flex u-items-center u-gap-2 u-shrink-0 u-ml-2">
        <UIBadge v-if="statusLabel" :variant="statusVariant">
          {{ statusLabel }}
        </UIBadge>

        <button
          v-if="!evento.detalhesOcultos"
          type="button"
          class="evento-card__history-btn u-flex u-p-2 u-justify-center u-items-center u-rounded-lg"
          title="Histórico"
          @click.prevent="timelineDrawerOpen = true"
        >
          <IconsClock class="evento-card__history-icon" />
        </button>

        <UIButtonEdit @click.prevent="emit('edit', evento.id)" />
      </div>
    </div>

    <span class="evento-card__periodo u-text-sm">{{ periodo }}</span>

    <div class="evento-card__details u-flex u-flex-col u-gap-1-5 u-text-sm">
      <span v-if="turmasText"> Turmas: {{ turmasText }} </span>
      <span v-if="professoresText"> Professores: {{ professoresText }} </span>
    </div>

    <SectionCalendarioEventLocale v-if="locais" :locale="locais" />

    <SectionCalendarioTimelineAgendamentoTimelineDrawer
      v-model="timelineDrawerOpen"
      :identificador-externo="evento.identificadorExterno ?? null"
    />
  </div>
</template>

<style scoped>
.evento-card {
  border: 2px solid var(--ladesa-grey-color);
  transition:
    background-color var(--ui-duration-base) var(--ui-easing-standard),
    border-color var(--ui-duration-base) var(--ui-easing-standard),
    color var(--ui-duration-base) var(--ui-easing-standard);
}

.evento-card:hover {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 10%);
}

.evento-card__title {
  min-width: 0;
}

.evento-card__dot {
  width: 0.625rem;
  height: 0.625rem;
}

.evento-card__history-btn {
  transition: background-color var(--ui-duration-base) var(--ui-easing-standard);
}

.evento-card__history-btn:hover {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 30%);
}

.evento-card__history-icon {
  color: var(--ladesa-text-default-color);
  width: 1.25rem;
  height: 1.25rem;
}

.evento-card__periodo {
  color: var(--ladesa-text-default-color);
}

.evento-card__details {
  color: var(--ladesa-grey-color);
}
</style>
