<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core';
import {
  PopoverArrow as Arrow,
  PopoverContent as Content,
  PopoverRoot,
  PopoverPortal as Portal,
  PopoverTrigger as Trigger,
} from 'reka-ui';

type Props = {
  arrow?: boolean;
  disabled?: boolean;
  disableAnimation?: boolean;
};
const { disabled = false, disableAnimation = false } = defineProps<Props>();

//

const open = defineModel({ required: false, default: false });

// close popover when user clicks outside
const content = useTemplateRef<HTMLElement | null>('content');
const trigger = useTemplateRef<HTMLElement | null>('trigger');

onClickOutside(
  content,
  event => {
    const target = event.target as HTMLElement;

    const isAutocomplete = !!target.closest(
      '.reka-combobox-content, .reka-combobox-item, [role="option"], [data-reka-combobox-item]'
    );

    if (isAutocomplete) return;

    open.value = false;
  },
  { ignore: [trigger] }
);
</script>

<template>
  <PopoverRoot :open="open">
    <Trigger
      ref="trigger"
      class="shrink-0 text-ldsa-text-default"
      :class="disabled ? 'cursor-auto-class' : 'cursor-pointer'"
      v-bind="$attrs"
      @pointerdown="!disabled && (open = !open)"
    >
      <slot name="activator" />
    </Trigger>

    <Portal>
      <Content
        ref="content"
        :class="[
          'z-[21] shadow-lg text-ldsa-text-default',
          !disableAnimation && 'popover-content',
        ]"
        side="bottom"
        @escape-key-down="open = false"
      >
        <Arrow class="w-5 fill-ldsa-green-1" v-if="arrow" />

        <slot />
      </Content>
    </Portal>
  </PopoverRoot>
</template>

<style>
.cursor-auto-class {
  cursor: auto;
}

.popover-content {
  transform-origin: var(--reka-popover-content-transform-origin);
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
    transform: translateY(-1.063rem);
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
