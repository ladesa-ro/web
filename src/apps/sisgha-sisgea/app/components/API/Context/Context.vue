<script lang="ts" setup>
import { createApiContext } from '~/composables/api-context/setup';

const { suspense, usuario, perfisAtivos } = createApiContext();

await suspense();

const route = useRoute();

const needsAccessDenied = computed(() => {
  if (
    route.path === '/sem-acesso' ||
    route.path === '/login' ||
    route.path === '/logout' ||
    route.path === '/__ui-test' ||
    route.path === '/__fouc-test'
  )
    return false;
  const user = usuario.value;
  if (!user) return true;
  if (user.isSuperUser) return false;
  const perfis = perfisAtivos.value;
  return !perfis || perfis.length === 0;
});

watch(
  needsAccessDenied,
  denied => {
    if (denied) navigateTo('/sem-acesso');
  },
  { immediate: true }
);
</script>

<template>
  <slot />
</template>
