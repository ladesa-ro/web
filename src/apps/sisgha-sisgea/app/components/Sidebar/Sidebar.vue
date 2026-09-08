<script lang="ts" setup>
import { Sidebar, type SidebarItemModel } from '@ladesa-ro/web.ui';
import { NuxtLink } from '#components';

type Props = { items: SidebarItemModel[] };
defineProps<Props>();

const hamburgerActive = defineModel<boolean>({ required: true });
</script>

<template>
  <Sidebar v-model="hamburgerActive" :items="items" :link-as="NuxtLink" />
</template>
