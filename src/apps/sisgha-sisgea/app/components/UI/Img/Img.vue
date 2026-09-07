<script setup lang="ts">
import { Img } from '@ladesa-ro/web.ui';
</script>

<template>
  <Img v-bind="$attrs as any">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </Img>
</template>
