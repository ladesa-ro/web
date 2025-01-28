<script setup lang="ts">
import {
  PopoverArrow,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
} from 'radix-vue';

type Props = {
  popoverArrow?: boolean;
};

type Slots = {
  activator: () => any;
  default: () => any;
};

defineProps<Props>();
defineSlots<Slots>();
</script>

<template>
  <PopoverRoot>
    <PopoverTrigger>
      <slot name="activator" />
    </PopoverTrigger>

    <PopoverPortal>
      <PopoverArrow v-if="popoverArrow" />

      <PopoverContent>
        <slot />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
