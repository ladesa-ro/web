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
  <div
    class="flex flex-col border-2 border-[#9ab69e] rounded-lg no-underline p-0 m-0"
  >
    <div
      class="flex py-6 bg-[#F0F0F0] h-max rounded-t-lg items-center justify-center"
    >
      <IconsIconUser class="text-[#9ab69e] w-[42px] h-[42px]" />
    </div>

    <div class="flex flex-col items-stretch justify-center pa-2 w-full h-full">
      <div class="flex items-center gap-1">
        <span class="font-bold self-center text-sm text-wrap overflow-ellipsis">
          {{ usuario.nome }}
        </span>

        <div class="flex-1"></div>

        <div class="shrink-0 self-start">
          <SectionUsuariosModalsForm :editId="usuario.id" />
        </div>
      </div>

      <hr class="my-3" />

      <template v-if="vinculos.length > 0">
        <div class="flex font-medium text-sm items-center text-[#9ab69e]">
          <div v-for="vinculo in vinculos" :key="vinculo.id">
            {{ getRoleLabel(vinculo.cargo) }}.
          </div>
        </div>
      </template>

      <template v-if="vinculos.length === 0">
        <div class="flex text-sm items-center text-[#9ab69e]">
          Sem vínculos.
        </div>
      </template>

      <div class="flex-1"></div>

      <hr class="my-3" />

      <div>
        <NuxtLink
          class="flex w-full font-medium pa-2 justify-center transition-colors duration-150 items-center border-[1px] border-solid border-[#118D3B]/25 cursor-pointer rounded-lg hover:bg-[#118D3B]/10"
          :to="`/usuarios/${usuario.id}`"
        >
          Ver Perfil
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style></style>
