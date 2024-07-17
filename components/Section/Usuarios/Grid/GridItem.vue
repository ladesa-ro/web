<script lang="ts" setup>
import type { UsuarioFindOneResultDto } from '@ladesa-ro/api-client-fetch';
import { ApiImageResource, useApiImageRoute } from '~/integrations';

//

const _ARBITRARY_UI_CARD_IMAGE_HEIGHT = 90;

//

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

const profilePicureUrl = useApiImageRoute(
  ApiImageResource.USUARIO_PROFILE,
  usuario
);
</script>

<template>
  <nuxt-link
    @click.capture="handleCardClick"
    class="flex flex-col border-2 border-[#9ab69e] rounded-lg no-underline p-0 m-0 overflow-hidden"
    :to="`/dape/usuarios/${usuario.id}`"
  >
    <div
      :style="{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(${profilePicureUrl})`,
      }"
      class="flex bg-[#F0F0F0] h-max rounded-t-lg items-center justify-center"
    >
      <v-img
        contain
        width="100%"
        v-if="profilePicureUrl"
        :src="profilePicureUrl"
        :height="`${_ARBITRARY_UI_CARD_IMAGE_HEIGHT}px`"
        style="backdrop-filter: blur(10px)"
      >
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular
              indeterminate
              v-if="Boolean(profilePicureUrl)"
            />

            <div v-else class="py-6">
              <IconsIconUser class="text-[#9ab69e] w-[42px] h-[42px]" />
            </div>
          </div>
        </template>

        <template v-slot:error>
          <div class="d-flex align-center justify-center fill-height">
            <v-empty-state
              icon="mdi-alert-circle-outline"
              text="Não foi possível buscar esta foto"
            />
          </div>
        </template>
      </v-img>

      <div v-else class="py-6">
        <IconsIconUser class="text-[#9ab69e] w-[42px] h-[42px]" />
      </div>
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
import { useApiImageRoute, ApiImageResource } from '~/integrations';
