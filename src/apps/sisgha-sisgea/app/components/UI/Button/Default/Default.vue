<script setup lang="ts">
import { Button } from '@ladesa-ro/web.ui';
</script>

<template>
  <Button v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </Button>
</template>
