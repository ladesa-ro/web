<script lang="ts" setup>
import { useCampusDoUsuario } from '~/composables/integrations/ladesa-api/modules/useCampusUsuario';
import { IconsIconLocate } from '#components';

const userId = '17ed5d7e-79d4-4cfd-811c-263247dc4511';
const { campus } = useCampusDoUsuario(userId);
</script>

<template>
  <div
    v-if="campus"
    class="flex items-center text-[11px] font-medium text-ldsa-text-default mr-3 truncate max-w-full border-2 border-ldsa-grey rounded p-1"
    style="min-width: 3rem;"
  >
    <IconsIconLocate class="mr-1 text-ldsa-green-1" /> 
    <span class="truncate">{{ campus }}</span>
  </div>
</template>