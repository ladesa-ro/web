<script setup lang="ts">
import { HeadTitleContext } from '../../../../infrastructure/HeadTitleContext';

useTitle(HeadTitleContext.DASHBOARD);
</script>

<template>
  <LayoutsDashboardBase>
    <slot></slot>
  </LayoutsDashboardBase>
</template>

<style scoped></style>
