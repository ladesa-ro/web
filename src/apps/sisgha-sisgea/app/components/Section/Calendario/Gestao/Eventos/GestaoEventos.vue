<script setup lang="ts">
import Card from './Card.vue';
</script>

<template>
  <UIContainer class="flex flex-col gap-6">
    <UIBreadcrumbDapeBreadcrumb go-back-to="./">
      <!-- add EditOrCreateModal aqui -->
      <UIButtonDefaultSquare>
        <IconsAdd class="w-6 h-full" />
      </UIButtonDefaultSquare>
    </UIBreadcrumbDapeBreadcrumb>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 grid-flow-row">
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  </UIContainer>
</template>
