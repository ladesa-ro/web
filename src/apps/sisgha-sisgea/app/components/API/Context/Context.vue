<script lang="ts" setup>
import { createApiContext } from '~/composables/api-context/setup';

const { suspense } = createApiContext();

await suspense();
</script>

<template>
  <slot />
</template>
