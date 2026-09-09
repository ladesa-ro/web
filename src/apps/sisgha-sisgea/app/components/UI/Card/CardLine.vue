<script setup lang="ts">
import { CardLine } from '@ladesa-ro/web.ui';
</script>

<template>
  <CardLine v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </CardLine>
</template>
