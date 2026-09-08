<script setup lang="ts">
import {
  FormOptionFieldArrow,
  type FormOptionFieldArrowProps,
} from '@ladesa-ro/web.ui';

defineProps<FormOptionFieldArrowProps>();
</script>

<template>
  <FormOptionFieldArrow :open="open" :disabled="disabled" />
</template>
