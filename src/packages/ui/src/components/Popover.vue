<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core';
import {
  PopoverArrow as Arrow,
  PopoverContent as Content,
  PopoverPortal as Portal,
  PopoverRoot,
  PopoverTrigger as Trigger,
} from 'reka-ui';
import { useTemplateRef } from 'vue';

export type PopoverProps = {
  arrow?: boolean;
  disabled?: boolean;
  disableAnimation?: boolean;
};
const { disabled = false, disableAnimation = false } = defineProps<PopoverProps>();

//

const open = defineModel({ required: false, default: false });

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
      class="ui-popover-trigger"
      :class="disabled ? 'ui-popover-trigger--disabled' : 'ui-popover-trigger--enabled'"
      v-bind="$attrs"
      @click="!disabled && (open = !open)"
    >
      <slot name="activator" />
    </Trigger>

    <Portal>
      <Content
        ref="content"
        class="ui-popover-content"
        :class="!disableAnimation && 'ui-popover-content--animated'"
        side="bottom"
        @escape-key-down="open = false"
      >
        <Arrow v-if="arrow" class="ui-popover-arrow" />

        <slot />
      </Content>
    </Portal>
  </PopoverRoot>
</template>
