<script setup lang="ts">
import { ref } from 'vue';
import RelatorioFiltrosPrincipais from '@/components/Section/Relatorios/Filters/FiltrosPrincipais.vue';
import RelatorioFiltrosOpcionais from '@/components/Section/Relatorios/Filters/FiltrosOpcionais.vue';
import RelatorioBotoes from '@/components//Section/Relatorios/Buttons/Buttons.vue';

const data = {
  professores: ['Danilo Pereira Escudero', 'Albanita', 'Leticia Pivetta'],
  semestres: ['2024.1', '2024.2', '2023.1', '2023.2', '2022.1', '2022.2'],
  bimestres: ['1º Bimestre', '2º Bimestre', '3º Bimestre', '4º Bimestre'],
  disciplinas: ['Matemática', 'Português', 'História', 'Geografia'],
  cursos: ['Técnico em Informática', 'Técnico em Química', 'Técnico em Florestas'],
  turmas: ['1º Ano', '2º Ano', '3º Ano'],
};

const form = ref({
  professor: null,
  semestre: null,
  bimestre: null,
  disciplina: null,
  curso: null,
  turma: null,
});

const visualizarRelatorio = () => {
  console.log('Visualizar Relatório', form.value);
};

const gerarPDF = () => {
  console.log('Gerar PDF do Relatório', form.value);
};
</script>

<template>
  <div class="container mx-auto px-4">
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
        :disciplinas="data.disciplinas"
        :cursos="data.cursos"
        :turmas="data.turmas"
      />

      <hr class="divider flex-grow pt-5 border-t border-ldsa-grey" />

      <RelatorioBotoes
        @visualizar="visualizarRelatorio"
        @gerarPdf="gerarPDF"
      />
      
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
