<script setup lang="ts">
import { HeadTitleContext } from '~/infrastructure/HeadTitleContext';

useTitle(HeadTitleContext.DASHBOARD);
</script>

<template>
  <UILayoutsDashboardBase>
    <template #sidebar>
      <!-- <UILayoutsDashboardSisgeaCommonSidebar /> -->
    </template>

    <template #default>
      <slot />
    </template>
  </UILayoutsDashboardBase>
</template>

<style scoped></style>
