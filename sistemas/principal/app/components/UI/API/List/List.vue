<script lang="ts" setup generic="Typings extends IGenericCrudModuleTypes">
import {
  setupUIApiListContext,
  type ICreateUIApiListContextOptions,
} from './Context/UIApiListContext';
import type { IGridItemSlotProps } from './Results/Grid/Typings';

//

type Props = {
  options: ICreateUIApiListContextOptions<Typings>;
};

const props = defineProps<Props>();

//

type Slots = {
  'options-actions'(props: any): any;

  'grid-item'(props: IGridItemSlotProps<Typings['List']['ResultItem']>): any;

  'grid-item-skeleton'(props: any): any;
};

const slots = defineSlots<Slots>();

//

setupUIApiListContext(props.options);
</script>

<template>
  <v-container class="flex-1">
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
  </v-container>
</template>
