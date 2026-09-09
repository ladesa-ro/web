<script lang="ts" setup>
import { IconsLocate } from '#components';

const campusContext = useCampusContext();
const hasCampus = computed(() => !!campusContext.value);
</script>

<template>
  <slot v-if="hasCampus" />

  <GuardMessage
    v-else
    :icon="IconsLocate"
    title="Selecione um campus para acessar esta funcionalidade"
    description="Utilize o seletor de campus no cabeçalho do sistema."
  />
</template>
