<script lang="ts" setup>
import { HeadTitleContext } from "~/infrastructure/HeadTitleContext";

const route = useRoute();
const userId = computed(() => route.params.id);

useTitle(HeadTitleContext.DASHBOARD, "Perfil");
</script>
<template>
  <SectionProfile v-if="typeof userId === 'string'" :user-id="userId" />
</template>
