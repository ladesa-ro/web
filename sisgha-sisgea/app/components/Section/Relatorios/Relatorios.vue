<script setup lang="ts">
import { VVAutocompleteAPIDisciplina } from '#components';
import RelatorioBotoes from '@/components//Section/Relatorios/Buttons/Buttons.vue';
import DialogSkeleton from '@/components/Dialog/DialogSkeleton.vue';
import RelatorioFiltrosOpcionais from '@/components/Section/Relatorios/Filters/FiltrosOpcionais.vue';
import RelatorioFiltrosPrincipais from '@/components/Section/Relatorios/Filters/FiltrosPrincipais.vue';
import RelatorioModal from '@/components/Section/Relatorios/Modal/Modal.vue';
import { ref } from 'vue';

const data = {
  professores: ['albanita', 'xurrasco', 'boliro', 'bolzani', 'ana castela', 'manu', 'mariluz',],
  semestres: ['2024.1', '2024.2', '2023.1', '2023.2', '2022.1', '2022.2'],
  bimestres: ['1º Bimestre', '2º Bimestre', '3º Bimestre', '4º Bimestre'],
  turmas: ['1º Ano', '2º Ano', '3º Ano'],
};

const form = ref({
  professor: 'Danilo',
  semestre: null,
  bimestre: null,
  disciplina: null,
  curso: null,
  turma: null,
});

const showModal = ref(false);

const visualizarRelatorio = () => {
  console.log('Visualizar Relatório', form.value);
  showModal.value = true;
};

const gerarPDF = () => {
  console.log('Gerar PDF do Relatório', form.value);
};
</script>

<template>
  <div class="container mx-auto px-4 ">
    <div class="mx-auto max-w-[55%] p-10">
      <div class="container-header">
        <h1 class="main-title font-semibold pb-5 text-[1.25rem]">
          Relatório de Aulas Ministradas
        </h1>
      </div>

      <RelatorioFiltrosPrincipais
        :professores="data.professores"
        :semestres="data.semestres"
      />

      <RelatorioFiltrosOpcionais
        :bimestres="data.bimestres"
        :turmas="data.turmas"
      />

      <hr class="divider flex-grow pt-5 border-t border-ldsa-grey" />

      <RelatorioBotoes @visualizar="visualizarRelatorio" @gerarPdf="gerarPDF" />

      <DialogSkeleton v-model="showModal">
        <RelatorioModal :form="form" :onClose="() => (showModal = false)" />
      </DialogSkeleton>
    </div>
  </div>
</template>

<style scoped>
.main-title::before {
  content: '';
  border: 2px solid var(--ladesa-green-1-color);
  margin-right: 0.5rem;
}
</style>
