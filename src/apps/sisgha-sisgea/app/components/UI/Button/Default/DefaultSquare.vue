<script setup lang="ts">
import { DefaultSquare } from '@ladesa-ro/web.ui';
</script>

<template>
  <DefaultSquare v-bind="$attrs">
    <slot />
  </DefaultSquare>
</template>
