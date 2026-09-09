<script lang="ts" setup>
import { PopoverEdit, type PopoverEditProps } from '@ladesa-ro/web.ui';

defineProps<PopoverEditProps>();

const open = defineModel<boolean>();
</script>

<template>
  <PopoverEdit v-model="open" v-bind="$props">
    <template #activator>
      <slot name="activator" />
    </template>

    <slot />
  </PopoverEdit>
</template>
