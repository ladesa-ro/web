<script lang="ts" setup>
import { useMounted } from '@vueuse/core';
import { callWithNuxt } from 'nuxt/app';

const app = useNuxtApp();

const isMounted = useMounted();

const { signOut, status } = useAuth();

const handleAuthStatus = async () => {
  const statusRaw = unref(status);

  if (statusRaw === 'authenticated') {
    await signOut();
  }

  await callWithNuxt(app, () => navigateTo('/'));
};

watch(
  [isMounted, status],
  ([mounted]) => {
    if (mounted && unref(status) !== 'loading') {
      handleAuthStatus();
    }
  },
  { immediate: true }
);
</script>

<template>
  <SectionLoading />
</template>
