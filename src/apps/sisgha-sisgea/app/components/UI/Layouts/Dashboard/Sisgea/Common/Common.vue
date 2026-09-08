<script lang="ts" setup></script>

<template>
  <UILayoutsDashboardBase>
    <template #sidebar>
      <UILayoutsDashboardSisgeaCommonSidebar />
    </template>

    <template #default>
      <slot />
    </template>
  </UILayoutsDashboardBase>
</template>

<style scoped></style>
