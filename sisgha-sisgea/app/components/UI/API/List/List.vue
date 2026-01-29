<script
  generic="
    Typings extends IGenericCrudModuleTypesBase,
    CrudModule extends IGenericCrudModule<Typings>
  "
  lang="ts"
  setup
>
import {
  type ICreateUIApiListContextOptions,
  setupUIApiListContext,
} from './Context/UIApiListContext';
import type { IGridItemSlotProps } from './Results/Grid/Typings/IGridItemSlotProps';

const props = withDefaults(
  defineProps<{
    options: ICreateUIApiListContextOptions<Typings, CrudModule>;
    defaultStyle?: boolean;
    searchBarContainerStyle?: string;
  }>(),
  {
    defaultStyle: true,
  }
);

const slots = defineSlots<{
  'options-actions'(props: any): any;
  'grid-item'(props: IGridItemSlotProps<any>): any;
  'grid-item-skeleton'(props: any): any;
}>();

setupUIApiListContext(props.options);
</script>

<template>
  <UIContainer :styled="defaultStyle ?? true">
    <div class="flex-1 h-full flex flex-col gap-10">
      <UIAPIListOptions :style="searchBarContainerStyle">
        <template #actions>
          <slot name="options-actions" />
        </template>
      </UIAPIListOptions>

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
