<script lang="ts" setup>
definePageMeta({ layout: 'sisgha-dape' });

const id = computed(() => useRoute().params.id as string);
</script>

<template>
  <SectionCalendarioColecoesView v-if="typeof id === 'string'" :resource-id="id" />
</template>
