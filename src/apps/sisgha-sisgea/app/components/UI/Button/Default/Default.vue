<script setup lang="ts">
import { Button } from '@ladesa-ro/web.ui';
</script>

<template>
  <Button v-bind="$attrs">
    <template v-if="$slots['start-icon']" #start-icon>
      <slot name="start-icon" />
    </template>

    <slot />

    <template v-if="$slots['end-icon']" #end-icon>
      <slot name="end-icon" />
    </template>
  </Button>
</template>
