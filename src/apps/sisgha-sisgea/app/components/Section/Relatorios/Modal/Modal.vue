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
  <div class="relatorio-modal u-p-12 u-rounded-sm">
    <h2
      class="u-text-lg u-font-semibold u-mb-4 u-flex u-items-center u-justify-center"
    >
      Relatório de Aulas Ministradas
    </h2>

    <hr class="divider u-grow u-pt-5" />

    <div class="info u-flex u-flex-wrap">
      <p class="relatorio-modal__info-item u-text-xs u-mb-2">
        <strong>Professor:</strong> {{ form.professor?.id ?? '—' }}
      </p>
      <p class="relatorio-modal__info-item u-text-xs u-mb-2">
        <strong>Filtros:</strong> {{ filtrosUsados }}
      </p>
      <p class="relatorio-modal__info-item u-text-xs u-mb-2">
        <strong>Calendário:</strong> {{ form.calendarioLetivo?.id ?? '—' }}
      </p>
      <p class="relatorio-modal__info-item u-text-xs u-mb-2">
        <strong>Campus:</strong> —
      </p>
    </div>

    <hr class="divider u-grow u-pt-5" />

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
      class="relatorio-modal__close-button u-mt-4 u-px-4 u-py-2 u-rounded-sm u-text-xs"
      @click="onClose"
    >
      Fechar
    </button>
  </div>
</template>

<style scoped>
.relatorio-modal {
  width: 120vh;
  max-height: 80vh;
  overflow-y: auto;
  background-color: var(--ladesa-background-color);
  color: var(--ladesa-text-default-color);
  box-shadow: var(--ui-shadow-md);
}

.divider {
  border-top: 1px solid var(--ladesa-grey-color);
}

.relatorio-modal__info-item {
  width: 50%;
}

.relatorio-modal__close-button {
  background-color: var(--ladesa-green-1-color);
  color: var(--ladesa-white-color);
}
</style>
