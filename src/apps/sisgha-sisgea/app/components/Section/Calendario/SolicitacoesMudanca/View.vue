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

const recusarOpen = ref(false);
</script>

<template>
  <DialogModalBaseLayout
    v-if="solicitacao"
    title="Solicitação de mudança"
    :close-button="true"
    :on-close="() => emit('close')"
  >
    <div class="u-flex u-flex-col u-gap-5">
      <div class="u-flex u-items-center u-justify-between">
        <span class="u-text-sm u-font-semibold">
          {{ formatTipoOperacao(solicitacao.tipoOperacao) }}
        </span>
        <UIBadge>{{ formatStatus(solicitacao.status) }}</UIBadge>
      </div>

      <div class="u-grid u-gap-4 view__grid">
        <div class="u-flex u-flex-col u-gap-1">
          <span class="u-text-xs u-font-semibold view__muted-text">Hoje</span>
          <span class="u-text-sm">{{ evento?.nome }}</span>
          <span class="u-text-sm view__muted-text">
            {{ evento ? dayjs(evento.dataInicio).format('DD/MM/YYYY') : '—' }}
          </span>
          <span class="u-text-sm view__muted-text">
            {{ evento?.horarioInicio?.slice(0, 5) }}–{{
              evento?.horarioFim?.slice(0, 5)
            }}
          </span>
        </div>

        <div class="u-flex u-flex-col u-gap-1">
          <span class="u-text-xs u-font-semibold view__muted-text">Proposto</span>

          <template v-if="solicitacao.tipoOperacao === 'REMOVER'">
            <span class="u-text-sm u-font-medium view__danger-text">
              Remover evento
            </span>
          </template>

          <template v-else>
            <span class="u-text-sm view__muted-text">
              {{
                dadosPropostos.dataInicio
                  ? dayjs(String(dadosPropostos.dataInicio)).format(
                      'DD/MM/YYYY'
                    )
                  : '—'
              }}
            </span>
            <span class="u-text-sm view__muted-text">
              {{ dadosPropostos.horarioInicio ?? '—' }}–{{
                dadosPropostos.horarioFim ?? '—'
              }}
            </span>
            <span v-if="ambientePropostoQuery.data.value" class="u-text-sm view__muted-text">
              {{ ambientePropostoQuery.data.value.nome }}
            </span>
          </template>
        </div>
      </div>

      <div class="u-flex u-flex-col u-gap-1">
        <span class="u-text-xs u-font-semibold view__muted-text">Justificativa</span>
        <p class="u-text-sm">{{ solicitacao.justificativa }}</p>
      </div>

      <div class="u-text-xs view__muted-text">
        Autor: {{ solicitacao.autor.nome ?? '—' }}
      </div>

      <div v-if="solicitacao.status === 'RECUSADA'" class="u-flex u-flex-col u-gap-1">
        <span class="u-text-xs u-font-semibold view__muted-text">Motivo da recusa</span>
        <p class="u-text-sm">{{ solicitacao.motivoRecusa || '—' }}</p>
      </div>
    </div>

    <template v-if="isAberta" #button-group>
      <UIButtonModalBaseLayout
        text="Recusar"
        color="var(--ladesa-red-color)"
        type="button"
        @click="recusarOpen = true"
      >
        <IconsExclude />
      </UIButtonModalBaseLayout>
      <UIButtonModalBaseLayout
        text="Aprovar"
        color="var(--ladesa-green-2-color)"
        type="button"
        @click="aprovarConfirmOpen = true"
      >
        <IconsConfirm />
      </UIButtonModalBaseLayout>
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

<style scoped>
.view__grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.view__muted-text {
  color: var(--ladesa-grey-color);
}

.view__danger-text {
  color: var(--ladesa-red-color);
}

</style>
