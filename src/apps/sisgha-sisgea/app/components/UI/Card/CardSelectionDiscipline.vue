<script setup lang="ts">
import { CardSelectionDiscipline } from '@ladesa-ro/web.ui';
</script>

<template>
  <CardSelectionDiscipline v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </CardSelectionDiscipline>
</template>
