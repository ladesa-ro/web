<script setup lang="ts">
import { Container, type ContainerProps } from '@ladesa-ro/web.ui';

withDefaults(defineProps<ContainerProps>(), { styled: true });
</script>

<template>
  <Container v-bind="$props">
    <slot />
  </Container>
</template>
