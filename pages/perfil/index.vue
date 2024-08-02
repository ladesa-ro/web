<script lang="ts" setup>
import { HeadTitleContext } from '~/infrastructure/HeadTitleContext';

useTitle(HeadTitleContext.DASHBOARD, 'Perfil');
</script>
<template>
  <SectionProfile :user-id="'17ed5d7e-79d4-4cfd-811c-263247dc4511'" />
</template>
