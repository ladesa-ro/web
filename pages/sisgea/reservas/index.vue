<script setup lang="ts">
definePageMeta({
  layout: 'sisgea',
});

const apiClient = useApiClient();
const reservas = await apiClient.reservas.reservaList();
</script>

<template>  
  <!-- <pre>
    <code>
      {{ reservas }}
    </code>
  </pre> -->

  <SectionReservas />
</template>
