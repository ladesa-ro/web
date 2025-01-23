<script setup lang="ts">
import { useUIApiListContext } from '../Context/UIApiListContext';

const { formOptions } = useUIApiListContext();

//

type Slots = {
  'actions'(props: any): any;
};

const slots = defineSlots<Slots>();

//
</script>

<template>
  <div
    class="mt-[50px] mb-[10px] w-full justify-between items-center flex gap-4 px-3"
  >
    <UISearchBar
      :value="formOptions.search"
      @update:value="formOptions.search = $event"
    />

    <div class="flex items-center flex-shrink-0">
      <slot name="actions" />
    </div>
  </div>
</template>
