<script setup lang="ts">
import { IconsIconAdd, IconsIconEdit, IconsIconExclude } from '#components';
import { ref } from 'vue';

const fusoHorario = ref([
  'Amazonas - Manaus (GMT-04:00)',
  'Fernando de Noronha (UTC-02:00)',
  'Acre (UTC-05:00)',
]);

const ordem = ref(['Crescente', 'Decrescente']);

const form = ref({
  fusoHorario: null,
  ordem: null,
});

interface Intervalo {
  inicio: string;
  fim: string;
}

interface Periodo {
  nome: string;
  intervalos: Intervalo[];
}

const periodos = ref<Periodo[]>([
  {
    nome: 'Matutino',
    intervalos: [
      { inicio: '07:00', fim: '08:30' },
      { inicio: '08:40', fim: '10:10' },
      { inicio: '10:20', fim: '11:50' },
    ],
  },
  {
    nome: 'Vespertino',
    intervalos: [
      { inicio: '07:00', fim: '08:30' },
      { inicio: '08:40', fim: '10:10' },
      { inicio: '10:20', fim: '11:50' },
    ],
  },
  {
    nome: 'Noturno',
    intervalos: [
      { inicio: '07:00', fim: '08:30' },
      { inicio: '08:40', fim: '10:10' },
      { inicio: '10:20', fim: '11:50' },
    ],
  },
]);

const novosIntervalos = ref<Record<number, Intervalo | null>>({});

function confirmarIntervalo(index: number) {
  const intervalo = novosIntervalos.value[index];
  if (intervalo?.inicio && intervalo?.fim) {
    const periodo = periodos.value[index];
    if (periodo) {
      periodo.intervalos.push({ ...intervalo });
      novosIntervalos.value[index] = null;
    }
    novosIntervalos.value[index] = null;
  }
}

function removerIntervalo(periodoIndex: number, intervaloIndex: number) {
  const periodo = periodos.value[periodoIndex];
  if (periodo) {
    periodo.intervalos.splice(intervaloIndex, 1);
  }
}
</script>

<template>
  <div class="container">
    <div class="mx-auto max-w-[80%] p-10">
      <!-- seçao de selects -->
      <div class="w-2/3">
        <div class="grid grid-cols-1 xl:grid-cols-5 gap-4 w-full m-auto mb-9">
          <VVAutocomplete
            :items="fusoHorario"
            class="w-full xl:col-span-3"
            label="Fuso Horário"
            name="fusoHorario.id"
            placeholder="Selecione um fuso horário"
          />
          <VVAutocomplete
            :items="ordem"
            class="w-full xl:col-span-1"
            label="Ordem"
            name="ordem.id"
            placeholder="Selecione uma ordem"
          />
        </div>
      </div>

      <!-- grid  -->
      <div class="grid grid-cols-1 md:grid-cols-3 divide-x divide-ldsa-grey">
        <div v-for="(periodo, i) in periodos" :key="i" class="px-4">
          <div class="flex justify-between items-center mb-3">
            <h2
              class="font-semibold text-ldsa-text-default text-[13px] border-l-4 border-ldsa-green-1 pl-2"
            >
              {{ periodo.nome }}
            </h2>
            <button
              @click="periodo.intervalos = []"
              class="w-[0.9rem] text-ldsa-text-default hover:text-ldsa-red"
            >
              <IconsIconExclude />
            </button>
          </div>

          <!-- intervalos existentes -->
          <div
            v-for="(intervalo, j) in periodo.intervalos"
            :key="j"
            class="flex items-center justify-between mb-2 p-3 border-b-2 border-ldsa-grey/20"
          >
            <div class="font-medium text-[11px] whitespace-nowrap">
              {{ intervalo.inicio }} - {{ intervalo.fim }}
            </div>
            <div class="flex gap-4 text-sm">
              <button
                class="w-[0.9rem] text-ldsa-text-default hover:text-ldsa-green-1"
              >
                <IconsIconEdit />
              </button>
              <button
                @click="removerIntervalo(i, j)"
                class="w-[0.9rem] text-ldsa-text-default hover:text-ldsa-red"
              >
                <IconsIconExclude />
              </button>
            </div>
          </div>

          <!-- inputs para novo intervalo -->
          <div v-if="novosIntervalos[i]" class="flex gap-2 mt-3 pb-3 border-b border-ldsa-grey">
            <VVTextField
              v-model="novosIntervalos[i].inicio"
              type="time"
              label="Início"
              name="inicio"
              placeholder="00:00"
            />
            <VVTextField
              v-model="novosIntervalos[i].fim"
              type="time"
              label="Término"
              name="fim"
              placeholder="00:00"
            />
            <button
              @click="confirmarIntervalo(i)"
              class="bg-ldsa-green-1 text-white text-[12px] px-3 py-1 rounded"
            >
              <div class="w-[0.7rem] text-ldsa-text-white mb-0.5 font-bold">
                <IconsIconConfirm />
              </div>
            </button>            
          </div>

          <!-- botão novo intervalo -->
          <button
            v-else
            @click="novosIntervalos[i] = { inicio: '', fim: '' }"
            class="mx-auto text-ldsa-grey font-semibold text-[12px] flex items-center gap-1 mt-4"
          >
            Adicionar intervalo
            <div class="w-[0.7rem] text-ldsa-grey mb-0.5">
              <IconsIconAdd />
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(input[type='time']::-webkit-calendar-picker-indicator) {
  display: none;
  -webkit-appearance: none;
}
</style>
