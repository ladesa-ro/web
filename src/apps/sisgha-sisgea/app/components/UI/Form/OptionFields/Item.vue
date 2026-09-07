<script setup lang="ts">
import { FormOptionItem, type FormOptionItemProps } from '@ladesa-ro/web.ui';

defineProps<FormOptionItemProps>();
</script>

<template>
  <FormOptionItem :mode="mode" :item="item" />
</template>
