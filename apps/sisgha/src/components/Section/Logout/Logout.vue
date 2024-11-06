<script lang="ts" setup>
import { useMounted } from "@vueuse/core";
import { callWithNuxt } from "nuxt/app";

const app = useNuxtApp();

const isMounted = useMounted();

const { signOut, status } = useAuth();

const handleAuthStatus = async () => {
  const statusRaw = unref(status);

  switch (statusRaw) {
    case "authenticated": {
      await signOut({ redirect: false });
      break;
    }
  }

  switch (statusRaw) {
    case "authenticated":
    case "unauthenticated": {
      await callWithNuxt(app as any, () => navigateTo("/"));
      break;
    }
  }
};

watch(
  [isMounted, status],
  ([isMounted]) => {
    if (isMounted) {
      handleAuthStatus();
    }
  },
  { immediate: true }
);
</script>

<template>
  <SectionLoading />
</template>
