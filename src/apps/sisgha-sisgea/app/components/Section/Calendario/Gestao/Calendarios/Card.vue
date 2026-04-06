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
    // TODO: remove Record cast after SDK regeneration includes 'situacao' field in update DTO
    await calendarioLetivo.update(props.calendario.id, { situacao: novaSituacao } as Record<string, string>);
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

const formacaoNome = computed(() => props.calendario.ofertaFormacao?.nome ?? '---');

const duracao = computed(() => {
  if (etapas.value.length > 0) {
    const sorted = [...etapas.value].sort(
      (a, b) => new Date(a.dataInicio).getTime() - new Date(b.dataInicio).getTime()
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
    class="p-5 rounded-lg border-2 border-ldsa-grey flex flex-col gap-3.5 hover:bg-ldsa-grey/10 h-full transition-colors"
  >
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2 min-w-0">
        <h2 class="font-medium text-lg truncate min-w-0">{{ calendario.nome }}</h2>
        <span
          v-if="isInativo"
          class="shrink-0 text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700"
        >
          Inativo
        </span>
      </div>

      <div class="flex items-center gap-2 shrink-0 ml-2">
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

    <div class="flex flex-col gap-1 text-sm">
      <span>Formação: {{ formacaoNome }}</span>
      <span>Duração: {{ duracao }}</span>
      <span>Qtd. períodos: {{ qtdPeriodos }}</span>
      <span>Situação: {{ calendario.situacao ?? 'ATIVO' }}</span>
    </div>

    <!-- Etapas list -->
    <div v-if="etapas.length > 0" class="flex flex-col gap-1.5 text-sm">
      <div
        v-for="etapa in etapas"
        :key="etapa.id"
        class="flex gap-2 items-center text-ldsa-grey"
      >
        <div
          class="rounded-full w-1.5 h-1.5 shrink-0"
          :style="{ backgroundColor: etapa.cor }"
        />
        {{ etapa.nome }}: {{ formatDateShort(etapa.dataInicio) }} -
        {{ formatDateShort(etapa.dataTermino) }}
      </div>
    </div>

    <!-- No etapas -->
    <div v-else class="text-xs text-ldsa-grey">
      Nenhuma etapa cadastrada.
    </div>

    <DialogConfirm
      v-model="confirmDeactivate.isOpen.value"
      :message="isInativo ? 'Deseja reativar este calendário letivo?' : 'Deseja desativar este calendário letivo?'"
      @confirm="confirmDeactivate.onConfirm"
    />
  </div>
</template>
