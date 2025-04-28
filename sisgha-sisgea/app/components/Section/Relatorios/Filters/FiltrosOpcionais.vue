<script setup lang="ts">
defineProps<{
  bimestres: string[],
  disciplinas: string[],
  cursos: string[],
  turmas: string[],
}>();
</script>

<template>
  <div>
    <div class="divisor relative mb-4">
      <div class="filters relative w-25 bg-ldsa-bg mx-[1.2rem] my-0 p-[0.4rem] text-[0.6rem] font-bold text-ldsa-grey z-2">
        Filtros Opcionais
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full mt-4 m-auto mb-6">
      <VVAutocomplete
        :items="bimestres"
        class="w-full"
        label="Bimestre"
        name="bimestre.id"
        placeholder="Selecione um bimestre"
      />
      <VVAutocomplete
        :items="disciplinas"
        class="w-full"
        label="Disciplina"
        name="disciplina.id"
        placeholder="Selecione uma disciplina"
      />
      <VVAutocomplete
        :items="cursos"
        class="w-full"
        label="Curso"
        name="curso.id"
        placeholder="Selecione um curso"
      />
      <VVAutocomplete
        :items="turmas"
        class="w-full"
        label="Turma"
        name="turma.id"
        placeholder="Selecione uma turma"
      />
    </div>
  </div>
</template>

<style scoped>
.divisor::before {
  position: absolute;
  top: 50%;
  content: '';
  display: block;
  width: 100%;
  border-bottom: 0.07rem solid var(--ladesa-grey-color);
  z-index: 1;
}
</style>
