<script lang="ts" setup>
import {
  IconsConfirm,
  UIButtonModalDelete,
  UIButtonModalGoBack,
  UIButtonModalSave,
} from '#components';
import { computed, ref } from 'vue';
import { capitalizeFirst } from '../../../Horario/-Helpers/CapitalizeFirst';

const props = defineProps<{
  horariosSemMotivo: string[];
}>();

const emit = defineEmits<{
  (e: 'fechar'): void;
  (e: 'cadastrar', horario: string, motivo: string): void;
}>();

const selectedTimes = ref<string[]>([]);
const motivos = ref<Record<string, string>>({});

const podeCadastrar = computed(
  () =>
    selectedTimes.value.length > 0 &&
    selectedTimes.value.every(
      horario => (motivos.value[horario] ?? '').trim().length > 0
    )
);

const dayShifts = [
  {
    title: 'matutino',
    times: ['07:30', '08:20', '09:10', '10:00', '10:20', '11:10'],
  },
  {
    title: 'vespertino',
    times: ['13:00', '13:50', '14:40', '15:30', '15:50', '16:40'],
  },
  {
    title: 'noturno',
    times: ['19:00', '19:50', '20:40', '21:30', '21:50', '22:40'],
  },
];

const motivosDisponiveis = [
  'Licença médica',
  'Atividade externa',
  'Reunião',
  'Outro',
];

function submit() {
  selectedTimes.value.forEach(horario => {
    const motivo = motivos.value[horario]?.trim();
    if (motivo) {
      emit('cadastrar', horario, motivo);
    }
  });
  emit('fechar');
}
</script>

<template>
  <div
    class="bg-ldsa-white text-ldsa-black p-8 rounded-lg shadow w-[65vh] h-[80vh] flex flex-col justify-between mr-10"
  >
    <div class="overflow-y-auto flex-grow">
      <h2 class="main-title text-sm font-semibold mb-4 pr-3">
        Cadastrar Motivos de Indisponibilidade
      </h2>

      <div
        v-if="props.horariosSemMotivo.length === 0"
        class="text-center text-sm text-ldsa-grey"
      >
        Todos os horários já possuem um motivo.
      </div>

      <form v-else @submit.prevent="submit" class="flex flex-col gap-6">
        <!-- checkbox de horarios -->
        <v-expansion-panel-text>
          <section class="flex gap-6 justify-between">
            <div v-for="shift in dayShifts" :key="shift.title">
              <h1>{{ capitalizeFirst(shift.title) }}</h1>
              <UICheckbox :items="shift.times" v-model="selectedTimes" />
            </div>
          </section>
        </v-expansion-panel-text>

        <!-- select de motivo -->
        <div v-if="selectedTimes.length > 0" class="flex flex-col gap-4">
          <div
            v-for="horario in selectedTimes"
            :key="horario"
            class="flex flex-col gap-2"
          >
            <VVAutocomplete
              :items="motivosDisponiveis"
              v-model="motivos[horario]"
              placeholder="Digite ou selecione um motivo"
              label="Motivo"
              name="motivo"
              class="w-full text-[12px]"
            />
          </div>

          <button
            type="submit"
            :disabled="!podeCadastrar"
            class="flex justify-between items-center gap-2 border-2 border-ldsa-green-1 text-ldsa-green-1 px-5 py-3.5 rounded-lg w-full text-[12px] font-medium hover:bg-ldsa-green-1/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Registrar motivo para horário selecionado
            <IconsConfirm class="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>

    <div class="flex justify-start gap-3 pt-6">
      <UIButtonModalGoBack @click="emit('fechar')" />
    </div>
  </div>

  <div
    class="bg-ldsa-white text-ldsa-black p-8 rounded-lg shadow w-[70vh] h-[80vh] flex flex-col justify-between"
  >
    <h2 class="main-title text-lg font-semibold mb-4">
      Motivos pendentes de confirmação
    </h2>

    <div class="flex-grow overflow-y-auto flex items-center justify-center">
      <div class="text-center text-sm text-ldsa-grey">
        Ainda não há motivos pendentes de confirmação
      </div>
    </div>

    <div class="flex justify-between gap-3 pt-6">
      <UIButtonModalDelete :disabled="!podeCadastrar" @click="emit('fechar')" />
      <UIButtonModalSave :disabled="!podeCadastrar" @click="submit" />
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
