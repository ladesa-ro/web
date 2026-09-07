<script setup lang="ts">
import { CardActions, type CardActionsProps } from '@ladesa-ro/web.ui';
import { resolveComponent } from 'vue';

defineProps<CardActionsProps>();

const NuxtLink = resolveComponent('NuxtLink');
</script>

<template>
  <CardActions v-bind="$props" :as="NuxtLink">
    <slot />
  </CardActions>
</template>
