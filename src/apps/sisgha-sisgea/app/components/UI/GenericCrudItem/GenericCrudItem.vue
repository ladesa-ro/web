<script lang="ts" setup>
import { GenericCrudItem, type GenericCrudItemProps } from '@ladesa-ro/web.ui';
import { NuxtLink } from '#components';

defineProps<GenericCrudItemProps>();
</script>

<template>
  <GenericCrudItem v-bind="$props" :as="NuxtLink">
    <slot />
  </GenericCrudItem>
</template>
