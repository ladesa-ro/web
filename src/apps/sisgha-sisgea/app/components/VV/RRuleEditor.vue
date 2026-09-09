<script lang="ts" setup>
import { VVRRuleEditor, type VVRRuleEditorProps } from '@ladesa-ro/web.ui';

defineProps<VVRRuleEditorProps>();
</script>

<template>
  <VVRRuleEditor v-bind="$props" />
</template>
