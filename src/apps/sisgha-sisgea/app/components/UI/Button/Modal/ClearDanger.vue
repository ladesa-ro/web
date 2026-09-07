<script setup lang="ts">
import { ButtonModalClearDanger } from '@ladesa-ro/web.ui';

defineProps<{ text: string }>();
</script>

<template>
  <ButtonModalClearDanger v-bind="$props" />
</template>
