<script setup lang="ts">
const props = defineProps<{
  bimestres: string[],
  turmas: string[],
  bimestre: string | null,
  turma: string | null,
}>();

const emit = defineEmits<{
  (e: 'update:bimestre', value: string | null): void,
  (e: 'update:turma', value: string | null): void,
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
        :model-value="bimestre"
        @update:modelValue="emit('update:bimestre', $event)"
        class="w-full mb-3"
        label="Bimestre"
        name="bimestre.id"
        placeholder="Selecione um bimestre"
      />

      <VVAutocompleteAPIDisciplina name="disciplina.id" />

      <VVAutocompleteAPICurso name="curso.id" />

      <VVAutocomplete
        :items="turmas"
        :model-value="turma"
        @update:modelValue="emit('update:turma', $event)"
        class="w-full"
        label="Turma"
        name="turma.id"
        placeholder="Selecione uma turma"
      />
    </div>
  </div>
</template>
