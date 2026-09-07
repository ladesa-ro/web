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
    dc.preferenciasAgrupamento = dc.preferenciasAgrupamento.map(p => ({
      ...p,
      modo: val,
    }));
  },
});

const prefs = computed(() => dcRef.value?.preferenciasAgrupamento ?? []);

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
  <div class="u-flex u-flex-col u-gap-3">
    <!-- Loading -->
    <div
      v-if="contexto.isLoadingEdit.value"
      class="u-flex u-items-center u-justify-center dias-de-aula__loading"
    >
      <span class="u-text-sm dias-de-aula__loading-text"
        >Carregando dias de aula...</span
      >
    </div>

    <template v-else>
      <!-- Toggle modo -->
      <div class="u-flex u-items-center u-gap-2 u-text-xs">
        <button
          class="dias-de-aula__modo-toggle"
          :class="{ 'dias-de-aula__modo-toggle--active': modo === 'DEFINIDO' }"
          @click="modo = 'DEFINIDO'"
        >
          Simples
        </button>
        <button
          class="dias-de-aula__modo-toggle"
          :class="{
            'dias-de-aula__modo-toggle--active': modo === 'POR_DIA_SEMANA',
          }"
          @click="modo = 'POR_DIA_SEMANA'"
        >
          Por dia da semana
        </button>
      </div>

      <!-- Lista de dias -->
      <div
        v-for="(pref, prefIndex) in prefs"
        :key="prefIndex"
        class="u-flex u-items-center u-gap-3 u-rounded-lg u-overflow-hidden dias-de-aula__row"
      >
        <!-- Badge do dia -->
        <div
          v-if="modo === 'DEFINIDO'"
          class="u-font-semibold u-text-xs u-text-center dias-de-aula__badge"
        >
          Dia {{ pref.ordem }}
        </div>

        <!-- Selector dia da semana -->
        <select
          v-if="modo === 'POR_DIA_SEMANA'"
          :value="pref.diaSemanaIso ?? 1"
          class="u-font-semibold u-text-xs dias-de-aula__select"
          @change="
            setDiaSemana(
              prefIndex,
              Number(($event.target as HTMLSelectElement).value)
            )
          "
        >
          <option v-for="dia in diasSemana" :key="dia.value" :value="dia.value">
            {{ dia.label }}
          </option>
        </select>

        <!-- Stepper de aulas -->
        <div class="u-flex u-items-center u-gap-3 u-flex-1 u-justify-center">
          <button
            class="u-p-1"
            :disabled="pref.aulasSeguidas <= 1"
            @click="decrementarAulas(prefIndex)"
          >
            <IconsArrow class="dias-de-aula__stepper-icon dias-de-aula__stepper-icon--down" />
          </button>
          <span class="u-font-semibold u-text-xs">
            Total de aulas: {{ pref.aulasSeguidas }}
          </span>
          <button class="u-p-1" @click="incrementarAulas(prefIndex)">
            <IconsArrow class="dias-de-aula__stepper-icon dias-de-aula__stepper-icon--up" />
          </button>
        </div>

        <!-- Remover -->
        <button class="dias-de-aula__remove" @click="removerDia(prefIndex)">
          <span class="u-text-xs dias-de-aula__remove-icon">&#10005;</span>
        </button>
      </div>

      <!-- Botão adicionar dia -->
      <button
        class="u-flex u-items-center u-justify-center u-gap-1 u-rounded-lg u-py-3 u-text-sm u-font-semibold dias-de-aula__add"
        @click="adicionarDia"
      >
        Adicionar dia +
      </button>
    </template>
  </div>
</template>

<style scoped>
.dias-de-aula__loading {
  padding-block: var(--ui-space-6);
}

.dias-de-aula__loading-text {
  color: rgb(from var(--ladesa-grey-color) R G B / 100%);
  animation: dias-de-aula-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes dias-de-aula-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.dias-de-aula__modo-toggle {
  padding: var(--ui-space-1) var(--ui-space-3);
  border-radius: var(--ui-radius-full);
  border: 1px solid rgb(from var(--ladesa-grey-color) R G B / 100%);
  color: var(--ladesa-text-default-color);
  background-color: transparent;
  transition: color var(--ui-duration-base) var(--ui-easing-standard),
    background-color var(--ui-duration-base) var(--ui-easing-standard),
    border-color var(--ui-duration-base) var(--ui-easing-standard);
}

.dias-de-aula__modo-toggle--active {
  background-color: var(--ladesa-green-1-color);
  border-color: var(--ladesa-green-1-color);
  color: var(--ladesa-white-color);
}

.dias-de-aula__row {
  border: 2px solid rgb(from var(--ladesa-grey-color) R G B / 100%);
}

.dias-de-aula__badge {
  background-color: var(--ladesa-green-1-color);
  color: var(--ladesa-white-color);
  padding: var(--ui-space-3) var(--ui-space-4);
  min-width: 4.375rem;
}

.dias-de-aula__select {
  background-color: var(--ladesa-green-1-color);
  color: var(--ladesa-white-color);
  padding: var(--ui-space-3) var(--ui-space-2);
  min-width: 6.25rem;
  border: none;
}

.dias-de-aula__stepper-icon {
  width: var(--ui-space-3);
  height: var(--ui-space-3);
}

.dias-de-aula__stepper-icon--down {
  transform: rotate(90deg);
}

.dias-de-aula__stepper-icon--up {
  transform: rotate(-90deg);
}

.dias-de-aula__remove {
  padding: var(--ui-space-2);
  margin-right: var(--ui-space-2);
}

.dias-de-aula__remove-icon {
  color: rgb(from var(--ladesa-grey-color) R G B / 100%);
}

.dias-de-aula__add {
  border: 2px dashed rgb(from var(--ladesa-grey-color) R G B / 100%);
  color: var(--ladesa-text-default-color);
  cursor: pointer;
  transition: background-color var(--ui-duration-base) var(--ui-easing-standard);
}

.dias-de-aula__add:hover {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 10%);
}
</style>
