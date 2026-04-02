<script lang="ts" setup>
const campusContext = useCampusContext();
const hasCampus = computed(() => !!campusContext.value);
</script>

<template>
  <slot v-if="hasCampus" />

  <div v-else class="flex items-center justify-center py-16 px-4">
    <div class="flex flex-col items-center gap-4 text-center max-w-sm">
      <IconsLocate class="w-12 h-12 text-ldsa-grey" />

      <h2 class="text-lg font-semibold text-ldsa-text-default">
        Selecione um campus para acessar esta funcionalidade
      </h2>

      <p class="text-sm text-ldsa-grey leading-relaxed">
        Utilize o seletor de campus no cabeçalho do sistema.
      </p>
    </div>
  </div>
</template>
