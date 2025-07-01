<script lang="ts" setup>
import { useCampusDoUsuario } from '~/composables/integrations/ladesa-api/modules/useCampusUsuario';

const userId = '17ed5d7e-79d4-4cfd-811c-263247dc4511'; // ajuste se for dinâmico no futuro
const { campus } = useCampusDoUsuario(userId);
</script>

<template>
  <div
    v-if="campus"
    class="text-sm font-semibold text-ldsa-text-default mr-3 truncate max-w-[12rem]"
  >
    Campus: {{ campus }}
  </div>
</template>