<script setup lang="ts">
import { Img } from '@ladesa-ro/web.ui';

defineProps<InstanceType<typeof Img>['$props']>();
</script>

<template>
  <Img v-bind="$props">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </Img>
</template>
