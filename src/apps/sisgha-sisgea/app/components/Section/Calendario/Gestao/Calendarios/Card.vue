<script lang="ts" setup>
import type { CalendarioLetivoFindOneOutputDto } from '@ladesa-ro/web.api.client';

const props = defineProps<{
  calendario: CalendarioLetivoFindOneOutputDto;
}>();

const emit = defineEmits<{
  edit: [id: string];
}>();

const calendarioLetivo = useCalendarioLetivo();
const confirmDeactivate = useConfirmDelete();

const isInativo = computed(() => props.calendario.situacao === 'INATIVO');

const handleToggleSituacao = async () => {
  const confirmed = await confirmDeactivate.confirm();
  if (confirmed) {
    const novaSituacao = isInativo.value ? 'ATIVO' : 'INATIVO';

    await calendarioLetivo.update(props.calendario.id, {
      situacao: novaSituacao,
    } as Record<string, string>);
    await calendarioLetivo.invalidate();
  }
};

const etapas = computed(() => props.calendario.etapas ?? []);

function formatDateShort(iso: string): string {
  const date = new Date(iso + 'T00:00:00');
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

const formacaoNome = computed(
  () => props.calendario.ofertaFormacao?.nome ?? '---'
);

const duracao = computed(() => {
  if (etapas.value.length > 0) {
    const sorted = [...etapas.value].sort(
      (a, b) =>
        new Date(a.dataInicio).getTime() - new Date(b.dataInicio).getTime()
    );
    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    if (first && last) {
      return `${formatDateShort(first.dataInicio)} - ${formatDateShort(last.dataTermino)}`;
    }
  }
  return `Ano ${props.calendario.ano}`;
});

const qtdPeriodos = computed(() => etapas.value.length);
</script>

<template>
  <div
    class="calendario-card u-p-5 u-rounded-lg u-flex u-flex-col u-gap-3-5 u-h-full"
  >
    <div class="u-flex u-justify-between u-items-center">
      <div class="calendario-card__header-info u-flex u-items-center u-gap-2">
        <h2 class="calendario-card__title u-font-medium u-text-lg u-truncate">
          {{ calendario.nome }}
        </h2>
        <UIBadge v-if="isInativo" variant="danger" class="u-shrink-0">
          Inativo
        </UIBadge>
      </div>

      <div class="u-flex u-items-center u-gap-2 u-shrink-0 u-ml-2">
        <UIButtonModalBaseLayout
          v-if="!isInativo"
          text="Desativar"
          variant="small"
          :opacity="85"
          color="var(--ladesa-red-color)"
          type="button"
          @click.prevent="handleToggleSituacao"
        />
        <UIButtonModalBaseLayout
          v-else
          text="Reativar"
          variant="small"
          :opacity="85"
          color="var(--ladesa-green-color, #22c55e)"
          type="button"
          @click.prevent="handleToggleSituacao"
        />
        <UIButtonEdit @click.prevent="emit('edit', calendario.id)" />
      </div>
    </div>

    <div class="u-flex u-flex-col u-gap-1 u-text-sm">
      <span>Formação: {{ formacaoNome }}</span>
      <span>Duração: {{ duracao }}</span>
      <span>Qtd. períodos: {{ qtdPeriodos }}</span>
      <span>Situação: {{ calendario.situacao ?? 'ATIVO' }}</span>
    </div>

    <div v-if="etapas.length > 0" class="u-flex u-flex-col u-gap-1-5 u-text-sm">
      <div
        v-for="etapa in etapas"
        :key="etapa.id"
        class="calendario-card__etapa u-flex u-gap-2 u-items-center"
      >
        <div
          class="calendario-card__etapa-dot u-rounded-full u-shrink-0"
          :style="{ backgroundColor: etapa.cor }"
        />
        {{ etapa.nome }}: {{ formatDateShort(etapa.dataInicio) }} -
        {{ formatDateShort(etapa.dataTermino) }}
      </div>
    </div>

    <div v-else class="calendario-card__empty u-text-xs">
      Nenhuma etapa cadastrada.
    </div>

    <DialogConfirm
      v-model="confirmDeactivate.isOpen.value"
      :message="
        isInativo
          ? 'Deseja reativar este calendário letivo?'
          : 'Deseja desativar este calendário letivo?'
      "
      @confirm="confirmDeactivate.onConfirm"
    />
  </div>
</template>

<style scoped>
.calendario-card {
  border: 2px solid var(--ladesa-grey-color);
  transition:
    background-color var(--ui-duration-base) var(--ui-easing-standard),
    border-color var(--ui-duration-base) var(--ui-easing-standard),
    color var(--ui-duration-base) var(--ui-easing-standard);
}

.calendario-card:hover {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 10%);
}

.calendario-card__header-info,
.calendario-card__title {
  min-width: 0;
}

.calendario-card__etapa {
  color: var(--ladesa-grey-color);
}

.calendario-card__etapa-dot {
  width: 0.375rem;
  height: 0.375rem;
}

.calendario-card__empty {
  color: var(--ladesa-grey-color);
}
</style>
