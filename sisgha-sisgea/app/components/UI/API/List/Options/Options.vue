<script lang="ts" setup>
import { useUIApiListContext } from '../Context/UIApiListContext';

const { formOptions } = useUIApiListContext();

//

type Slots = { actions(): any };

const slots = defineSlots<Slots>();

//
</script>

<template>
  <div
    class="mt-[50px] mb-[10px] w-full justify-between items-center flex gap-4 px-3"
  >
    <UISearchBar v-model="formOptions.search" />

    <div class="flex items-center shrink-0">
      <slot name="actions" />
    </div>
  </div>
</template>
