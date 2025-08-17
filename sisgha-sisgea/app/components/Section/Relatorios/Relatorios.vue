<script setup lang="ts">
import RelatorioBotoes from '@/components/Section/Relatorios/Buttons/Buttons.vue';
import RelatorioFiltrosOpcionais from '@/components/Section/Relatorios/Filters/FiltrosOpcionais.vue';
import RelatorioFiltrosPrincipais from '@/components/Section/Relatorios/Filters/FiltrosPrincipais.vue';
import RelatorioModal from '@/components/Section/Relatorios/Modal/Modal.vue';

const data = {
  professores: [
    'albanita',
    'xurrasco',
    'boliro',
    'bolzani',
    'ana castela',
    'manu',
    'mariluz',
  ],
  semestres: ['2024.1', '2024.2', '2023.1', '2023.2', '2022.1', '2022.2'],
  bimestres: ['1º Bimestre', '2º Bimestre', '3º Bimestre', '4º Bimestre'],
  turmas: ['1º Ano', '2º Ano', '3º Ano'],
};

const form = ref<{
  professor: string | null;
  semestre: string | null;
  bimestre: string | null;
  disciplina: string | null;
  curso: string | null;
  turma: string | null;
}>({
  professor: 'Danilo',
  semestre: null,
  bimestre: null,
  disciplina: null,
  curso: null,
  turma: null,
});

const showModal = ref(false);

const visualizarRelatorio = () => {
  showModal.value = true;
};

const gerarPDF = () => {
  // TODO: implementar lógica para gerar PDF
};
</script>

<template>
  <UIContainer variant="tighter" class="flex justify-center">
    <div class="flex-1 flex flex-col justify-center gap-7 max-w-3xl">
      <UITitle text="Relatório de Aulas Ministradas" />

      <RelatorioFiltrosPrincipais
        :professores="data.professores"
        :semestres="data.semestres"
        :professor="form.professor"
        :semestre="form.semestre"
        @update:professor="form.professor = $event"
        @update:semestre="form.semestre = $event"
      />

      <RelatorioFiltrosOpcionais
        :bimestres="data.bimestres"
        :turmas="data.turmas"
        :bimestre="form.bimestre"
        :turma="form.turma"
        @update:bimestre="form.bimestre = $event"
        @update:turma="form.turma = $event"
      />

      <hr class="border-t-2 border-ldsa-grey" />

      <RelatorioBotoes @visualizar="visualizarRelatorio" @gerarPdf="gerarPDF" />

      <DialogSkeleton v-model="showModal">
        <RelatorioModal :form="form" :onClose="() => (showModal = false)" />
      </DialogSkeleton>
    </div>
  </UIContainer>
</template>
