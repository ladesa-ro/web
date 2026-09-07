<script lang="ts" setup>
import { formatarDia } from './-Helpers/motivos-utils';

const props = defineProps<{
  motivosConfirmados: Record<string, { horario: string; motivo: string }[]>;
  selectedDayWeek: string | null;
}>();

const emit = defineEmits<{
  (e: 'fechar'): void;
  (
    e: 'editar',
    payload: {
      motivo: string;
      dias: string[];
      horariosPorDia: Record<string, string[]>;
    }
  ): void;
  (e: 'deletar', motivo: string): void;
}>();

const motivosAgrupados = computed(() => {
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

const motivosDoDia = computed(() => {
  return props.selectedDayWeek
    ? props.motivosConfirmados[props.selectedDayWeek] || []
    : [];
});

function formatarTooltip(item: any): string {
  return item.dias
    .map((dia: string) => {
      const horarios = item.horariosPorDia[dia].join(' ');
      return `${formatarDia(dia)}: ${horarios}`;
    })
    .join(' | ');
}

const onClose = () => emit('fechar');
</script>

<template>
  <DialogModalBaseLayout
    :close-button="false"
    :on-close="onClose"
    title="Editar motivos de indisponibilidade"
    class="modal-listar-motivo__panel"
  >
    <div class="modal-listar-motivo__scroll u-pr-2">
      <p class="modal-listar-motivo__hint u-text-center u-font-medium">
        Esta é a listagem de todos os motivos cadastrados.
      </p>
      <p
        class="modal-listar-motivo__hint u-text-center u-font-medium u-mb-3"
      >
        Selecione um motivo para editá-lo.
      </p>

      <ul v-if="motivosAgrupados.length" class="modal-listar-motivo__list u-text-sm">
        <li
          v-for="item in motivosAgrupados"
          :key="item.motivo"
          class="modal-listar-motivo__item u-flex u-items-center u-justify-between u-pb-2"
        >
          <span
            class="modal-listar-motivo__name u-font-semibold u-text-sm u-mr-4"
          >
            {{ item.motivo }}
          </span>

          <div class="modal-listar-motivo__details u-flex u-items-center u-gap-4">
            <div
              class="modal-listar-motivo__tooltip u-text-right u-truncate"
              :title="formatarTooltip(item)"
            >
              <template v-for="(dia, index) in item.dias" :key="dia">
                <span class="modal-listar-motivo__day-label u-font-medium"
                  >{{ formatarDia(dia) }}:</span
                >
                <span
                  v-for="(horario, i) in item.horariosPorDia[dia]"
                  :key="horario + i"
                  class="u-ml-1"
                >
                  {{ horario }}
                </span>
                <span v-if="index < item.dias.length - 1" class="u-mr-1">,</span>
              </template>
            </div>

            <div class="u-flex u-gap-2 u-items-center u-shrink-0">
              <button
                aria-label="Editar motivo"
                class="modal-listar-motivo__action-btn modal-listar-motivo__action-btn--edit"
                @click="emit('editar', item)"
              >
                <IconsEdit class="modal-listar-motivo__action-icon" />
              </button>
              <button
                aria-label="Excluir motivo"
                class="modal-listar-motivo__action-btn modal-listar-motivo__action-btn--delete"
                @click="emit('deletar', item.motivo)"
              >
                <IconsExclude
                  class="modal-listar-motivo__action-icon modal-listar-motivo__action-icon--danger"
                />
              </button>
            </div>
          </div>
        </li>
      </ul>

      <div v-else class="modal-listar-motivo__empty u-text-sm u-text-center">
        Ainda não há motivos cadastrados.
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
.modal-listar-motivo__panel {
  height: min(35rem, 85vh);
  width: min(95vw, 31.5rem);
}

.modal-listar-motivo__scroll {
  overflow-y: auto;
}

.modal-listar-motivo__hint {
  font-size: 0.62rem;
  color: var(--ladesa-grey-color);
}

.modal-listar-motivo__list > * + * {
  margin-top: var(--ui-space-4);
}

.modal-listar-motivo__item {
  border-bottom: 1px solid var(--ladesa-grey-color);
}

.modal-listar-motivo__name {
  white-space: nowrap;
  color: var(--ladesa-text-default-color);
}

.modal-listar-motivo__details {
  min-width: 0;
}

.modal-listar-motivo__tooltip {
  font-size: 0.62rem;
  color: var(--ladesa-grey-color);
  max-width: 28vh;
}

.modal-listar-motivo__day-label {
  text-transform: capitalize;
}

.modal-listar-motivo__action-btn--edit:hover {
  color: var(--ladesa-green-1-color);
}

.modal-listar-motivo__action-btn--delete:hover {
  color: var(--ladesa-red-color);
}

.modal-listar-motivo__action-icon {
  width: 0.75rem;
  height: 0.75rem;
  color: var(--ladesa-text-default-color);
}

.modal-listar-motivo__action-icon--danger {
  color: var(--ladesa-red-color);
}

.modal-listar-motivo__empty {
  color: var(--ladesa-grey-color);
}
</style>
