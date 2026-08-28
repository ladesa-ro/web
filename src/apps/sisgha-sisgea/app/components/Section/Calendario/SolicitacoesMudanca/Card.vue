<script lang="ts" setup>
import dayjs from 'dayjs';
import type { CalendarioSolicitacaoMudancaFindOneOutputDto } from '@ladesa-ro/web.api.client';
import { formatTipoOperacao } from './-Helpers/format';

const props = defineProps<{
  solicitacao: CalendarioSolicitacaoMudancaFindOneOutputDto;
}>();

const emit = defineEmits<{
  open: [id: string];
}>();

const agendamento = useCalendarioAgendamento();
const eventoQuery = agendamento.findOne(
  computed(() => props.solicitacao.calendarioAgendamentoId)
);
const evento = eventoQuery.data;

const expanded = ref(false);

const justificativaCurta = computed(() => {
  const texto = props.solicitacao.justificativa ?? '';
  return texto.length > 140 ? `${texto.slice(0, 140)}…` : texto;
});

const isTruncated = computed(
  () => (props.solicitacao.justificativa ?? '').length > 140
);
</script>

<template>
  <div
    class="flex flex-col gap-2 border border-ldsa-grey/20 rounded-xl p-4 cursor-pointer hover:border-ldsa-green-1/50 transition-colors"
    @click="emit('open', solicitacao.id)"
  >
    <div class="flex items-center justify-between gap-2">
      <span class="font-semibold text-sm truncate">
        {{ evento?.nome ?? 'Evento' }}
      </span>

      <span
        class="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0"
        :class="
          solicitacao.tipoOperacao === 'REMOVER'
            ? 'bg-ldsa-red/15 text-ldsa-red'
            : 'bg-ldsa-blue/15 text-ldsa-blue'
        "
      >
        {{ formatTipoOperacao(solicitacao.tipoOperacao) }}
      </span>
    </div>

    <div v-if="evento" class="text-xs text-ldsa-grey">
      Hoje: {{ dayjs(evento.dataInicio).format('DD/MM/YYYY') }}
      {{ evento.horarioInicio?.slice(0, 5) }}–{{ evento.horarioFim?.slice(0, 5) }}
    </div>

    <div class="text-xs text-ldsa-grey">
      Autor: {{ solicitacao.autor.nome ?? '—' }}
    </div>

    <p class="text-sm">
      {{ expanded ? solicitacao.justificativa : justificativaCurta }}
      <button
        v-if="isTruncated"
        type="button"
        class="text-ldsa-text-green font-medium ml-1"
        @click.stop="expanded = !expanded"
      >
        {{ expanded ? 'ver menos' : 'ver mais' }}
      </button>
    </p>

    <div class="text-xs text-ldsa-grey">
      Aberta em {{ dayjs(solicitacao.dateCreated).format('DD/MM/YYYY HH:mm') }}
    </div>
  </div>
</template>
