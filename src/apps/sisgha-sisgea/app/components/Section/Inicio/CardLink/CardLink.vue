<script lang="ts" setup>
import { CardLink, type CardLinkProps } from '@ladesa-ro/web.ui';
import { NuxtLink } from '#components';

defineProps<CardLinkProps>();
</script>

<template>
  <CardLink v-bind="$props" :as="NuxtLink" />
</template>
