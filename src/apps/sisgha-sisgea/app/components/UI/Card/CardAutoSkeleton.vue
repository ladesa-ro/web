<script setup lang="ts">
import { CardAutoSkeleton } from '@ladesa-ro/web.ui';
</script>

<template>
  <CardAutoSkeleton v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </CardAutoSkeleton>
</template>
