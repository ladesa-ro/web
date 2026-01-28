<script generic="Typings extends IGenericCrudModuleTypesBase" lang="ts" setup>
import {
  UIApiListViewMode,
  useUIApiListContext,
} from '../Context/UIApiListContext';
import type { IGridItemSlotProps } from './Grid/Typings/IGridItemSlotProps';

//

type Slots = {
  'grid-item'(props: IGridItemSlotProps<Typings['List']['ResultItem']>): any;
  'grid-item-skeleton'(props: any): any;
};

const slots = defineSlots<Slots>();

//

const { viewMode } = useUIApiListContext();
</script>

<template>
  <template v-if="viewMode === UIApiListViewMode.CARDS">
    <UIAPIListResultsGrid>
      <template #item="options">
        <slot name="grid-item" v-bind="options" />
      </template>

      <template #item-skeleton>
        <slot name="grid-item-skeleton" />
      </template>
    </UIAPIListResultsGrid>
  </template>

  <template v-else>
    <p>Modo de visualização não suportado.</p>
  </template>
</template>
