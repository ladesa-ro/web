<script setup lang="ts">
import type {
  DiarioPreferenciaAgrupamentoModo,
  IPreferenciaAgrupamento,
} from '../../../Contexto';
import { useContextDiariosFormGeral } from '../../../Contexto';

const props = defineProps<{
  index: number;
}>();

const contexto = useContextDiariosFormGeral();

const dcRef = computed(() => contexto.disciplinasConfig.value[props.index]);

function getDc() {
  const val = dcRef.value;
  if (!val) throw new Error('Disciplina config not found');
  return val;
}

const modo = computed({
  get: () => dcRef.value?.modoAgrupamento ?? 'DEFINIDO',
  set: (val: DiarioPreferenciaAgrupamentoModo) => {
    const dc = getDc();
    dc.modoAgrupamento = val;
    dc.preferenciasAgrupamento = dc.preferenciasAgrupamento.map(
      (p) => ({ ...p, modo: val })
    );
  },
});

const prefs = computed(
  () => dcRef.value?.preferenciasAgrupamento ?? []
);

const diasSemana = [
  { value: 1, label: 'Segunda' },
  { value: 2, label: 'Terça' },
  { value: 3, label: 'Quarta' },
  { value: 4, label: 'Quinta' },
  { value: 5, label: 'Sexta' },
  { value: 6, label: 'Sábado' },
  { value: 7, label: 'Domingo' },
];

function adicionarDia() {
  const dc = getDc();
  const novaOrdem = dc.preferenciasAgrupamento.length + 1;
  const novaPref: IPreferenciaAgrupamento = {
    modo: modo.value,
    ordem: novaOrdem,
    diaSemanaIso: modo.value === 'POR_DIA_SEMANA' ? 1 : null,
    aulasSeguidas: 1,
    dataInicio: '',
    dataFim: null,
  };
  dc.preferenciasAgrupamento.push(novaPref);
}

function removerDia(prefIndex: number) {
  const dc = getDc();
  dc.preferenciasAgrupamento.splice(prefIndex, 1);
  dc.preferenciasAgrupamento.forEach((p, i) => {
    p.ordem = i + 1;
  });
}

function incrementarAulas(prefIndex: number) {
  const dc = getDc();
  const pref = dc.preferenciasAgrupamento[prefIndex];
  if (pref) pref.aulasSeguidas++;
}

function decrementarAulas(prefIndex: number) {
  const dc = getDc();
  const pref = dc.preferenciasAgrupamento[prefIndex];
  if (pref && pref.aulasSeguidas > 1) {
    pref.aulasSeguidas--;
  }
}

function setDiaSemana(prefIndex: number, dia: number) {
  const dc = getDc();
  const pref = dc.preferenciasAgrupamento[prefIndex];
  if (pref) pref.diaSemanaIso = dia;
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <!-- Loading -->
    <div
      v-if="contexto.isLoadingEdit.value"
      class="flex items-center justify-center py-6"
    >
      <span class="text-sm text-ldsa-grey/100 animate-pulse">Carregando dias de aula...</span>
    </div>

    <template v-else>
    <!-- Toggle modo -->
    <div class="flex items-center gap-2 text-xs">
      <button
        class="px-3 py-1 rounded-full border transition-colors"
        :class="
          modo === 'DEFINIDO'
            ? 'bg-ldsa-green-1 text-white border-ldsa-green-1'
            : 'border-ldsa-grey/100 text-ldsa-text-default'
        "
        @click="modo = 'DEFINIDO'"
      >
        Simples
      </button>
      <button
        class="px-3 py-1 rounded-full border transition-colors"
        :class="
          modo === 'POR_DIA_SEMANA'
            ? 'bg-ldsa-green-1 text-white border-ldsa-green-1'
            : 'border-ldsa-grey/100 text-ldsa-text-default'
        "
        @click="modo = 'POR_DIA_SEMANA'"
      >
        Por dia da semana
      </button>
    </div>

    <!-- Lista de dias -->
    <div
      v-for="(pref, prefIndex) in prefs"
      :key="prefIndex"
      class="flex items-center gap-3 border-2 border-ldsa-grey/100 rounded-lg overflow-hidden"
    >
      <!-- Badge do dia -->
      <div
        v-if="modo === 'DEFINIDO'"
        class="bg-ldsa-green-1 text-white font-semibold text-xs px-4 py-3 min-w-[70px] text-center"
      >
        Dia {{ pref.ordem }}
      </div>

      <!-- Selector dia da semana -->
      <select
        v-if="modo === 'POR_DIA_SEMANA'"
        :value="pref.diaSemanaIso ?? 1"
        class="bg-ldsa-green-1 text-white font-semibold text-xs px-2 py-3 min-w-[100px] border-none"
        @change="
          setDiaSemana(
            prefIndex,
            Number(($event.target as HTMLSelectElement).value)
          )
        "
      >
        <option
          v-for="dia in diasSemana"
          :key="dia.value"
          :value="dia.value"
        >
          {{ dia.label }}
        </option>
      </select>

      <!-- Stepper de aulas -->
      <div class="flex items-center gap-3 flex-1 justify-center">
        <button
          class="p-1"
          :disabled="pref.aulasSeguidas <= 1"
          @click="decrementarAulas(prefIndex)"
        >
          <IconsArrow class="w-3 h-3 rotate-90" />
        </button>
        <span class="font-semibold text-xs">
          Total de aulas: {{ pref.aulasSeguidas }}
        </span>
        <button class="p-1" @click="incrementarAulas(prefIndex)">
          <IconsArrow class="w-3 h-3 -rotate-90" />
        </button>
      </div>

      <!-- Remover -->
      <button
        class="p-2 mr-2"
        @click="removerDia(prefIndex)"
      >
        <span class="text-ldsa-grey/100 text-xs">&#10005;</span>
      </button>
    </div>

    <!-- Botão adicionar dia -->
    <button
      class="flex items-center justify-center gap-1 border-2 border-dashed border-ldsa-grey/100 rounded-lg py-3 text-sm font-semibold text-ldsa-text-default cursor-pointer hover:bg-gray-50 transition-colors"
      @click="adicionarDia"
    >
      Adicionar dia +
    </button>
    </template>
  </div>
</template>
