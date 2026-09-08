<script lang="ts" setup>
import { SideBySide, type SideBySideProps } from '@ladesa-ro/web.ui';

withDefaults(defineProps<SideBySideProps>(), { showSecondary: true });
</script>

<template>
  <SideBySide v-bind="$props">
    <template #primary>
      <slot name="primary" />
    </template>

    <template #secondary>
      <slot name="secondary" />
    </template>
  </SideBySide>
</template>
