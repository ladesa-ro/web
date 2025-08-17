<script lang="ts" setup>
definePageMeta({
  layout: 'sisgha-consulta',
  auth: false,
});

const turmaId = useRoute().params.id;
</script>

<template>
  {{ turmaId }}
  <SectionHorario />
</template>
