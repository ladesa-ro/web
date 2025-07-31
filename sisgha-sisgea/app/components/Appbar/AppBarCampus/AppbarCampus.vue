<script lang="ts" setup>
import { useApiContext } from '~/components/API/Context/setup-context';
import { useCampusDoUsuario } from '~/composables/integrations/ladesa-api/modules/useCampusUsuario';

const { usuario } = useApiContext();
const { campus } = useCampusDoUsuario(usuario.value.id);
</script>

<template>
  <!-- TODO: remover a classe max-sm:hidden quando arrumar a responsividade deste componente. ele estava quebrando a responsividade do front, então foi necessário adicioná-la -->
  <div
    v-if="campus"
    class="flex items-center text-[11px] font-medium text-ldsa-text-default mr-3 truncate max-w-full min-w-12 border-2 border-ldsa-grey rounded p-1 max-sm:hidden"
  >
    <IconsLocate class="mr-1 text-ldsa-green-1" />
    <span class="truncate">{{ campus }}</span>
  </div>
</template>
