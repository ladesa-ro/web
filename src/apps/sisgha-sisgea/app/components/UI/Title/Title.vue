<script setup lang="ts">
import { Title } from '@ladesa-ro/web.ui';
</script>

<template>
  <Title v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </Title>
</template>
