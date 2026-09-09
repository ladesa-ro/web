<script setup lang="ts">
import { Toggle, type ToggleItem, type ToggleProps } from '@ladesa-ro/web.ui';

defineProps<ToggleProps>();
const model = defineModel<ToggleItem['value']>({ required: true });
</script>

<template>
  <Toggle v-bind="$props" v-model="model" />
</template>
