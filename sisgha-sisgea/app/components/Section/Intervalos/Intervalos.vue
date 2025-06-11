<script setup lang="ts">
import IntervaloSelectForm from '@/components/Section/Intervalos/Form/SelectForm.vue';
import PeriodosGrid from '@/components/Section/Intervalos/Layout/Grid.vue';
import { ref, watch } from 'vue';

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

const intervaloEditando = ref<{
  periodoIndex: number;
  intervaloIndex: number;
  dados: { inicio: string; fim: string };
} | null>(null);

watch(
  () => form.value.ordem,
  (novaOrdem) => {
    if (!novaOrdem) return;

    periodos.value.forEach((periodo) => {
      periodo.intervalos.sort((a, b) => {
        const horaA = a.inicio;
        const horaB = b.inicio;
        return novaOrdem === 'Crescente'
          ? horaA.localeCompare(horaB)
          : horaB.localeCompare(horaA);
      });
    });
  }
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
  const algumAberto = novosIntervalos.value.some((intervalo, idx) => intervalo !== null && idx !== index);

  if (algumAberto) {
    novosIntervalos.value = novosIntervalos.value.map(() => null);
  }

  if (novosIntervalos.value[index] == null) {
    novosIntervalos.value[index] = { inicio: '', fim: '' };
  }
}

function atualizarNovoIntervalo(
  index: number,
  val: { inicio: string; fim: string }
) {
  novosIntervalos.value[index] = val;
}

function editarIntervalo(i: number, j: number) {
  if (intervaloEditando.value !== null) {
    return;
  }
  const periodo = periodos.value[i];
  const intervalo = periodo?.intervalos?.[j];
  if (!intervalo) return;
  intervaloEditando.value = {
    periodoIndex: i,
    intervaloIndex: j,
    dados: { ...intervalo },
  };
}

function cancelarEdicao() {
  intervaloEditando.value = null;
}

function atualizarEdicao(val: { inicio: string; fim: string }) {
  if (!intervaloEditando.value) return;
  intervaloEditando.value.dados = val;
}

function confirmarEdicao() {
  const edit = intervaloEditando.value;
  if (!edit) return;

  const periodo = periodos.value[edit.periodoIndex];
  if (!periodo?.intervalos?.[edit.intervaloIndex]) return;

  periodo.intervalos[edit.intervaloIndex] = { ...edit.dados };
  intervaloEditando.value = null;
}
</script>

<template>
  <div class="mx-auto w-full max-w-[85%] px-4 sm:px-6 md:px-10 py-6">
    <IntervaloSelectForm
      :fusoHorario="fusoHorario"
      :ordem="ordem"
      v-model:ordem-selecionada="form.ordem"
    />

    <PeriodosGrid
      :periodos="periodos"
      :novos-intervalos="novosIntervalos"
      :intervalo-editando="intervaloEditando"
      @confirmNovo="confirmarIntervalo"
      @removeIntervalo="removerIntervalo"
      @add="adicionarIntervalo"
      @updateNovoIntervalo="atualizarNovoIntervalo"
      @edit="editarIntervalo"
      @cancelEdit="cancelarEdicao"
      @updateEdit="atualizarEdicao"
      @confirmEdit="confirmarEdicao"
    />
  </div>
</template>
