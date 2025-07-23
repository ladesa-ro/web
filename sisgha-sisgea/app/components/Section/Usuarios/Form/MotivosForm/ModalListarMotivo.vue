<script lang="ts" setup>
import { IconsEdit, UIButtonModalGoBack } from '#components';
import { computed } from 'vue';

const props = defineProps<{
  motivosConfirmados: { horario: string; motivo: string }[];
}>();

const emit = defineEmits<{
  (e: 'fechar'): void;
  (e: 'editar', motivo: { horario: string; motivo: string }): void;
  (e: 'deletar', horario: string): void;
}>();

const motivosOrdenados = computed(() =>
  [...props.motivosConfirmados].sort((a, b) =>
    a.horario.localeCompare(b.horario)
  )
);
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

      <ul v-if="motivosOrdenados.length" class="space-y-2 text-sm">
        <li
          v-for="m in motivosOrdenados"
          :key="m.horario"
          class="flex justify-between items-center border-b border-ldsa-grey py-2"
        >
          <span class="font-semibold text-[12px]">{{ m.motivo }}</span>
          <div class="flex items-center gap-2">
            <span class="text-[11px] font-medium text-ldsa-grey/85">{{
              m.horario
            }}</span>
            <button
              @click="emit('editar', m)"
              class="flex gap-2"
              aria-label="Editar motivo"
            >
              <IconsEdit class="text-ldsa-black hover:text-ldsa-green-1" />
            </button>
            <button
              @click="emit('deletar', m.horario)"
              aria-label="Excluir motivo"
            >
              <IconsExclude
                class="w-3 h-3 text-ldsa-red hover:text-ldsa-red/60"
              />
            </button>
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
