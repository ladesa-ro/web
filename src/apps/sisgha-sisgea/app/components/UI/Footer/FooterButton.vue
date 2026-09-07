<script setup lang="ts">
import { FooterButton, type FooterButtonProps } from '@ladesa-ro/web.ui';

defineProps<FooterButtonProps>();
</script>

<template>
  <FooterButton v-bind="$props" />
</template>
