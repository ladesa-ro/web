<script setup lang="ts">
defineProps<{
  professores: string[];
  semestres: string[];
  professor: string | null;
  semestre: string | null;
}>();

const emit = defineEmits<{
  (e: 'update:professor', value: string | null): void;
  (e: 'update:semestre', value: string | null): void;
}>();
</script>

<template>
  <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 w-full">
    <VVAutocomplete
      :items="professores"
      :model-value="professor"
      class="w-full xl:col-span-2"
      label="Professor"
      name="professor.id"
      placeholder="Selecione um professor"
      @update:model-value="emit('update:professor', $event)"
    />

    <VVAutocomplete
      :items="semestres"
      :model-value="semestre"
      class="w-full"
      label="Semestre"
      name="semestre.id"
      placeholder="Selecione um semestre"
      @update:model-value="emit('update:semestre', $event)"
    />
  </div>
</template>
