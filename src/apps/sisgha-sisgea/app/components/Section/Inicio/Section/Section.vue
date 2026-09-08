<script lang="ts" setup>
import { SectionBlock, type SectionBlockProps } from '@ladesa-ro/web.ui';

defineProps<SectionBlockProps>();
</script>

<template>
  <SectionBlock v-bind="$props">
    <slot />
  </SectionBlock>
</template>
