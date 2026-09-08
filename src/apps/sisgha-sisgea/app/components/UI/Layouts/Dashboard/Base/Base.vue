<script lang="ts" setup>
import { DashboardLayout } from '@ladesa-ro/web.ui';
import { UIToast } from '#components';
import { provideLayoutsDashboardContext } from './context';

type Slots = {
  sidebar(): any;
  default(): any;
};
defineSlots<Slots>();

useTitle('dashboard');

const { hamburguerActive } = provideLayoutsDashboardContext();
</script>

<template>
  <DashboardLayout :hamburguer-active="hamburguerActive">
    <template #header>
      <Appbar v-model="hamburguerActive" />
    </template>

    <template #sidebar>
      <slot name="sidebar" />
    </template>

    <template #default>
      <slot />
    </template>

    <template #footer>
      <UIFooter />
    </template>

    <template #toast>
      <UIToast />
    </template>
  </DashboardLayout>
</template>
