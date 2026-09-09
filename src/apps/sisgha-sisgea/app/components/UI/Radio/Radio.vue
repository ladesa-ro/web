<script setup lang="ts">
import { Radio, type RadioProps } from '@ladesa-ro/web.ui';
import type { AcceptableValue } from 'reka-ui';

defineProps<RadioProps>();
const model = defineModel<AcceptableValue>({ default: null });
</script>

<template>
  <Radio v-bind="$props" v-model="model">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </Radio>
</template>
