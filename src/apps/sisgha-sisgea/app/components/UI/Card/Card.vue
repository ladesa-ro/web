<script setup lang="ts">
import { Card, type CardProps } from '@ladesa-ro/web.ui';

defineProps<CardProps>();
</script>

<template>
  <Card v-bind="$props">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </Card>
</template>
