<script setup lang="ts">
import { Radio } from '@ladesa-ro/web.ui';

defineProps<InstanceType<typeof Radio>['$props']>();
</script>

<template>
  <Radio v-bind="$props">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </Radio>
</template>
