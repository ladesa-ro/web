<script lang="ts" setup>
const sessaoId = computed(() => useRoute().params.sessaoId as string);
</script>

<template>
  <SectionHorarioDapeSessao
    v-if="typeof sessaoId === 'string'"
    :sessao-id="sessaoId"
  />
</template>
