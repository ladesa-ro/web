<script lang="ts" setup>
import { callWithNuxt } from "nuxt/app";

const app = useNuxtApp();

const { signOut, status } = useAuth();

const handleAuthStatus = async () => {
  const status_value = unref(status);

  switch (status_value) {
    case "authenticated": {
      await signOut({ redirect: false });
      break;
    }
  }

  switch (status_value) {
    case "unauthenticated":
    case "authenticated": {
      await callWithNuxt(app, () => navigateTo("/"));
      break;
    }
  }
};

watch([status], handleAuthStatus, { immediate: true });
</script>

<template>
  <PageLoading />
</template>
