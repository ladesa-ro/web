<script setup lang="ts">
import IntervaloSelectForm from '@/components/Section/Intervalos/Form/SelectForm.vue';
import PeriodosGrid from '@/components/Section/Intervalos/Layout/Grid.vue';
import { ref } from 'vue';

const fusoHorario = ref([
  'Amazonas - Manaus (GMT-04:00)',
  'Fernando de Noronha (UTC-02:00)',
  'Acre (UTC-05:00)',
]);

const ordem = ref(['Crescente', 'Decrescente']);

const form = ref({ fusoHorario: null, ordem: null });

const periodos = ref([
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
      { inicio: '13:00', fim: '14:30' },
      { inicio: '14:40', fim: '16:10' },
      { inicio: '16:20', fim: '17:50' },
    ],
  },
  {
    nome: 'Noturno',
    intervalos: [
      { inicio: '18:30', fim: '20:00' },
      { inicio: '20:10', fim: '21:40' },
      { inicio: '21:50', fim: '23:20' },
    ],
  },
]);

const novosIntervalos = ref<({ inicio: string; fim: string } | null)[]>(
  periodos.value.map(() => null)
);

function confirmarIntervalo(index: number) {
  const intervalo = novosIntervalos.value[index];
  const periodo = periodos.value[index];
  if (!intervalo || !periodo) return;
  if (intervalo.inicio && intervalo.fim) {
    periodo.intervalos.push({ ...intervalo });
    novosIntervalos.value[index] = null;
  }
}

function removerIntervalo(i: number, j: number) {
  const periodo = periodos.value[i];
  if (!periodo) return;
  periodo.intervalos.splice(j, 1);
}

function adicionarIntervalo(index: number) {
  if (novosIntervalos.value[index] == null) {
    novosIntervalos.value[index] = { inicio: '', fim: '' };
  }
}

function limparPeriodos(index: number) {
  const periodo = periodos.value[index];
  if (!periodo) return;
  periodo.intervalos = [];
}

function atualizarNovoIntervalo(
  index: number,
  val: { inicio: string; fim: string }
) {
  novosIntervalos.value[index] = val;
}
</script>

<template>
  <div class="mx-auto max-w-[85%] p-10">
    <IntervaloSelectForm :fusoHorario="fusoHorario" :ordem="ordem" />

    <PeriodosGrid
      :periodos="periodos"
      :novos-intervalos="novosIntervalos"
      @confirmNovo="confirmarIntervalo"
      @removeIntervalo="removerIntervalo"
      @add="adicionarIntervalo"
      @limparPeriodos="limparPeriodos"
      @updateNovoIntervalo="atualizarNovoIntervalo"
    />
  </div>
</template>
