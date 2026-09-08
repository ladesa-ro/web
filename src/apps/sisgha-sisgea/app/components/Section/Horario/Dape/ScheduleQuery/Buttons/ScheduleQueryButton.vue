<script lang="ts" setup>
import { ScheduleQueryButton } from '@ladesa-ro/web.ui';
</script>

<template>
  <ScheduleQueryButton v-bind="$attrs">
    <slot />
  </ScheduleQueryButton>
</template>
