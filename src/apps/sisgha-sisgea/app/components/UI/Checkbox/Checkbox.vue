<script setup lang="ts">
import { Checkbox } from '@ladesa-ro/web.ui';

defineProps<InstanceType<typeof Checkbox>['$props']>();
</script>

<template>
  <Checkbox v-bind="$props">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </Checkbox>
</template>
