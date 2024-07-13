<script setup lang="ts" generic="T = any">
import { useApiBaseResourceList } from '../../../../../../integrations';
import { useUIApiListContext } from '../../Context/UIApiListContext';
import type { IGridItemSlotProps } from './Typings';

//

type Slots = {
  item(props: IGridItemSlotProps): any;
  'item-skeleton'(props: any): any;
};

const slots = defineSlots<Slots>();

//

const { formOptions, options } = useUIApiListContext();

const { paginatedResponse, previousItems, isLoading } =
  await useApiBaseResourceList<T>(
    options.baseQueryKey,
    options.apiBaseResourceListRetriever,
    formOptions
  );

//
</script>

<template>
  <UIGrid :isLoading="isLoading" :items="previousItems">
    <template #item="{ item, isLoading }">
      <slot name="item" v-bind="{ item, isLoading }"></slot>
    </template>

    <template #item-skeleton>
      <slot name="item-skeleton"></slot>
    </template>

    <template v-if="!paginatedResponse?.links.next">
      <div>
        <v-empty-state
          icon="mdi-text-box-check-outline"
          text="Você chegou ao fim da consulta dessa listagem (ou você chegou apenas ao começo?)"
          title="Isto é tudo"
        />
      </div>
    </template>
  </UIGrid>
</template>
