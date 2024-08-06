<script setup lang="ts">
import { creteApiContext } from './setup-context';

const { suspense } = creteApiContext();

await suspense();
</script>

<template>
  <slot></slot>
</template>
