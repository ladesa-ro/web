<script setup lang="ts">
import { createApiContext } from './setup-context';

const { suspense } = createApiContext();

await suspense();
</script>

<template>
  <slot />
</template>
