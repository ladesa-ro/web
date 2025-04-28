<script setup lang="ts">
import { ref } from 'vue';

const professores = ref([
  'Danilo Pereira Escudero',
  'Albanita',
  'Leticia Pivetta',
]);
const semestres = ref([
  '2024.1',
  '2024.2',
  '2023.1',
  '2023.2',
  '2022.1',
  '2022.2',
]);
const bimestres = ref([
  '1º Bimestre',
  '2º Bimestre',
  '3º Bimestre',
  '4º Bimestre',
]);
const disciplinas = ref(['Matemática', 'Português', 'História', 'Geografia']);
const cursos = [
  'Técnico em Informática',
  'Técnico em Química',
  'Técnico em Florestas',
];
const turmas = ['1º Ano', '2º Ano', '3º Ano'];

const form = ref({
  professor: null,
  semestre: null,
  bimestre: null,
  disciplina: null,
  curso: null,
  turma: null,
});

const isActive = ref(false);
const onClose = () => (isActive.value = false);

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
        <h1 class="main-title font-semibold pb-5 text-[20px]">
          Relatório de Aulas Ministradas
        </h1>
      </div>
      <div class="w-full">
        <!-- select professor -->
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 w-full m-auto mb-6">
          <!-- professor -->
          <VVAutocomplete
            :items="professores"
            class="w-full xl:col-span-2"
            label="Professor"
            name="professor.id"
            placeholder="Selecione um professor"
          />

          <!-- semestre -->
          <VVAutocomplete
            :items="semestres"
            class="w-full"
            label="Semestre"
            name="semestre.id"
            placeholder="Selecione um semestre"
          />
        </div>

        <!-- divisoria -->
        <div class="divisor relative">
          <div
            class="filters relative w-25 bg-ldsa-bg mx-[1.2rem] my-0 p-[0.4rem] text-[0.6rem] font-bold text-ldsa-grey z-2"
          >
            Filtros Opcionais
          </div>
        </div>

        <!-- filtros -->
        <div
          class="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full mt-4 m-auto mb-6"
        >
          <!-- bimestre -->
          <VVAutocomplete
            :items="bimestres"
            class="w-full"
            label="Bimestre"
            name="bimestre.id"
            placeholder="Selecione um bimestre"
          />

          <!-- disciplina -->
          <VVAutocomplete
            :items="disciplinas"
            class="w-full"
            label="Disciplina"
            name="disciplina.id"
            placeholder="Selecione uma disciplina"
          />

          <!-- cursos -->
          <VVAutocomplete
            :items="cursos"
            class="w-full"
            label="Curso"
            name="curso.id"
            placeholder="Selecione um curso"
          />

          <!-- turmas -->
          <VVAutocomplete
            :items="turmas"
            class="w-full"
            label="Turma"
            name="turma.id"
            placeholder="Selecione uma turma"
          />
        </div>

        <hr class="divider flex-grow pt-5 border-t border-ldsa-grey" />

        <!-- botoes -->
        <div class="flex w-full justify-center items-center gap-4 mt-4">
          <UIButtonDefault @click="visualizarRelatorio">
            Visualizar relatório
            <template #end-icon>
              <IconsEyesEyeOn class="flex w-6 h-6 ml-4" />
            </template>
          </UIButtonDefault>

          <UIButtonDefault @click="gerarPDF">
            Gerar PDF
            <template #end-icon>
              <IconsIconFilePicker class="flex w-6 h-6 mr-4" />
            </template>
          </UIButtonDefault>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-title::before {
  content: '';
  border: 2px solid var(--ladesa-green-1-color);
  margin-right: 0.5rem;
}

.divisor:before {
  position: absolute;
  top: 50%;
  content: '';
  display: block;
  width: 100%;
  border-bottom: 0.07rem solid var(--ladesa-grey-color);
  z-index: 1;
}
</style>
