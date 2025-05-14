<script setup lang="ts">
import { IconsIconExclude, IconsIconEdit, IconsIconAdd } from '#components';
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
  { nome: 'Matutino', intervalos: [{ inicio: '00:00', fim: '00:00' }] },
  { nome: 'Vespertino', intervalos: [{ inicio: '00:00', fim: '00:00' }] },
  { nome: 'Noturno', intervalos: [{ inicio: '00:00', fim: '00:00' }] },
]);
</script>

<template>
  <div class="container">
    <div class="mx-auto max-w-[80%] p-10">
      <!-- seçao de selects -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 w-full m-auto mb-6">
        <VVAutocomplete
          :items="fusoHorario"
          class="w-full xl:col-span-2"
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

      <!-- grid  -->
      <div
        class="grid grid-cols-1 md:grid-cols-3 divide-x divide-ldsa-grey w-full"
      >
        <div v-for="(periodo, i) in periodos" :key="i" class="px-4">
          <div class="flex justify-between items-center mb-3">
            <h2
              class="font-semibold text-ldsa-text-default text-[13px] border-l-4 border-ldsa-green-1 pl-2"
            >
              {{ periodo.nome }}
            </h2>
            <button
              @click="periodo.intervalos = []"
              class="w-[0.9rem] text-ldsa-text-default"
            >
              <IconsIconExclude />
            </button>
          </div>
          <!-- intervalos -->
          <div
            v-for="(intervalo, j) in periodo.intervalos"
            :key="j"
            class="flex items-center justify-between mb-2"
          >
            <div class="text-sm whitespace-nowrap">
              {{ intervalo.inicio }} - {{ intervalo.fim }}
            </div>
            <div class="flex gap-2 text-sm">
              <button class="w-[0.9rem] text-ldsa-text-default">
                <IconsIconEdit/>
              </button>
              <button class="w-[0.9rem] text-ldsa-text-default">
                <IconsIconExclude />
              </button>
            </div>
          </div>
          <button class="text-ldsa-grey font-semibold text-[12px] flex items-center gap-1 mt-4">
            Adicionar intervalo <div class="w-[0.7rem] text-ldsa-grey mb-0.5"><IconsIconAdd/></div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
