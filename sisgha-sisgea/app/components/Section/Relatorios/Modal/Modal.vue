<script setup lang="ts">
import { computed } from 'vue';
import RelatorioAula from './Aula/Aula.vue';

const props = defineProps<{
  form: {
    professor: string | null;
    semestre: string | null;
    bimestre: string | null;
    disciplina: string | null;
    curso: string | null;
    turma: string | null;
  };
  onClose: () => void;
}>();

const filtrosUsados = computed(() => {
  const filtros: string[] = [];

  if (props.form.semestre) filtros.push(`Semestre: ${props.form.semestre}`);
  if (props.form.bimestre) filtros.push(`Bimestre: ${props.form.bimestre}`);
  if (props.form.disciplina)
    filtros.push(`Disciplina: ${props.form.disciplina}`);
  if (props.form.curso) filtros.push(`Curso: ${props.form.curso}`);
  if (props.form.turma) filtros.push(`Turma: ${props.form.turma}`);

  return filtros.length ? filtros.join(' | ') : 'Nenhum';
});

const aulasMatematica = [
  { data: '24/04/2024', horario: '7:30 - 8:20' },
  { data: '24/04/2024', horario: '8:20 - 9:10' },
  { data: '26/04/2024', horario: '7:20 - 8:20' },
  { data: '26/04/2024', horario: '8:20 - 9:10' },
];

const aulasPOO = [
  { data: '24/04/2024', horario: '7:30 - 8:20' },
  { data: '24/04/2024', horario: '8:20 - 9:10' },
  { data: '26/04/2024', horario: '7:20 - 8:20' },
  { data: '26/04/2024', horario: '8:20 - 9:10' },
  { data: '26/04/2024', horario: '7:20 - 8:20' },
  { data: '26/04/2024', horario: '8:20 - 9:10' },
];

const aulasRedes = [
  { data: '24/04/2024', horario: '7:30 - 8:20' },
  { data: '24/04/2024', horario: '8:20 - 9:10' },
  { data: '26/04/2024', horario: '7:20 - 8:20' },
  { data: '26/04/2024', horario: '8:20 - 9:10' },
  { data: '26/04/2024', horario: '7:20 - 8:20' },
  { data: '26/04/2024', horario: '8:20 - 9:10' },
];
</script>

<template>
  <div
    class="bg-ldsa-bg text-ldsa-text-default p-10 rounded shadow max-w-xl w-full max-h-[80vh] overflow-y-auto"
  >
    <h2 class="text-lg font-semibold mb-4 flex items-center justify-center">
      Relatório de Aulas Ministradas
    </h2>

    <hr class="divider flex-grow pt-5 border-t border-ldsa-grey" />

    <div class="info flex flex-wrap">
      <p class="text-[12px] mb-2 w-1/2">
        <strong>Professor:</strong> {{ form.professor }}
      </p>
      <p class="text-[12px] mb-2 w-1/2">
        <strong>Filtros:</strong> {{ filtrosUsados }}
      </p>
      <p class="text-[12px] mb-2 w-1/2">
        <strong>Semestre:</strong> {{ form.semestre }}
      </p>
      <p class="text-[12px] mb-2 w-1/2">
        <strong>Campus:</strong> {{ form.curso }} - Ji-Paraná
      </p>
    </div>

    <hr class="divider flex-grow pt-5 border-t border-ldsa-grey" />

    <div class="content">
      <RelatorioAula
        titulo="Matemática - 1º A Informática"
        subtitulo="Possui 4 aulas"
        :aulas="aulasMatematica"
      />

      <RelatorioAula
        titulo="Programação Orientada a Objetos - 2º A Informática"
        subtitulo="Possui 120 aulas"
        :aulas="aulasPOO"
      />

      <RelatorioAula
        titulo="Redes de Computadores - 3º A Informática"
        subtitulo="Possui 54 aulas"
        :aulas="aulasRedes"
      />
    </div>

    <button
      @click="onClose"
      class="mt-4 px-4 py-2 bg-ldsa-green-1 text-white rounded text-[12px]"
    >
      Fechar
    </button>
  </div>
</template>
