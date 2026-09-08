<script lang="ts" setup>
import { WeekNavigator, type WeekNavigatorProps } from '@ladesa-ro/web.ui';

defineProps<WeekNavigatorProps>();

const emit = defineEmits<{ prev: []; next: [] }>();
</script>

<template>
  <WeekNavigator v-bind="$props" @prev="emit('prev')" @next="emit('next')" />
</template>
