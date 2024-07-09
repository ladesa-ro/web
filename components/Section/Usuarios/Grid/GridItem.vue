<script lang="ts" setup>
import type { UsuarioFindOneResultDto } from '@ladesa-ro/api-client-fetch';

const apiClient = useApiClient();

type Props = {
  usuario: UsuarioFindOneResultDto;
};

const props = defineProps<Props>();

const { usuario } = toRefs(props);

const vinculosResponse = await apiClient.vinculos.vinculoList({
  filterUsuarioId: [usuario.value.id],
  filterAtivo: ['true'],
});

const vinculos = vinculosResponse.data;

const getRoleLabel = (role: string) => {
  switch (role.toLowerCase()) {
    case 'dape': {
      return 'DAPE';
    }

    case 'professor': {
      return 'Professor';
    }

    default: {
      return role;
    }
  }
};
</script>

<template>
  <NuxtLink
    :to="`/usuarios/${usuario.id}`"
    class="grid bg w-[172px] h-[190px] border-2 border-[#9ab69e] rounded-lg no-underline p-0 m-0 overflow-hidden"
  >
    <span
      class="flex bg-[#F0F0F0] h-[100%] w-full rounded-t-lg items-center justify-center"
    >
      <IconsIconUser class="text-[#9ab69e] w-[42px] h-[42px]" />
    </span>
    <div class="flex flex-col justify-center items-start ml-1 w-full">
      <span class="flex font-bold text-sm items-center">
        {{ usuario.nome }}

        <IconsIconEdit class="detail ml-6 w-[12px] h-[12px]" />
      </span>
      <span class="flex font-medium text-sm items-center text-[#9ab69e]">
        <span v-for="vinculo in vinculos" :key="vinculo.id">
          {{ getRoleLabel(vinculo.cargo) }}
        </span>
      </span>
    </div>
  </NuxtLink>
</template>

<style></style>
