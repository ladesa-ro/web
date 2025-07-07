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
  <div class="flex-1 px-4 md:px-6 lg:px-8">
    <div class="flex-1 h-full flex flex-col container mx-auto max-w-[89%]">
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
  </div>
</template>
