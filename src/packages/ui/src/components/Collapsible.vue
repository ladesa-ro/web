<script setup lang="ts">
import {
  CollapsibleContent as Content,
  CollapsibleRoot as Root,
  CollapsibleTrigger as Trigger,
} from 'reka-ui';

const { disabled = false } = defineProps<{ disabled?: boolean }>();

const open = defineModel<boolean>({ required: false, default: false });
</script>

<template>
  <Root v-model:open="open" :disabled class="ui-collapsible">
    <Trigger class="ui-collapsible__trigger">
      <slot name="trigger" />
    </Trigger>

    <Content class="ui-collapsible__content">
      <slot />
    </Content>
  </Root>
</template>
