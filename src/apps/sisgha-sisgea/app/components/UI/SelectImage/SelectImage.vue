<script lang="ts" setup>
import { SelectImage } from '@ladesa-ro/web.ui';

const model = defineModel<File | Blob | null | undefined>();

defineProps<{
  existingSrc?: string | null;
  disabled?: boolean;
}>();
</script>

<template>
  <SelectImage v-model="model" v-bind="$props" />
</template>
