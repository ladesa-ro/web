<script setup lang="ts">
import { HeadTitleContext } from '~/infrastructure/HeadTitleContext';

useTitle(HeadTitleContext.DASHBOARD);
</script>

<template>
  <UILayoutsDashboardBase>
    <template #sidebar>
      <UILayoutsDashboardSisghaProfessorSidebar />
    </template>

    <template #default>
      <slot></slot>
    </template>
  </UILayoutsDashboardBase>
</template>

<style scoped></style>
