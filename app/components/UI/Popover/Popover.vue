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
  close: () => any;
};

defineProps<Props>();
defineSlots<Slots>();

const open = defineModel({ required: false, default: false });
</script>

<template>
  <PopoverRoot :open="open">
    <PopoverTrigger @click="open = !open">
      <slot name="activator" />
    </PopoverTrigger>

    <PopoverPortal to="body">
      <PopoverArrow v-if="popoverArrow" />

      <PopoverContent class="z-[21]">
        <slot />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
