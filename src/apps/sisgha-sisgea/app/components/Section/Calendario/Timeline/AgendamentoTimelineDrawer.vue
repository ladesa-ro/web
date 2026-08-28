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

function authorLabel(entry: CalendarioAgendamentoLinhaDoTempoEntradaDto): string {
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
      <div v-if="timelineQuery.isLoading.value" class="py-8 text-center text-ldsa-grey">
        Carregando histórico...
      </div>

      <div
        v-else-if="errorStatus === 403"
        class="py-8 text-center text-ldsa-grey"
      >
        Você não tem permissão para ver o histórico deste agendamento.
      </div>

      <div
        v-else-if="errorStatus === 404"
        class="py-8 text-center text-ldsa-grey"
      >
        Este agendamento não possui histórico visível.
      </div>

      <div
        v-else-if="timelineQuery.isError.value"
        class="py-8 text-center text-ldsa-grey"
      >
        Não foi possível carregar o histórico deste agendamento.
      </div>

      <div
        v-else-if="versoesDesc.length === 0"
        class="py-8 text-center text-ldsa-grey"
      >
        Nenhum histórico encontrado.
      </div>

      <ol v-else class="flex flex-col gap-5">
        <li
          v-for="entry in versoesDesc"
          :key="entry.id"
          class="flex flex-col gap-2 border-l-2 border-ldsa-grey/40 pl-4 relative"
        >
          <span
            class="absolute -left-[0.4375rem] top-1 w-3 h-3 rounded-full bg-ldsa-green-1"
          />

          <div class="flex items-center gap-2 flex-wrap">
            <span class="font-semibold text-ldsa-text-default">
              v{{ entry.version }}
            </span>

            <span
              v-if="entry.version === oldestVersion"
              class="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
            >
              Criado
            </span>

            <span class="text-sm text-ldsa-grey">
              {{ authorLabel(entry) }} · {{ formatWhen(entry.validFrom) }}
            </span>
          </div>

          <p v-if="entry.motivo" class="text-sm text-ldsa-text-default">
            Motivo: {{ entry.motivo }}
          </p>

          <ul
            v-if="entry.mudancas.length > 0"
            class="flex flex-col gap-1 text-sm text-ldsa-text-default"
          >
            <li v-for="(mudanca, idx) in entry.mudancas" :key="idx">
              <span class="font-medium">{{ fieldLabel(mudanca.campo) }}:</span>
              <span class="line-through text-ldsa-grey mx-1">{{
                formatValue(mudanca.de)
              }}</span>
              →
              <span class="ml-1">{{ formatValue(mudanca.para) }}</span>
            </li>
          </ul>
        </li>
      </ol>

      <template #button-group>
        <UIButtonModalCancel type="close" class="flex w-full" @click="onClose" />
      </template>
    </DialogModalBaseLayout>
  </DialogSkeleton>
</template>

<style>
.timeline-drawer-modal.modal-layout {
  max-width: 40rem;
}
</style>
