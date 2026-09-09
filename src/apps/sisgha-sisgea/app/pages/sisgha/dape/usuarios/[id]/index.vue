<script lang="ts" setup>
const userId = computed(() => useRoute().params.id);
</script>
<template>
  <SectionProfile v-if="typeof userId === 'string'" :user-id="userId" />
</template>
