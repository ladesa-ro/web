<script lang="ts" setup>
import { GuardMessage, type GuardMessageProps } from '@ladesa-ro/web.ui';

defineProps<GuardMessageProps>();
</script>

<template>
  <GuardMessage v-bind="$props" />
</template>
