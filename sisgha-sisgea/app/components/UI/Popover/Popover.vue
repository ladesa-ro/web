<script lang="ts" setup>
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

defineProps<Props>();

//

type Slots = {
  activator: () => any;
  default: () => any;
};

defineSlots<Slots>();

//

const open = defineModel({ required: false, default: false });
</script>

<template>
  <PopoverRoot :open="open">
    <PopoverTrigger @click="open = !open">
      <slot name="activator" />
    </PopoverTrigger>

    <PopoverPortal>
      <PopoverContent class="popover-content z-[21]" side="bottom">
        <PopoverArrow v-if="popoverArrow" />

        <slot />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<style>
.popover-content {
  transform-origin: var(--radix-popover-content-transform-origin);
}

.popover-content[data-state='open'] {
  animation: enter 0.2s ease-out;
}

.popover-content[data-state='closed'] {
  animation: exit 0.2s ease-in;
}

@keyframes enter {
  from {
    opacity: 0;
    transform: translateY(-17px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes exit {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-17px);
  }
}
</style>
