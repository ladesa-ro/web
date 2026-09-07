<script setup lang="ts">
import { Card } from '@ladesa-ro/web.ui';
</script>

<template>
  <Card v-bind="$attrs as any">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </Card>
</template>
