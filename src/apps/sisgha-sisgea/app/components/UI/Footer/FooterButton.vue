<script setup lang="ts">
import { FooterButton } from '@ladesa-ro/web.ui';

defineProps<InstanceType<typeof FooterButton>['$props']>();
</script>

<template>
  <FooterButton v-bind="$props" />
</template>
