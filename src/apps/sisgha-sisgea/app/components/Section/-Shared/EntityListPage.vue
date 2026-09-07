<script lang="ts" setup>
import type { Component, VNode } from 'vue';
import {
  createApiListContextOptions,
  type IEntityListModule,
} from '~/components/UI/API/List/Context/UIApiListContext';

type Props = {
  crudModule: IEntityListModule;
  formComponent: Component;
  gridItemComponent: Component;
  showBreadcrumb?: boolean;
  filter?: unknown;
  filteredByCampus?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  showBreadcrumb: false,
  filter: undefined,
  filteredByCampus: false,
});

defineSlots<{ filters(): VNode[] }>();

// `filter` chega já desembrulhado pelo template do pai, então reembrulha num
// computed sobre props para o contexto continuar reagindo a troca de campus.
const options = createApiListContextOptions({
  crudModule: props.crudModule,
  filter: computed(() => props.filter),
  filteredByCampus: props.filteredByCampus,
});
</script>

<template>
  <UIAPIList :options="options">
    <template v-if="showBreadcrumb" #header>
      <UIBreadcrumbDapeBreadcrumb />
    </template>

    <template #options-actions>
      <DialogModalEditOrCreateModal :form-component="formComponent" />
    </template>

    <template #filters>
      <slot name="filters" />
    </template>

    <template #grid-item="{ item, isLoading }">
      <component :is="gridItemComponent" :is-loading="isLoading" :item="item" />
    </template>

    <template #grid-item-skeleton>
      <component :is="gridItemComponent" :is-loading="true" :item="null" />
    </template>
  </UIAPIList>
</template>
