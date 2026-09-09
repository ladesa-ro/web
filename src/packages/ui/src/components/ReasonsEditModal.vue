<script lang="ts" setup>
import { computed } from 'vue';
import ButtonModalGoBack from './ButtonModalGoBack.vue';
import ModalBaseLayout from './ModalBaseLayout.vue';
import ReasonsEditModalRow from './ReasonsEditModalRow.vue';
import type { ReasonsByDay } from './reason';
import type { GroupedReason } from './grouped-reason';

export type ReasonsEditModalProps = {
  motivosConfirmados: ReasonsByDay;
  selectedDayWeek: string | null;
};

const props = defineProps<ReasonsEditModalProps>();

const emit = defineEmits<{
  (e: 'fechar'): void;
  (e: 'editar', payload: GroupedReason): void;
  (e: 'deletar', motivo: string): void;
}>();

const motivosAgrupados = computed<GroupedReason[]>(() => {
  const agrupamento: Record<
    string,
    {
      dias: Set<string>;
      horariosPorDia: Record<string, Set<string>>;
    }
  > = {};

  for (const [dia, motivos] of Object.entries(props.motivosConfirmados)) {
    for (const { motivo, horario } of motivos) {
      if (!agrupamento[motivo]) {
        agrupamento[motivo] = { dias: new Set(), horariosPorDia: {} };
      }
      agrupamento[motivo].dias.add(dia);
      if (!agrupamento[motivo].horariosPorDia[dia]) {
        agrupamento[motivo].horariosPorDia[dia] = new Set();
      }
      agrupamento[motivo].horariosPorDia[dia].add(horario);
    }
  }

  return Object.entries(agrupamento).map(([motivo, data]) => ({
    motivo,
    dias: Array.from(data.dias).sort(),
    horariosPorDia: Object.fromEntries(
      Object.entries(data.horariosPorDia).map(([dia, horariosSet]) => [
        dia,
        Array.from(horariosSet).sort(),
      ])
    ),
  }));
});

const onClose = () => emit('fechar');
</script>

<template>
  <ModalBaseLayout
    :close-button="false"
    :on-close="onClose"
    title="Editar motivos de indisponibilidade"
    class="ui-reasons-edit-modal"
  >
    <div class="ui-reasons-edit-modal__scroll u-pr-2">
      <p class="ui-reasons-edit-modal__hint u-text-center u-font-medium">
        Esta é a listagem de todos os motivos cadastrados.
      </p>
      <p class="ui-reasons-edit-modal__hint u-text-center u-font-medium u-mb-3">
        Selecione um motivo para editá-lo.
      </p>

      <ul
        v-if="motivosAgrupados.length"
        class="ui-reasons-edit-modal__list u-text-sm"
      >
        <ReasonsEditModalRow
          v-for="item in motivosAgrupados"
          :key="item.motivo"
          :item="item"
          @editar="emit('editar', $event)"
          @deletar="emit('deletar', $event)"
        />
      </ul>

      <div v-else class="ui-reasons-edit-modal__empty u-text-sm u-text-center">
        Ainda não há motivos cadastrados.
      </div>
    </div>

    <template #button-group>
      <div class="u-flex u-justify-start u-w-full">
        <ButtonModalGoBack @click="emit('fechar')" />
      </div>
    </template>
  </ModalBaseLayout>
</template>
