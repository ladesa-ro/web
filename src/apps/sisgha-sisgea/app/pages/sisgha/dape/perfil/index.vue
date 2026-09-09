<script lang="ts" setup>
import { useApiContext } from '~/composables/api-context/setup';

definePageMeta({
  layout: 'sisgha-dape',
  auth: true,
});

const { usuario } = useApiContext();
</script>

<template>
  <SectionProfile :user-id="usuario.id" />
</template>
