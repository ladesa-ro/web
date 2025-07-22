<script lang="ts" setup>
import { UIButtonModalGoBack } from '#components';
import { computed } from 'vue';

const props = defineProps<{
  motivosConfirmados: { horario: string; motivo: string }[];
}>();

const emit = defineEmits<{
  (e: 'fechar'): void;
}>();

const diasDaSemana = ['segunda', 'terça', 'quarta', 'quinta', 'sexta'];

const horariosPorDia: Record<string, string[]> = {
  segunda: ['07:30', '08:20', '13:00', '13:50'],
  terça: ['09:10', '10:00', '14:40', '15:30'],
  quarta: ['10:20', '11:10', '15:50', '16:40'],
  quinta: ['19:00', '19:50', '20:40'],
  sexta: ['21:30', '21:50', '22:40'],
};

const motivosPorDia = computed<Record<string, { horario: string; motivo: string }[]>>(() => {
  const agrupado: Record<string, { horario: string; motivo: string }[]> = {};
  for (const dia of diasDaSemana) {
    agrupado[dia] = props.motivosConfirmados.filter(m =>
      horariosPorDia[dia]?.includes(m.horario)
    );
  }
  return agrupado;
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

      <div v-for="dia in diasDaSemana" :key="dia" class="mb-8">
        <h3 class="main-title font-semibold text-[12px] mb-2 capitalize text-ldsa-black">
          {{ dia }}-feira
        </h3>

        <div
          v-if="motivosPorDia[dia]?.length === 0"
          class="text-[12px] text-ldsa-grey"
        >
          Não há indisponibilidade neste dia
        </div>

        <ul v-else class="space-y-1 text-sm">
          <li
            v-for="m in motivosPorDia[dia]"
            :key="m.horario"
            class="flex justify-between items-center border-b border-ldsa-grey py-2"
          >
            <span class="font-semibold text-[12px]">{{ m.motivo }}</span>
            <span class="text-[12px] text-ldsa-grey">{{ m.horario }}</span>
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
