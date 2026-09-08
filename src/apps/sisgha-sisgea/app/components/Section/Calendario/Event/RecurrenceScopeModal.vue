<script lang="ts" setup>
import {
  RecurrenceScopeModal,
  type RecurrenceScopeModalProps,
} from '@ladesa-ro/web.ui';

defineProps<RecurrenceScopeModalProps>();
</script>

<template>
  <RecurrenceScopeModal v-bind="$props" />
</template>
