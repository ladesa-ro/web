<script setup lang="ts">
import { ButtonEventsList } from '@ladesa-ro/web.ui';

defineEmits<{
  open: [];
}>();
</script>

<template>
  <ButtonEventsList v-bind="$attrs" @open="$emit('open')" />
</template>
