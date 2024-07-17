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

const handleCardClick = (e: MouseEvent) => {
  const target = <HTMLElement>e.target;

  if (target && target.closest('[data-grid-item-no-redirect]')) {
    e.preventDefault();
  }
};
</script>

<template>
  <nuxt-link
    @click.capture="handleCardClick"
    class="flex flex-col border-2 border-[#9ab69e] rounded-lg no-underline p-0 m-0"
    :to="`/dape/usuarios/${usuario.id}`"
  >
    <div
      class="flex py-6 bg-[#F0F0F0] h-max rounded-t-lg items-center justify-center"
    >
      <IconsIconUser class="text-[#9ab69e] w-[42px] h-[42px]" />
    </div>

    <div class="flex flex-col items-stretch justify-center pa-3 w-full h-full">
      <div class="flex items-center gap-1">
        <span class="font-bold self-center text-sm text-wrap overflow-ellipsis">
          {{ usuario.nome }}
        </span>

        <div class="flex-1"></div>

        <div class="shrink-0 self-start" data-grid-item-no-redirect="">
          <SectionUsuariosModalsForm :editId="usuario.id" />
        </div>
      </div>

      <div class="mt-2"></div>

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
    </div>
  </nuxt-link>
</template>

<style></style>
