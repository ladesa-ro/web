<script setup lang="ts">
import { Checkbox } from '@ladesa-ro/web.ui';
</script>

<template>
  <Checkbox v-bind="$attrs as any">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </Checkbox>
</template>
