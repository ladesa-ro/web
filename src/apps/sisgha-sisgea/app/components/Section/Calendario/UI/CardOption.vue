<script lang="ts" setup>
import { CardOption, type CardOptionProps } from '@ladesa-ro/web.ui';

defineProps<CardOptionProps>();
</script>

<template>
  <CardOption v-bind="$props" />
</template>
