<script setup lang="ts">
import RelatorioAula from './Aula/Aula.vue';

const props = defineProps<{
  form: {
    professor: { id: string | null };
    calendarioLetivo: { id: string | null };
    etapa: { id: string | null };
    disciplina: { id: string | null };
    curso: { id: string | null };
    turma: { id: string | null };
  };
  onClose: () => void;
}>();

const filtrosUsados = computed(() => {
  const filtros: string[] = [];

  if (props.form.calendarioLetivo?.id) filtros.push('Calendário selecionado');
  if (props.form.etapa?.id) filtros.push('Etapa selecionada');
  if (props.form.disciplina?.id) filtros.push('Disciplina selecionada');
  if (props.form.curso?.id) filtros.push('Curso selecionado');
  if (props.form.turma?.id) filtros.push('Turma selecionada');

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
  { data: '26/04/2024', horario: '8:20 - 9:10' },
];
</script>

<template>
  <div
    class="bg-ldsa-bg text-ldsa-text-default p-12 rounded shadow w-[120vh] max-h-[80vh] overflow-y-auto"
  >
    <h2 class="text-lg font-semibold mb-4 flex items-center justify-center">
      Relatório de Aulas Ministradas
    </h2>

    <hr class="divider flex-grow pt-5 border-t border-ldsa-grey" />

    <div class="info flex flex-wrap">
      <p class="text-[12px] mb-2 w-1/2">
        <strong>Professor:</strong> {{ form.professor?.id ?? '—' }}
      </p>
      <p class="text-[12px] mb-2 w-1/2">
        <strong>Filtros:</strong> {{ filtrosUsados }}
      </p>
      <p class="text-[12px] mb-2 w-1/2">
        <strong>Calendário:</strong> {{ form.calendarioLetivo?.id ?? '—' }}
      </p>
      <p class="text-[12px] mb-2 w-1/2"><strong>Campus:</strong> —</p>
    </div>

    <hr class="divider flex-grow pt-5 border-t border-ldsa-grey" />

    <div class="content">
      <RelatorioAula
        titulo="Matemática - 1º A Informática"
        :subtitulo="`Possui ${aulasMatematica.length} aulas`"
        :aulas="aulasMatematica"
      />

      <RelatorioAula
        titulo="Programação Orientada a Objetos - 2º A Informática"
        :subtitulo="`Possui ${aulasRedes.length} aulas`"
        :aulas="aulasPOO"
      />

      <RelatorioAula
        titulo="Redes de Computadores - 3º A Informática"
        :subtitulo="`Possui ${aulasPOO.length} aulas`"
        :aulas="aulasRedes"
      />
    </div>

    <button
      class="mt-4 px-4 py-2 bg-ldsa-green-1 text-white rounded text-[12px]"
      @click="onClose"
    >
      Fechar
    </button>
  </div>
</template>
