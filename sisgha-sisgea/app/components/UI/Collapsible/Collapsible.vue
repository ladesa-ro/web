<script setup lang="ts">
import {
  CollapsibleContent as Content,
  CollapsibleRoot as Root,
  CollapsibleTrigger as Trigger,
} from 'reka-ui';

const open = defineModel<boolean>({ required: false, default: false });
</script>

<template>
  <Root v-model:open="open" class="overflow-hidden min-h-max min-w-full">
    <Trigger class="w-full">
      <slot name="trigger" />
    </Trigger>

    <Content class="collapsible-animation w-full overflow-hidden h-max">
      <slot />
    </Content>
  </Root>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

/* Collapsible animation */

.collapsible-animation[data-state='open'] {
  @apply animate-[slideDown_0.3s];
}

.collapsible-animation[data-state='closed'] {
  @apply animate-[slideUp_0.3s];
}

@keyframes slideDown {
  from {
    height: 0;
  }
  to {
    height: var(--reka-collapsible-content-height);
  }
}

@keyframes slideUp {
  from {
    height: var(--reka-collapsible-content-height);
  }
  to {
    height: 0;
  }
}
</style>
