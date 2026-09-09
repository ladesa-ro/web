<script lang="ts" setup>
import { MescladoList, type MescladoListProps } from '@ladesa-ro/web.ui';
import type { AcceptableValue } from 'reka-ui';

defineProps<MescladoListProps>();

const selectedCheckboxes = defineModel<AcceptableValue[]>();
</script>

<template>
  <MescladoList v-bind="$props" v-model="selectedCheckboxes" />
</template>
