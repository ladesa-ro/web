<script lang="ts" setup>
import { formatarDia, normalizarChave } from './-Helpers/motivos-utils';

const props = defineProps<{
  motivosConfirmados: Record<string, { horario: string; motivo: string }[]>;
  selectedDayWeek: string | null;
}>();

const emit = defineEmits<{
  (e: 'fechar'): void;
}>();

const diasDaSemana = [
  'segunda',
  'terça',
  'quarta',
  'quinta',
  'sexta',
  'sábado',
];

const motivosDoDia = computed(() => {
  return props.selectedDayWeek
    ? props.motivosConfirmados[props.selectedDayWeek] || []
    : [];
});

const motivosFormatadosPorDia = computed(() => {
  const chavesNormalizadas = Object.keys(props.motivosConfirmados).reduce(
    (acc, chaveOriginal) => {
      const chaveNormalizada = normalizarChave(chaveOriginal);
      acc[chaveNormalizada] = props.motivosConfirmados[chaveOriginal] ?? [];
      return acc;
    },
    {} as Record<string, { horario: string; motivo: string }[]>
  );

  return diasDaSemana.map(diaOriginal => {
    const chaveNormalizada = normalizarChave(diaOriginal);
    const motivos = chavesNormalizadas[chaveNormalizada] ?? [];
    return {
      dia: diaOriginal,
      motivos,
    };
  });
});

const onClose = () => emit('fechar');
</script>

<template>
  <DialogModalBaseLayout
    :close-button="false"
    :on-close="onClose"
    title="Consultar motivos de indisponibilidade"
    class="modal-consultar-motivo__panel"
  >
    <div class="modal-consultar-motivo__scroll u-pr-2">
      <div
        v-for="item in motivosFormatadosPorDia"
        :key="item.dia"
        class="u-mb-8"
      >
        <h3
          class="main-title modal-consultar-motivo__day-title u-font-semibold u-text-sm u-mb-2"
        >
          {{ formatarDia(item.dia) }}
        </h3>

        <div
          v-if="item.motivos.length === 0"
          class="modal-consultar-motivo__empty u-text-sm"
        >
          Não há indisponibilidade neste dia
        </div>

        <ul v-else class="modal-consultar-motivo__list u-text-sm">
          <li
            v-for="motivo in item.motivos"
            :key="motivo.horario + motivo.motivo"
            class="modal-consultar-motivo__item u-flex u-justify-between u-items-center u-py-2"
          >
            <span
              class="modal-consultar-motivo__item-name u-font-semibold u-text-sm"
              >{{ motivo.motivo }}</span
            >
            <span class="modal-consultar-motivo__empty u-text-sm">{{
              motivo.horario
            }}</span>
          </li>
        </ul>
      </div>
    </div>

    <template #button-group>
      <div class="u-flex u-justify-start u-w-full">
        <UIButtonModalGoBack @click="emit('fechar')" />
      </div>
    </template>
  </DialogModalBaseLayout>
</template>

<style scoped>
.modal-consultar-motivo__panel {
  height: min(35rem, 85vh);
  width: min(95vw, 31.5rem);
}

.modal-consultar-motivo__scroll {
  overflow-y: auto;
}

.modal-consultar-motivo__day-title {
  text-transform: capitalize;
  color: var(--ladesa-text-default-color);
}

.modal-consultar-motivo__empty {
  color: var(--ladesa-grey-color);
}

.modal-consultar-motivo__list > * + * {
  margin-top: var(--ui-space-1);
}

.modal-consultar-motivo__item {
  border-bottom: 1px solid var(--ladesa-grey-color);
}

.modal-consultar-motivo__item-name {
  color: var(--ladesa-text-default-color);
}
</style>
