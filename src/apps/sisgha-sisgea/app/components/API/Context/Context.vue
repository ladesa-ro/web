<script lang="ts" setup>
import { createApiContext } from '~/composables/api-context/setup';

const { suspense, usuario, perfisAtivos, whoAmIQuery } = createApiContext();

const route = useRoute();

const isPublicRoute = computed(() => {
  if (route.path === '/sem-acesso') return true;

  const authMeta = route.meta.auth as
    | false
    | { unauthenticatedOnly?: boolean }
    | undefined;

  if (authMeta === false) return true;
  if (typeof authMeta === 'object' && authMeta?.unauthenticatedOnly)
    return true;

  return false;
});

if (!isPublicRoute.value) {
  await suspense();
}

const needsAccessDenied = computed(() => {
  if (isPublicRoute.value) return false;
  if (whoAmIQuery.isPending.value) return false;

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
