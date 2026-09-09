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
    class="u-p-5 u-rounded-lg u-flex u-flex-col u-gap-3 u-h-full reserva-card"
  >
    <div class="u-flex u-justify-between u-items-center u-gap-2">
      <div
        class="u-flex u-gap-2 u-items-center u-font-medium u-text-lg reserva-card__title-wrapper"
      >
        <IconsReserve class="reserva-card__icon" />
        <h2 class="u-truncate">{{ ambientesText }}</h2>
      </div>

      <DialogConfirm
        v-model="confirmOpen"
        title="Cancelar reserva"
        message="Tem certeza que deseja cancelar esta reserva?"
        @confirm="onConfirmCancel"
      />
      <button
        type="button"
        class="u-shrink-0 u-text-sm u-font-medium reserva-card__cancel-button"
        @click="confirmOpen = true"
      >
        Cancelar
      </button>
    </div>

    <span class="u-text-sm reserva-card__periodo">{{ periodo }}</span>

    <p class="u-text-sm reserva-card__nome">{{ reserva.nome }}</p>

    <p class="u-text-xs reserva-card__autor">Autor: {{ autorText }}</p>
  </div>
</template>

<style scoped>
.reserva-card {
  border: 2px solid var(--ladesa-grey-color);
  transition: background-color var(--ui-duration-base) var(--ui-easing-standard);
}

.reserva-card:hover {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 10%);
}

.reserva-card__title-wrapper {
  min-width: 0;
}

.reserva-card__icon {
  width: var(--ui-space-5);
  height: var(--ui-space-5);
  flex-shrink: 0;
  color: var(--ladesa-green-1-color);
}

.reserva-card__cancel-button {
  color: var(--ladesa-red-color);
}

.reserva-card__cancel-button:hover {
  text-decoration: underline;
}

.reserva-card__periodo {
  color: var(--ladesa-text-default-color);
}

.reserva-card__nome,
.reserva-card__autor {
  color: var(--ladesa-grey-color);
}
</style>
