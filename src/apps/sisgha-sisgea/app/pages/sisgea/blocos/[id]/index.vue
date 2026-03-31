<script lang="ts" setup>
definePageMeta({ layout: 'sisgea' });

const id = computed(() => useRoute().params.id as string);
</script>

<template>
  <SectionBlocosView v-if="typeof id === 'string'" :resource-id="id" />
</template>
