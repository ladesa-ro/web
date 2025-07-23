<script lang="ts" setup>
import { IconsConfirm, UIButtonModalGoBack, UIButtonModalSave } from '#components';
import { ref } from 'vue';

const props = defineProps<{
  motivoAtual: { horario: string; motivo: string };
}>();

const emit = defineEmits<{
  (e: 'fechar'): void;
  (e: 'atualizar', motivoAtualizado: { horario: string; motivo: string }): void;
}>();

const novoMotivo = ref(props.motivoAtual.motivo);

const motivosDisponiveis = [
  'Licença médica',
  'Atividade externa',
  'Reunião',
  'Outro',
];
</script>

<template>
  <div
    class="bg-ldsa-white text-ldsa-black p-7 rounded-lg shadow w-[60vh] h-[60vh] flex flex-col justify-between"
  >
    <div>
      <h2 class="main-title text-[14px] font-semibold mb-6">Editar motivo</h2>

      <div class="mb-4 text-sm">
        <span class="font-medium text-ldsa-grey">Horário:</span>
        <span class="ml-2">{{ motivoAtual.horario }}</span>
      </div>

      <VVAutocomplete
        :items="motivosDisponiveis"
        v-model="novoMotivo"
        placeholder="Digite ou selecione um novo motivo"
        label="Motivo"
        name="motivo"
        class="w-full text-[12px]"
      />
    </div>

    <div class="flex justify-between gap-3 pt-6">
      <UIButtonModalGoBack @click="emit('fechar')" />
      <UIButtonModalSave
        :disabled="!novoMotivo.trim()"
        @click="emit('atualizar', { horario: motivoAtual.horario, motivo: novoMotivo.trim() })"
      />
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
