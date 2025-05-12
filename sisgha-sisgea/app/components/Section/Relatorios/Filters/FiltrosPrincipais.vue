<script setup lang="ts">
const props = defineProps<{
  professores: string[],
  semestres: string[],
  professor: string | null,
  semestre: string | null,
}>();

const emit = defineEmits<{
  (e: 'update:professor', value: string | null): void,
  (e: 'update:semestre', value: string | null): void,
}>();
</script>

<template>
  <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 w-full m-auto mb-6">
    <VVAutocomplete
      :items="professores"
      :model-value="professor"
      @update:modelValue="emit('update:professor', $event)"
      class="w-full xl:col-span-2"
      label="Professor"
      name="professor.id"
      placeholder="Selecione um professor"
    />

    <VVAutocomplete
      :items="semestres"
      :model-value="semestre"
      @update:modelValue="emit('update:semestre', $event)"
      class="w-full"
      label="Semestre"
      name="semestre.id"
      placeholder="Selecione um semestre"
    />
  </div>
</template>
