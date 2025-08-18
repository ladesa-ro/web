<script lang="ts" setup>
import { useApiContext } from '~/components/API/Context/setup-context';

definePageMeta({
  layout: 'sisgha-dape',
  auth: true,
});

// useTitle(HeadTitleContext.DASHBOARD, 'Perfil');

const { usuario } = useApiContext();
</script>

<template>
  <SectionProfile :user-id="usuario.id" />
</template>
