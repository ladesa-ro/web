<script lang="ts" setup>
import type { CalendarioAgendamentoFindOneOutputDto } from '@ladesa-ro/web.api.client';

const props = defineProps<{
  reserva: CalendarioAgendamentoFindOneOutputDto;
}>();

const emit = defineEmits<{ cancel: [id: string] }>();

const confirmOpen = ref(false);

function formatDateShort(iso: string): string {
  const date = new Date(iso + 'T00:00:00');
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatTime(t?: string | null): string {
  return t?.slice(0, 5) ?? '';
}

const periodo = computed(() => {
  const { dataInicio, horarioInicio, horarioFim } = props.reserva;
  return `${formatDateShort(dataInicio)} ${formatTime(horarioInicio)} - ${formatTime(horarioFim)}`;
});

const ambientesText = computed(() => {
  const ambientes = props.reserva.ambientes;
  if (!ambientes || ambientes.length === 0) return 'Sem ambiente definido';
  return ambientes.map(a => a.nome ?? a.id.substring(0, 8)).join(', ');
});

const autorText = computed(() => {
  const perfis = props.reserva.perfis;
  if (perfis && perfis.length > 0) {
    const perfil = perfis[0];
    return perfil?.usuario?.nome ?? perfil?.id?.substring(0, 8) ?? '—';
  }
  return '—';
});

function onConfirmCancel() {
  emit('cancel', props.reserva.id);
}
</script>

<template>
  <div
    class="p-5 rounded-lg border-2 border-ldsa-grey flex flex-col gap-3 hover:bg-ldsa-grey/10 h-full transition-colors"
  >
    <div class="flex justify-between items-center gap-2">
      <div class="flex gap-2 items-center font-medium text-lg min-w-0">
        <IconsReserve class="w-5 h-5 shrink-0 text-ldsa-green-1" />
        <h2 class="truncate">{{ ambientesText }}</h2>
      </div>

      <DialogConfirm
        v-model="confirmOpen"
        title="Cancelar reserva"
        message="Tem certeza que deseja cancelar esta reserva?"
        @confirm="onConfirmCancel"
      />
      <button
        type="button"
        class="shrink-0 text-sm font-medium text-ldsa-red hover:underline"
        @click="confirmOpen = true"
      >
        Cancelar
      </button>
    </div>

    <span class="text-sm text-ldsa-text-default">{{ periodo }}</span>

    <p class="text-sm text-ldsa-grey">{{ reserva.nome }}</p>

    <p class="text-xs text-ldsa-grey">Autor: {{ autorText }}</p>
  </div>
</template>
