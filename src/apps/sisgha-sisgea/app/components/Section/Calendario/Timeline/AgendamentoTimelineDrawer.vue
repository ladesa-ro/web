<script lang="ts" setup>
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ApiError } from '@ladesa-ro/web.api.client';
import type { CalendarioAgendamentoLinhaDoTempoEntradaDto } from '@ladesa-ro/web.api.client';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

const props = defineProps<{
  modelValue: boolean;
  identificadorExterno: string | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const isOpen = ref(props.modelValue);

watch(
  () => props.modelValue,
  val => (isOpen.value = val)
);
watch(isOpen, val => emit('update:modelValue', val));

function onClose() {
  isOpen.value = false;
}

const agendamento = useCalendarioAgendamento();

const activeId = computed(() =>
  isOpen.value ? props.identificadorExterno : null
);

const timelineQuery = agendamento.linhaDoTempo(activeId, { suspend: false });

const versoesDesc = computed(() => {
  const versoes = timelineQuery.data.value?.versoes ?? [];
  return [...versoes].sort((a, b) => b.version - a.version);
});

const oldestVersion = computed(() =>
  versoesDesc.value.length > 0
    ? Math.min(...versoesDesc.value.map(v => v.version))
    : null
);

const errorStatus = computed(() => {
  const err = timelineQuery.error.value;
  if (err instanceof ApiError) return err.status;
  return null;
});

const FIELD_LABELS: Record<string, string> = {
  nome: 'Nome',
  cor: 'Cor',
  status: 'Status',
  dataInicio: 'Data de início',
  dataFim: 'Data de fim',
  diaInteiro: 'Dia inteiro',
  horarioInicio: 'Horário de início',
  horarioFim: 'Horário de fim',
  repeticao: 'Repetição',
  campus: 'Campus',
  colecao: 'Coleção',
  motivo: 'Motivo',
  turmas: 'Turmas',
  perfis: 'Professores',
  ambientes: 'Ambientes',
  calendariosLetivos: 'Calendários letivos',
  ofertasFormacao: 'Ofertas de formação',
  modalidades: 'Modalidades',
  diarios: 'Diários',
};

function fieldLabel(campo: string): string {
  return FIELD_LABELS[campo] ?? campo;
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'boolean') return value ? 'Sim' : 'Não';
  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    if (Array.isArray(value)) {
      if (value.length === 0) return '—';
      return value.map(item => formatValue(item)).join(', ');
    }
    if ('nome' in obj && obj.nome) return String(obj.nome);
    if ('id' in obj && obj.id) return String(obj.id).slice(0, 8);
    return JSON.stringify(obj);
  }
  return String(value);
}

function formatWhen(validFrom: string): string {
  return dayjs(validFrom).fromNow();
}

function authorLabel(
  entry: CalendarioAgendamentoLinhaDoTempoEntradaDto
): string {
  return entry.autorNome || 'sistema';
}
</script>

<template>
  <DialogSkeleton v-model="isOpen">
    <DialogModalBaseLayout
      v-if="isOpen"
      title="Linha do tempo"
      :close-button="true"
      :on-close="onClose"
      class="timeline-drawer-modal"
    >
      <div
        v-if="timelineQuery.isLoading.value"
        class="timeline-drawer__state u-py-8 u-text-center"
      >
        Carregando histórico...
      </div>

      <div
        v-else-if="errorStatus === 403"
        class="timeline-drawer__state u-py-8 u-text-center"
      >
        Você não tem permissão para ver o histórico deste agendamento.
      </div>

      <div
        v-else-if="errorStatus === 404"
        class="timeline-drawer__state u-py-8 u-text-center"
      >
        Este agendamento não possui histórico visível.
      </div>

      <div
        v-else-if="timelineQuery.isError.value"
        class="timeline-drawer__state u-py-8 u-text-center"
      >
        Não foi possível carregar o histórico deste agendamento.
      </div>

      <div
        v-else-if="versoesDesc.length === 0"
        class="timeline-drawer__state u-py-8 u-text-center"
      >
        Nenhum histórico encontrado.
      </div>

      <ol v-else class="u-flex u-flex-col u-gap-5">
        <li
          v-for="entry in versoesDesc"
          :key="entry.id"
          class="timeline-entry u-flex u-flex-col u-gap-2 u-pl-4 u-relative"
        >
          <span class="timeline-entry__dot u-absolute u-rounded-full" />

          <div class="u-flex u-items-center u-gap-2 u-flex-wrap">
            <span class="timeline-entry__version u-font-semibold">
              v{{ entry.version }}
            </span>

            <UIBadge v-if="entry.version === oldestVersion" variant="success">
              Criado
            </UIBadge>

            <span class="timeline-entry__meta u-text-sm">
              {{ authorLabel(entry) }} · {{ formatWhen(entry.validFrom) }}
            </span>
          </div>

          <p v-if="entry.motivo" class="timeline-entry__motivo u-text-sm">
            Motivo: {{ entry.motivo }}
          </p>

          <ul
            v-if="entry.mudancas.length > 0"
            class="timeline-entry__mudancas u-flex u-flex-col u-gap-1 u-text-sm"
          >
            <li v-for="(mudanca, idx) in entry.mudancas" :key="idx">
              <span class="u-font-medium"
                >{{ fieldLabel(mudanca.campo) }}:</span
              >
              <span class="timeline-entry__value-before u-mx-1">{{
                formatValue(mudanca.de)
              }}</span>
              →
              <span class="u-ml-1">{{ formatValue(mudanca.para) }}</span>
            </li>
          </ul>
        </li>
      </ol>

      <template #button-group>
        <UIButtonModalCancel
          type="close"
          class="u-flex u-w-full"
          @click="onClose"
        />
      </template>
    </DialogModalBaseLayout>
  </DialogSkeleton>
</template>

<style>
.timeline-drawer-modal.ui-modal-layout {
  max-width: 40rem;
}
</style>

<style scoped>
.timeline-drawer__state {
  color: var(--ladesa-grey-color);
}

.timeline-entry {
  border-left: 2px solid rgb(from var(--ladesa-grey-color) R G B / 40%);
}

.timeline-entry__dot {
  left: -0.4375rem;
  top: 0.25rem;
  width: 0.75rem;
  height: 0.75rem;
  background-color: var(--ladesa-green-1-color);
}

.timeline-entry__version {
  color: var(--ladesa-text-default-color);
}

.timeline-entry__meta {
  color: var(--ladesa-grey-color);
}

.timeline-entry__motivo {
  color: var(--ladesa-text-default-color);
}

.timeline-entry__mudancas {
  color: var(--ladesa-text-default-color);
}

.timeline-entry__value-before {
  text-decoration: line-through;
  color: var(--ladesa-grey-color);
}
</style>
