<script lang="ts" setup>
const route = useRoute();
const userId = computed(() => route.params.id);

// useTitle(HeadTitleContext.DASHBOARD, 'Perfil');
</script>
<template>
  <SectionProfile v-if="typeof userId === 'string'" :user-id="userId" />
</template>
