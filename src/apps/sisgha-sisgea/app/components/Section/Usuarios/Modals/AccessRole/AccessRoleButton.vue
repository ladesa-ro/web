<script lang="ts" setup>
import {
  AccessRoleButton,
  type AccessRoleButtonProps,
} from '@ladesa-ro/web.ui';
import { NuxtLink } from '#components';

defineProps<AccessRoleButtonProps>();
</script>

<template>
  <AccessRoleButton v-bind="$props" :as="NuxtLink">
    <slot />
  </AccessRoleButton>
</template>
