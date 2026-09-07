<script setup lang="ts">
import { Radio } from '@ladesa-ro/web.ui';
</script>

<template>
  <Radio v-bind="$attrs as any">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </Radio>
</template>
