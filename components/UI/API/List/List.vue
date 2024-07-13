<script lang="ts" setup generic="T = any">
import {
  setupUIApiListContext,
  type ICreateUIApiListContextOptions,
} from './Context/UIApiListContext';
import type { IGridItemSlotProps } from './Results/Grid/Typings/Typings';

//

type Props = {
  options: ICreateUIApiListContextOptions<T>;
};

const props = defineProps<Props>();

//

type Slots = {
  'options-actions'(props: any): any;
  'grid-item'(props: IGridItemSlotProps<T>): any;
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
          <slot name="options-actions"></slot>
        </template>
      </UIAPIListOptions>

      <UIAPIListResults>
        <template #grid-item="options">
          <slot
            name="grid-item"
            v-bind="{ ...options, item: options.item as T }"
          >
          </slot>
        </template>

        <template #grid-item-skeleton>
          <slot name="grid-item-skeleton"></slot>
        </template>
      </UIAPIListResults>
    </div>
  </v-container>
</template>
