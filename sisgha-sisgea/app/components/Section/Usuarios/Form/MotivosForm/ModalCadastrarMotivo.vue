<script lang="ts" setup>
import { computed, ref } from 'vue';
import { capitalizeFirst } from '../../../Horario/-Helpers/CapitalizeFirst';
import { IconsConfirm } from '#components';

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
    class="bg-ldsa-white text-ldsa-black p-8 rounded-lg shadow w-[60vh] h-[80vh] overflow-y-auto mr-10"
  >
    <h2 class="main-title text-sm font-semibold mb-4 pr-3">
      Cadastrar Motivos de Indisponibilidade
    </h2>

    <div
      v-if="props.horariosSemMotivo.length === 0"
      class="text-center text-sm text-ldsa-grey"
    >
      Todos os horários já possuem um motivo.
    </div>

    <form
      v-else
      @submit.prevent="submit"
      class="flex flex-col gap-6 justify-between"
    >
      <!-- checkbox de horarios -->
      <v-expansion-panel-text>
        <section class="flex justify-between">
          <div v-for="shift in dayShifts" :key="shift.title">
            <h1>{{ capitalizeFirst(shift.title) }}</h1>

            <div v-for="time in shift.times" :key="time" class="mb-2">
              <label
                class="inline-flex items-center gap-2 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  :value="time"
                  v-model="selectedTimes"
                  class="form-checkbox"
                />
                {{ time }}
              </label>
            </div>
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
            placeholder="Selecione um motivo"
            label="Motivo"
            name="motivo"
            class="w-full"
          />
        </div>
        <button
          type="submit"
          :disabled="!podeCadastrar"          
          class="flex justify-between items-center gap-2 border-2 border-ldsa-green-1 text-ldsa-green-1 px-10 py-3 rounded-lg w-full text-sm font-semibold hover:bg-ldsa-green-1/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Registrar motivo para horário selecionado
          <IconsConfirm class="w-4 h-4" />
        </button>
      </div>

      <div class="flex justify-start gap-3 pt-4">
        <button
          type="button"
          @click="emit('fechar')"
          class="px-4 py-2 text-sm rounded border border-gray-400 hover:bg-gray-100"
        >
          Voltar
        </button>
      </div>
    </form>
  </div>
  
  <div
    class="bg-ldsa-white text-ldsa-black p-8 rounded-lg shadow w-[70vh] h-[80vh] overflow-y-auto"
  >
    <h2 class="main-title text-lg font-semibold mb-4">
      Motivos pendentes de confirmação
    </h2>

    <div
      class="text-center text-sm text-ldsa-grey"
    >
      Ainda não há motivos pendentes de confirmação
    </div>

    <!-- seção de botões -->
  </div>
</template>

<style scoped>
.main-title::before {
  content: '';
  border: 2px solid var(--ladesa-green-1-color);
  margin-right: 0.5rem;
}
</style>
