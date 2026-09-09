<script setup lang="ts">
import { Checkbox, type CheckboxProps } from '@ladesa-ro/web.ui';
import type { AcceptableValue } from 'reka-ui';

defineProps<CheckboxProps>();
const model = defineModel<AcceptableValue[]>({ default: [] });
</script>

<template>
  <Checkbox v-bind="$props" v-model="model">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </Checkbox>
</template>
