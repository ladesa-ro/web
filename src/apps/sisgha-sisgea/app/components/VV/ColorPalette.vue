<script lang="ts" setup>
import { VVColorPalette, type VVColorPaletteProps } from '@ladesa-ro/web.ui';

defineProps<VVColorPaletteProps>();
</script>

<template>
  <VVColorPalette v-bind="$props" />
</template>
