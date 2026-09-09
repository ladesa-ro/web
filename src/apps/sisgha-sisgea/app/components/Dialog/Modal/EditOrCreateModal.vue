<script lang="ts" setup>
import {
  EditOrCreateModal,
  type EditOrCreateModalProps,
} from '@ladesa-ro/web.ui';

defineProps<EditOrCreateModalProps>();
</script>

<template>
  <EditOrCreateModal v-bind="$props" />
</template>
