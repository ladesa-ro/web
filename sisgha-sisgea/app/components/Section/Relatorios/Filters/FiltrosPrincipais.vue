<script setup lang="ts">
defineProps<{
  professores: string[],
  semestres: string[],
}>();
</script>

<template>
  <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 w-full m-auto mb-6">
    <VVAutocomplete
      :items="professores"
      class="w-full xl:col-span-2"
      label="Professor"
      name="professor.id"
      placeholder="Selecione um professor"
    />

    <VVAutocomplete
      :items="semestres"
      class="w-full"
      label="Semestre"
      name="semestre.id"
      placeholder="Selecione um semestre"
    />
  </div>
</template>
