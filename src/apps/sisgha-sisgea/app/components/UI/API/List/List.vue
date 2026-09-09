<script lang="ts" setup>
import {
  type ICreateUIApiListContextOptions,
  setupUIApiListContext,
} from './Context/UIApiListContext';
import type { IGridItemSlotProps } from './Results/Grid/Typings/IGridItemSlotProps';

const props = withDefaults(
  defineProps<{
    options: ICreateUIApiListContextOptions;
    defaultStyle?: boolean;
    searchBarContainerStyle?: string;
  }>(),
  {
    defaultStyle: true,
  }
);

defineSlots<{
  'header'(props: any): any;
  'options-actions'(props: any): any;
  'filters'(props: any): any;
  'grid-item'(props: IGridItemSlotProps<any>): any;
  'grid-item-skeleton'(props: any): any;
}>();

setupUIApiListContext(props.options);
</script>

<template>
  <UIContainer :styled="defaultStyle ?? true">
    <div class="u-flex-1 u-h-full u-flex u-flex-col u-gap-10">
      <slot name="header" />
      <UIAPIListOptions :style="searchBarContainerStyle">
        <template #actions>
          <slot name="options-actions" />
        </template>
      </UIAPIListOptions>

      <slot name="filters" />

      <UIAPIListResults>
        <template #grid-item="options">
          <slot name="grid-item" v-bind="{ ...options, item: options.item }" />
        </template>

        <template #grid-item-skeleton>
          <slot name="grid-item-skeleton" />
        </template>
      </UIAPIListResults>
    </div>
  </UIContainer>
</template>
