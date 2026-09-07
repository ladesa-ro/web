<script setup lang="ts">
import { Container, type ContainerProps } from '@ladesa-ro/web.ui';

defineProps<ContainerProps>();
</script>

<template>
  <Container v-bind="$props">
    <slot />
  </Container>
</template>
