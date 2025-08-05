<script lang="ts" setup>
import {
  IconsConfirm,
  IconsExclude,
  UIButtonModalDelete,
  UIButtonModalGoBack,
  UIButtonModalSave,
  UIWeekdaySelector,
} from '#components';
import { computed, ref } from 'vue';
import { capitalizeFirst } from '../../../Horario/-Helpers/CapitalizeFirst';
import { getWeekDays } from '../../../Horario/-Helpers/GetWeekDays';

const props = defineProps<{
  horariosSemMotivo: string[];
}>();

import { watch } from 'vue';

watch(
  () => props.horariosSemMotivo,
  val => {
    console.log('horariosSemMotivo:', val);
  },
  { immediate: true }
);

const emit = defineEmits<{
  (e: 'fechar'): void;
  (e: 'cadastrar', horario: string, motivo: string): void;
}>();

const selectedTimes = ref<string[]>([]);
const motivos = ref<Record<string, string>>({});
const pendentes = ref<{ horario: string; motivo: string }[]>([]);

const currentDay = useCurrentDay();
const week = getWeekDays(currentDay.value);
const weekDays = week.map(day => day.dayWeek);
const selectedDayWeek = ref(weekDays[0]);

const motivosDisponiveis = [
  'Licença médica',
  'Atividade externa',
  'Reunião',
  'Outro',
];

const podeRegistrar = computed(
  () =>
    selectedTimes.value.length > 0 &&
    selectedTimes.value.every(h => (motivos.value[h] ?? '').trim().length > 0)
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
function registrarMotivos() {
  selectedTimes.value.forEach(horario => {
    const motivo = motivos.value[horario]?.trim();
    if (motivo && !pendentes.value.some(m => m.horario === horario)) {
      pendentes.value.push({ horario, motivo });
    }
  });
  selectedTimes.value = [];
  motivos.value = {};
}

function confirmarTodos() {
  pendentes.value.forEach(m => {
    emit('cadastrar', m.horario, m.motivo);
  });
  emit('fechar');
}

function cancelarTodos() {
  pendentes.value = [];
}

function excluirMotivo(horario: string) {
  pendentes.value = pendentes.value.filter(m => m.horario !== horario);
}
</script>

<template>
  <div class="flex">
    <div
      class="flex flex-col justify-between bg-ldsa-white text-ldsa-black p-7 rounded-lg shadow w-[60vh] h-[80vh] mr-10"
    >
      <div class="overflow-y-auto pr-2">
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
          @submit.prevent="registrarMotivos"
          class="flex flex-col gap-5"
        >
          <UIWeekdaySelector
            :items="weekDays"
            v-model="selectedDayWeek"
            class="font-semibold mb-1"
          />
          <!-- checkbox de horários -->
          <v-expansion-panels model-value="0">
            <v-expansion-panel class="h-full">
              <v-expansion-panel-text>
                <section class="flex gap-6 justify-between">
                  <div v-for="shift in dayShifts" :key="shift.title">
                    <h1 class="mb-2">
                      {{ capitalizeFirst(shift.title) }}
                    </h1>
                    <UICheckbox
                      :items="shift.times"
                      v-model="selectedTimes"
                      :disabled-items="
                        shift.times.filter(
                          time => !props.horariosSemMotivo.includes(time)
                        )
                      "
                    />
                  </div>
                </section>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>

          <!-- inputs de motivo -->
          <div v-if="selectedTimes.length > 0" class="flex flex-col gap-4">
            <div
              v-for="horario in selectedTimes"
              :key="horario"
              class="flex flex-col gap-2"
            >
              <label class="text-[12px] font-medium text-ldsa-grey"
                >Motivo para {{ horario }}</label
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
              :disabled="!podeRegistrar"
              class="flex justify-between items-center gap-2 border-2 border-ldsa-green-1 text-ldsa-green-1 px-3 py-3.5 rounded-lg w-full text-[12px] font-medium hover:bg-ldsa-green-1/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Registrar motivo para horário selecionado
              <IconsConfirm class="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      <div class="pt-6">
        <UIButtonModalGoBack @click="emit('fechar')" />
      </div>
    </div>

    <div
      class="flex flex-col justify-between bg-ldsa-white text-ldsa-black p-7 rounded-lg shadow w-[60vh] h-[80vh]"
    >
      <div class="overflow-y-auto pr-3">
        <h2 class="main-title text-sm font-semibold mb-4">
          Motivos pendentes de confirmação
        </h2>

        <div
          v-if="pendentes.length === 0"
          class="flex items-center justify-center text-center text-sm text-ldsa-grey"
        >
          Ainda não há motivos pendentes de confirmação
        </div>

        <ul v-else class="space-y-2 text-sm">
          <li
            v-for="m in pendentes"
            :key="m.horario"
            class="flex justify-between items-center py-3 border-b-1 border-ldsa-grey"
          >
            <div class="flex justify-between w-full items-center">
              <span class="font-semibold text-[12px]">{{ m.motivo }}</span>

              <div class="flex items-center gap-2">
                <span class="font-medium text-[12px] text-ldsa-grey">{{
                  m.horario
                }}</span>
                <button
                  @click="excluirMotivo(m.horario)"
                  class="text-red-500 hover:text-red-700"
                  aria-label="Excluir motivo"
                >
                  <IconsExclude class="w-3 h-3" />
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="flex justify-between gap-3 pt-6">
        <UIButtonModalDelete
          :disabled="pendentes.length === 0"
          @click="cancelarTodos"
        />
        <UIButtonModalSave
          :disabled="pendentes.length === 0"
          @click="confirmarTodos"
        />
      </div>
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
