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

const props = defineProps<{
  options: ICreateUIApiListContextOptions<Typings, CrudModule>;
}>();

const slots = defineSlots<{
  'options-actions'(props: any): any;
  'grid-item'(props: IGridItemSlotProps<any>): any;
  'grid-item-skeleton'(props: any): any;
}>();

setupUIApiListContext(props.options);
</script>

<template>
  <UIContainer variant="default">
    <div class="flex-1 h-full flex flex-col gap-10">
      <UIAPIListOptions>
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
