<script lang="ts" setup>
import { IconsEdit, IconsExclude, UIButtonModalGoBack } from '#components';
import { computed } from 'vue';

const props = defineProps<{
  motivosConfirmados: Record<string, { horario: string; motivo: string }[]>;
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

function formatarTooltip(item: any): string {
  return item.dias
    .map((dia: string) => {
      const horarios = item.horariosPorDia[dia].join(' ')
      return `${dia}-feira: ${horarios}`
    })
    .join(' | ')
}
</script>

<template>
  <div
    class="bg-ldsa-white text-ldsa-black p-7 rounded-lg shadow w-[60vh] h-[80vh] flex flex-col justify-between"
  >
    <div class="overflow-y-auto pr-2">
      <h2 class="main-title text-[14px] font-semibold mb-4">
        Editar motivos de indisponibilidade
      </h2>

      <p class="text-[10px] text-ldsa-grey text-center font-medium">
        Esta é a listagem de todos os motivos cadastrados.
      </p>
      <p class="text-[10px] text-ldsa-grey text-center font-medium mb-3">
        Selecione um motivo para editá-lo.
      </p>

      <ul v-if="motivosAgrupados.length" class="space-y-4 text-sm">
        <li
          v-for="item in motivosAgrupados"
          :key="item.motivo"
          class="border-b border-ldsa-grey flex items-center justify-between pb-2"
        >
          <span class="font-semibold text-[12px] whitespace-nowrap mr-4">
            {{ item.motivo }}
          </span>

          <div class="flex items-center gap-4 min-w-0">
            <div
              class="text-[10px] text-ldsa-grey text-right truncate max-w-[28vh] overflow-hidden whitespace-nowrap"
              :title="formatarTooltip(item)"
            >
              <template v-for="(dia, index) in item.dias" :key="dia">
                <span class="capitalize font-medium">{{ dia }}-feira:</span>
                <span
                  v-for="(horario, i) in item.horariosPorDia[dia]"
                  :key="horario + i"
                  class="ml-1"
                >
                  {{ horario }}
                </span>
                <span v-if="index < item.dias.length - 1" class="mr-1">,</span>
              </template>
            </div>

            <div class="flex gap-2 items-center shrink-0">
              <button
                @click="emit('editar', item)"
                aria-label="Editar motivo"
                class="hover:text-ldsa-green-1"
              >
                <IconsEdit class="text-ldsa-black w-4 h-4" />
              </button>
              <button
                @click="emit('deletar', item.motivo)"
                aria-label="Excluir motivo"
                class="hover:text-ldsa-red"
              >
                <IconsExclude class="text-ldsa-red w-3 h-3" />
              </button>
            </div>
          </div>
        </li>
      </ul>

      <div v-else class="text-sm text-center text-ldsa-grey">
        Ainda não há motivos cadastrados.
      </div>
    </div>

    <div class="pt-6">
      <UIButtonModalGoBack @click="emit('fechar')" />
    </div>
  </div>
</template>

<style scoped>
.main-title::before {
  content: '';
  border: 2px solid var(--ladesa-green-1-color);
  margin-right: 0.5rem;
}
</style>
