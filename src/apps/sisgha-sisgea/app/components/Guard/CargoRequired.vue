<script lang="ts" setup>
import { useApiContext } from '~/composables/api-context/setup';

const props = defineProps<{ cargo: string }>();

const { resumoVinculos } = useApiContext();
const hasCargo = computed(() =>
  resumoVinculos.value.cargos.includes(props.cargo)
);
</script>

<template>
  <slot v-if="hasCargo" />

  <div v-else class="flex items-center justify-center py-16 px-4">
    <div class="flex flex-col items-center gap-4 text-center max-w-sm">
      <IconsUser class="w-12 h-12 text-ldsa-grey" />

      <h2 class="text-lg font-semibold text-ldsa-text-default">
        Você não tem acesso a esta funcionalidade
      </h2>

      <p class="text-sm text-ldsa-grey leading-relaxed">
        Esta página é exclusiva para usuários com o vínculo necessário.
      </p>
    </div>
  </div>
</template>
