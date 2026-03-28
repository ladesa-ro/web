<script lang="ts" setup>
const userId = computed(() => useRoute().params.id);

// useTitle(HeadTitleContext.DASHBOARD, 'Perfil');
</script>
<template>
  <SectionProfile v-if="typeof userId === 'string'" :user-id="userId" />
</template>
