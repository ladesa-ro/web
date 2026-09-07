<script setup lang="ts">
import { Img, type ImgProps } from '@ladesa-ro/web.ui';

defineProps<ImgProps>();
</script>

<template>
  <Img v-bind="$props">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </Img>
</template>
