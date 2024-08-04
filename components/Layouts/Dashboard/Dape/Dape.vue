<script setup lang="ts">
import { HeadTitleContext } from '../../../../infrastructure/HeadTitleContext';

useTitle(HeadTitleContext.DASHBOARD);
</script>

<template>
  <LayoutsDashboardBase>
    <template #sidebar>
      <LayoutsDashboardDapeSidebar />
    </template>

    <template #default>
      <slot></slot>
    </template>
  </LayoutsDashboardBase>
</template>

<style scoped></style>
