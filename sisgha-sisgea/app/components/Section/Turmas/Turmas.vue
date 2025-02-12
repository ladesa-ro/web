<script lang="ts" setup>
import TurmasForm from './Form/Form.vue';

const { crudModule } = useLadesaApiCrudTurmas();

const options = {
  crudModule,
};
</script>

<template>
  <UIAPIList :options="options">
    <template #options-actions>
      <DialogModalEditOrCreateModal :form-component="TurmasForm" />
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionTurmasGridItem :is-loading="isLoading" :item="item" />
    </template>

    <template #grid-item-skeleton>
      <SectionTurmasGridItem :is-loading="true" :item="null" />
    </template>
  </UIAPIList>
</template>
