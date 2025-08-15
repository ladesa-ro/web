<script setup lang="ts">
const selectedOptions = ref({ formacao: null, curso: null});
</script>

<template>
  {{ selectedOptions }}

  <SectionConsultaAccordion
    title="Formação"
    :items="[
      { value: 'formacao1', label: 'Técnico' },
      { value: 'formacao2', label: 'Graduação' },
      { value: 'formacao3', label: 'Pós-Graduação' },
      { value: 'formacao4', label: 'Concomitante' },
    ]"
    v-model="selectedOptions.formacao"
  />
  <SectionConsultaAccordion
    title="Curso"
    :items="[
      { value: 'curso1', label: 'Informática' },
      { value: 'curso2', label: 'Química' },
      { value: 'curso3', label: 'Floresta' },
    ]"
    v-model="selectedOptions.curso"
  />
</template>
