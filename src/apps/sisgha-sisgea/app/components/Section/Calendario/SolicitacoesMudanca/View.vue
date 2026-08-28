<script lang="ts" setup>
import dayjs from 'dayjs';
import { ambienteFindById } from '@ladesa-ro/web.api.client';
import { useQuery } from '@tanstack/vue-query';
import RecusarDialog from './RecusarDialog.vue';
import { formatStatus, formatTipoOperacao } from './-Helpers/format';

const props = defineProps<{
  solicitacaoId: string | null;
}>();

const emit = defineEmits<{
  close: [];
}>();

const router = useRouter();
const api = useApiClient();
const { success: toastSuccess } = useToast();

const solicitacoes = useCalendarioSolicitacaoMudanca();
const agendamento = useCalendarioAgendamento();

const solicitacaoQuery = solicitacoes.findOne(
  computed(() => props.solicitacaoId)
);
const solicitacao = solicitacaoQuery.data;

const eventoQuery = agendamento.findOne(
  computed(() => solicitacao.value?.calendarioAgendamentoId ?? null)
);
const evento = eventoQuery.data;

const dadosPropostos = computed(
  () => (solicitacao.value?.dadosPropostos ?? {}) as Record<string, unknown>
);

const ambientePropostoId = computed(() => {
  const value = dadosPropostos.value.ambienteId;
  return typeof value === 'string' ? value : null;
});

const ambientePropostoQuery = useQuery({
  queryKey: computed(() => ['ambientes', 'detail', ambientePropostoId.value]),
  queryFn: () =>
    api.call(ambienteFindById, { path: { id: ambientePropostoId.value! } }),
  enabled: computed(() => !!ambientePropostoId.value),
});

const isAberta = computed(() => solicitacao.value?.status === 'ABERTA');

// Aprovar

const aprovarConfirmOpen = ref(false);
const aprovando = ref(false);

async function confirmarAprovacao() {
  if (!props.solicitacaoId) return;

  aprovando.value = true;
  try {
    const resultado = await solicitacoes.aprovar(props.solicitacaoId);
    await solicitacoes.invalidate();

    aprovarConfirmOpen.value = false;

    if (resultado.sessaoEdicaoId) {
      toastSuccess({
        title: 'Solicitação aprovada',
        description:
          'A mudança foi proposta numa sessão de edição. Publique-a para que entre no calendário.',
        actionLabel: 'Ir para a sessão de edição',
        onAction: () =>
          router.push(
            `/sisgha/dape/horarios-de-aula/sessao/${resultado.sessaoEdicaoId}`
          ),
        duration: 10000,
      });
    }
  } finally {
    aprovando.value = false;
  }
}

// Recusar

const recusarOpen = ref(false);
</script>

<template>
  <DialogModalBaseLayout
    v-if="solicitacao"
    title="Solicitação de mudança"
    :close-button="true"
    :on-close="() => emit('close')"
  >
    <div class="flex flex-col gap-5">
      <div class="flex items-center justify-between">
        <span class="text-sm font-semibold">
          {{ formatTipoOperacao(solicitacao.tipoOperacao) }}
        </span>
        <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-ldsa-grey/15">
          {{ formatStatus(solicitacao.status) }}
        </span>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-1">
          <span class="text-xs font-semibold text-ldsa-grey">Hoje</span>
          <span class="text-sm">{{ evento?.nome }}</span>
          <span class="text-sm text-ldsa-grey">
            {{ evento ? dayjs(evento.dataInicio).format('DD/MM/YYYY') : '—' }}
          </span>
          <span class="text-sm text-ldsa-grey">
            {{ evento?.horarioInicio?.slice(0, 5) }}–{{
              evento?.horarioFim?.slice(0, 5)
            }}
          </span>
        </div>

        <div class="flex flex-col gap-1">
          <span class="text-xs font-semibold text-ldsa-grey">Proposto</span>

          <template v-if="solicitacao.tipoOperacao === 'REMOVER'">
            <span class="text-sm text-ldsa-red font-medium">
              Remover evento
            </span>
          </template>

          <template v-else>
            <span class="text-sm text-ldsa-grey">
              {{
                dadosPropostos.dataInicio
                  ? dayjs(String(dadosPropostos.dataInicio)).format(
                      'DD/MM/YYYY'
                    )
                  : '—'
              }}
            </span>
            <span class="text-sm text-ldsa-grey">
              {{ dadosPropostos.horarioInicio ?? '—' }}–{{
                dadosPropostos.horarioFim ?? '—'
              }}
            </span>
            <span v-if="ambientePropostoQuery.data.value" class="text-sm text-ldsa-grey">
              {{ ambientePropostoQuery.data.value.nome }}
            </span>
          </template>
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <span class="text-xs font-semibold text-ldsa-grey">Justificativa</span>
        <p class="text-sm">{{ solicitacao.justificativa }}</p>
      </div>

      <div class="text-xs text-ldsa-grey">
        Autor: {{ solicitacao.autor.nome ?? '—' }}
      </div>

      <div v-if="solicitacao.status === 'RECUSADA'" class="flex flex-col gap-1">
        <span class="text-xs font-semibold text-ldsa-grey">Motivo da recusa</span>
        <p class="text-sm">{{ solicitacao.motivoRecusa || '—' }}</p>
      </div>
    </div>

    <template v-if="isAberta" #button-group>
      <button
        type="button"
        class="rounded-lg border border-ldsa-red text-ldsa-red px-4 py-2 text-sm font-medium"
        @click="recusarOpen = true"
      >
        Recusar
      </button>
      <button
        type="button"
        class="rounded-lg bg-ldsa-green-1 px-4 py-2 text-sm font-medium text-white"
        @click="aprovarConfirmOpen = true"
      >
        Aprovar
      </button>
    </template>
  </DialogModalBaseLayout>

  <DialogConfirm
    v-model="aprovarConfirmOpen"
    title="Aprovar solicitação"
    message="Aprovar cria uma proposta numa sessão de edição. A mudança só entra no calendário quando a sessão for publicada."
    @confirm="confirmarAprovacao"
  />

  <RecusarDialog
    v-model="recusarOpen"
    :solicitacao-id="solicitacaoId"
    @recusada="emit('close')"
  />
</template>
