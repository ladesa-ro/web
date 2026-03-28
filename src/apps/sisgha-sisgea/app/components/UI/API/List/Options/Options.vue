<script lang="ts" setup>
import { useUIApiListContext } from '../Context/UIApiListContext';

defineProps<{ style?: string }>();

const { formOptions } = useUIApiListContext();

//

type Slots = { actions(): any };

const slots = defineSlots<Slots>();
</script>

<template>
  <div :class="style || 'w-full justify-between items-center flex gap-4'">
    <UISearchBar v-model="formOptions.search" />

    <div class="flex items-center shrink-0">
      <slot name="actions" />
    </div>
  </div>
</template>
