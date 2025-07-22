<script lang="ts" setup>
import { UIButtonModalGoBack } from '#components';

const props = defineProps<{
  motivosConfirmados: { horario: string; motivo: string }[];
}>();

const emit = defineEmits<{
  (e: 'fechar'): void;
}>();
</script>

<template>
  <div
    class="bg-ldsa-white text-ldsa-black p-7 rounded-lg shadow w-[60vh] h-[80vh] flex flex-col justify-between"
  >
    <div class="overflow-y-auto pr-2">
      <h2 class="main-title text-sm font-semibold mb-4">
        Motivos de Indisponibilidade Confirmados
      </h2>

      <div
        v-if="props.motivosConfirmados.length === 0"
        class="flex items-center justify-center text-center text-sm text-ldsa-grey"
      >
        Nenhum motivo cadastrado ainda.
      </div>

      <ul v-else class="space-y-2 text-sm">
        <li
          v-for="m in props.motivosConfirmados"
          :key="m.horario"
          class="flex justify-between items-center py-3 border-b-1 border-ldsa-grey"
        >
          <span class="font-semibold text-[12px]">{{ m.motivo }}</span>
          <span class="font-medium text-[12px] text-ldsa-grey">{{ m.horario }}</span>
        </li>
      </ul>
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
