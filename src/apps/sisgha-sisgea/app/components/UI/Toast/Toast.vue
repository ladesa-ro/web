<script setup lang="ts">
import { Toast } from '@ladesa-ro/web.ui';
import { useToast } from '~/composables/useToast';

const { toasts } = useToast();
</script>

<template>
  <Toast :items="toasts" />
</template>
