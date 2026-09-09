<script lang="ts" setup>
import { VVSelectImage, type VVSelectImageProps } from '@ladesa-ro/web.ui';

defineProps<VVSelectImageProps>();
</script>

<template>
  <VVSelectImage v-bind="$props" />
</template>
