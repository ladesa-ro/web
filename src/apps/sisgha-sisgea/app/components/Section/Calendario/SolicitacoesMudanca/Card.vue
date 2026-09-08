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
    class="u-flex u-flex-col u-gap-2 u-rounded-xl u-p-4 solicitacao-card"
    @click="emit('open', solicitacao.id)"
  >
    <div class="u-flex u-items-center u-justify-between u-gap-2">
      <span class="u-font-semibold u-text-sm u-truncate">
        {{ evento?.nome ?? 'Evento' }}
      </span>

      <UIBadge
        class="u-shrink-0"
        :variant="
          solicitacao.tipoOperacao === 'REMOVER' ? 'danger' : 'info'
        "
      >
        {{ formatTipoOperacao(solicitacao.tipoOperacao) }}
      </UIBadge>
    </div>

    <div v-if="evento" class="u-text-xs solicitacao-card__meta">
      Hoje: {{ dayjs(evento.dataInicio).format('DD/MM/YYYY') }}
      {{ evento.horarioInicio?.slice(0, 5) }}–{{ evento.horarioFim?.slice(0, 5) }}
    </div>

    <div class="u-text-xs solicitacao-card__meta">
      Autor: {{ solicitacao.autor.nome ?? '—' }}
    </div>

    <p class="u-text-sm">
      {{ expanded ? solicitacao.justificativa : justificativaCurta }}
      <button
        v-if="isTruncated"
        type="button"
        class="u-font-medium u-ml-1 solicitacao-card__toggle"
        @click.stop="expanded = !expanded"
      >
        {{ expanded ? 'ver menos' : 'ver mais' }}
      </button>
    </p>

    <div class="u-text-xs solicitacao-card__meta">
      Aberta em {{ dayjs(solicitacao.dateCreated).format('DD/MM/YYYY HH:mm') }}
    </div>
  </div>
</template>

<style scoped>
.solicitacao-card {
  border: 1px solid rgb(from var(--ladesa-grey-color) R G B / 20%);
  cursor: pointer;
  transition: border-color var(--ui-duration-base) var(--ui-easing-standard);
}

.solicitacao-card:hover {
  border-color: rgb(from var(--ladesa-green-1-color) R G B / 50%);
}

.solicitacao-card__meta {
  color: var(--ladesa-grey-color);
}

.solicitacao-card__toggle {
  color: var(--ladesa-text-green-color);
}
</style>
