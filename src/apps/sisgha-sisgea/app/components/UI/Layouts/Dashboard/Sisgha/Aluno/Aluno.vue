<script lang="ts" setup></script>

<template>
  <UILayoutsDashboardBase>
    <template #sidebar>
      <UILayoutsDashboardSisghaAlunoSidebar />
    </template>

    <template #default>
      <slot />
    </template>
  </UILayoutsDashboardBase>
</template>

<style scoped></style>
