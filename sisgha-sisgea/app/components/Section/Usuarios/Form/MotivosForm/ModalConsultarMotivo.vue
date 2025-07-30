<script lang="ts" setup>
import { UIButtonModalGoBack } from '#components';
import { computed } from 'vue';

const props = defineProps<{
  motivosConfirmados: Record<string, { horario: string; motivo: string }[]>;
}>();

const emit = defineEmits<{
  (e: 'fechar'): void;
}>();

const diasDaSemana = ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];

function normalizarChave(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function formatarDia(dia: string): string {
  const diasComFeira = ['segunda', 'terça', 'quarta', 'quinta', 'sexta'];
  return diasComFeira.includes(dia.toLowerCase()) ? `${dia}-feira` : dia;
}

const motivosFormatadosPorDia = computed(() => {
  const chavesNormalizadas = Object.keys(props.motivosConfirmados).reduce(
    (acc, chaveOriginal) => {
      const chaveNormalizada = normalizarChave(chaveOriginal);
      acc[chaveNormalizada] = props.motivosConfirmados[chaveOriginal] ?? [];
      return acc;
    },
    {} as Record<string, { horario: string; motivo: string }[]>
  );

  return diasDaSemana.map((diaOriginal) => {
    const chaveNormalizada = normalizarChave(diaOriginal);
    const motivos = chavesNormalizadas[chaveNormalizada] ?? [];
    return {
      dia: diaOriginal,
      motivos,
    };
  });
});
</script>

<template>
  <div
    class="bg-ldsa-white text-ldsa-black p-7 rounded-lg shadow w-[60vh] h-[80vh] flex flex-col justify-between"
  >
    <div class="overflow-y-auto pr-2">
      <h2 class="main-title text-[14px] font-semibold mb-4">
        Consultar motivos de indisponibilidade
      </h2>

      <div v-for="item in motivosFormatadosPorDia" :key="item.dia" class="mb-8">
        <h3 class="main-title font-semibold text-[12px] mb-2 capitalize text-ldsa-black">
          {{ formatarDia(item.dia) }}
        </h3>

        <div v-if="item.motivos.length === 0" class="text-[12px] text-ldsa-grey">
          Não há indisponibilidade neste dia
        </div>

        <ul v-else class="space-y-1 text-sm">
          <li
            v-for="motivo in item.motivos"
            :key="motivo.horario + motivo.motivo"
            class="flex justify-between items-center border-b border-ldsa-grey py-2"
          >
            <span class="font-semibold text-[12px]">{{ motivo.motivo }}</span>
            <span class="text-[12px] text-ldsa-grey">{{ motivo.horario }}</span>
          </li>
        </ul>
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
  height: auto;
}
</style>
