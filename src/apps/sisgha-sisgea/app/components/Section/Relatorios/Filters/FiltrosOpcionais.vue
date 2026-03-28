<script setup lang="ts">
const props = defineProps<{
  bimestres: string[];
  turmas: string[];
  bimestre: string | null;
  turma: string | null;
}>();

const emit = defineEmits<{
  (e: 'update:bimestre', value: string | null): void;
  (e: 'update:turma', value: string | null): void;
}>();
</script>

<template>
  <div class="relative border-t-2 border-ldsa-grey h-2">
    <div
      class="absolute -top-3/2 left-5 w-max px-1.5 bg-ldsa-bg my-0 text-sm font-semibold text-ldsa-grey z-2"
    >
      Filtros Opcionais
    </div>
  </div>

  <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
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
</template>
