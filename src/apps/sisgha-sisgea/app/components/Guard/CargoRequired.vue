<script lang="ts" setup>
import { IconsUser } from '#components';
import { useApiContext } from '~/composables/api-context/setup';

const props = defineProps<{ cargo: string }>();

const { resumoVinculos } = useApiContext();
const hasCargo = computed(() =>
  resumoVinculos.value.cargos.includes(props.cargo)
);
</script>

<template>
  <slot v-if="hasCargo" />

  <GuardMessage
    v-else
    :icon="IconsUser"
    title="Você não tem acesso a esta funcionalidade"
    description="Esta página é exclusiva para usuários com o vínculo necessário."
  />
</template>
