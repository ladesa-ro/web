<script lang="ts" setup>
import {
  UIButtonModalCancel,
  UIButtonModalDelete,
  UIButtonModalSave,
} from '#components';
import { ref } from 'vue';

const props = defineProps<{
  motivoAtual: { horario: string; motivo: string };
}>();

const emit = defineEmits<{
  (e: 'fechar'): void;
  (e: 'atualizar', motivoAtualizado: { horario: string; motivo: string }): void;
  (e: 'deletar', horario: string): void;
}>();

const novoMotivo = ref(props.motivoAtual.motivo);

const motivosDisponiveis = [
  'Licença médica',
  'Atividade externa',
  'Reunião',
  'Outro',
];

const horariosPorDia: Record<string, string[]> = {
  Segunda: ['07:30', '08:20', '13:00', '13:50'],
  Terça: ['09:10', '10:00', '14:40', '15:30'],
  Quarta: ['10:20', '11:10', '15:50', '16:40'],
  Quinta: ['19:00', '19:50', '20:40'],
  Sexta: ['21:30', '21:50', '22:40'],
};

function getDiaDaSemanaPorHorario(horario: string): string | null {
  for (const [dia, horarios] of Object.entries(horariosPorDia)) {
    if (horarios.includes(horario)) {
      return dia;
    }
  }
  return null;
}

const diaDaSemana = getDiaDaSemanaPorHorario(props.motivoAtual.horario);
</script>

<template>
  <div
    class="bg-ldsa-white text-ldsa-black p-7 rounded-lg shadow w-full max-w-[30rem] h-[80vh] flex flex-col justify-between"
  >
    <div>
      <h2 class="main-title text-[14px] font-semibold mb-6">
        Editar motivos de indisponibilidade
      </h2>

      <VVAutocomplete
        :items="motivosDisponiveis"
        v-model="novoMotivo"
        placeholder="Digite ou selecione um novo motivo"
        label="Motivo"
        name="motivo"
        class="w-full text-[12px]"
      />

      <div
        class="flex justify-between items-center border-b border-ldsa-grey py-2 text-[12px] font-semibold mt-4"
      >
        <span class="">{{
          diaDaSemana ? `${diaDaSemana}-feira` : 'Desconhecido'
        }}</span>
        <span class="border-b-2 border-ldsa-green-1 px-1">{{
          motivoAtual.horario
        }}</span>
      </div>
    </div>

    <div class="flex justify-between gap-1 pt-6 w-full">
      <UIButtonModalCancel @click="emit('fechar')" />
      <UIButtonModalDelete @click="emit('deletar', motivoAtual.horario)" />
      <UIButtonModalSave
        :disabled="!novoMotivo.trim()"
        @click="
          emit('atualizar', {
            horario: motivoAtual.horario,
            motivo: novoMotivo.trim(),
          })
        "
      />
    </div>
  </div>

  <div
    class="bg-ldsa-white text-ldsa-black p-7 rounded-lg shadow w-[60vh] h-[80vh] flex flex-col justify-between ml-5"
  >
    <div>
      <h2 class="main-title text-[14px] font-semibold mb-6">
        Editar horários do motivo
      </h2>
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
