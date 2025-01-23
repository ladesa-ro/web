<script setup lang="ts">
import { createApiListContextOptions } from '~~/app/components/UI/API/List/Context/UIApiListContext';
import {
  turmasBaseQueryKey,
  useTurmasRetriever,
} from '~~/app/integrations/api';
import TurmasForm from './Form/Form.vue';

const turmasRetriever = useTurmasRetriever();

const options = createApiListContextOptions({
  baseQueryKey: turmasBaseQueryKey,
  apiBaseResourceListRetriever: turmasRetriever,
});
</script>

<template>
  <UIAPIList :options="options">
    <template #options-actions>
      <DialogModalEditOrCreateModal :form-component="TurmasForm" />
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionTurmasGridItem :item="item" :is-loading="isLoading" />
    </template>

    <template #grid-item-skeleton>
      <SectionTurmasGridItem :item="null" :is-loading="true" />
    </template>
  </UIAPIList>
</template>
