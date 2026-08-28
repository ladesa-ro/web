<script lang="ts" setup>
import IndisponibilidadeProfessor from './IndisponibilidadeProfessor.vue';
</script>

<template>
  <UIContainer class="flex flex-col gap-6">
    <UIBreadcrumbDapeBreadcrumb />
    <IndisponibilidadeProfessor tipo-entidade="professor" />
  </UIContainer>
</template>
