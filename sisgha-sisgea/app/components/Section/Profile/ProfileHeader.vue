<script lang="ts" setup>
import { useCampusContext, useUserCargoAndCampi } from '#imports';
import type { Ladesa_ManagementService_Domain_Contracts_UsuarioFindOneOutput as UsuarioFindOneOutput } from '@ladesa-ro/management-service-client';
import { useQuery } from '@tanstack/vue-query';
import uniq from 'lodash/uniq';
import { computed } from 'vue';
import { ApiImageResource, useApiImageRoute } from '~/utils';

type Props = { user: UsuarioFindOneOutput };
const { user } = defineProps<Props>();

const profilePictureUrl = useApiImageRoute(
  ApiImageResource.USUARIO_PROFILE,
  user
);

const { moreThanOneCampus, campiList } = useUserCargoAndCampi();

// puxar campus da api
const toggleCampusItems = campiList.map(campus => ({
  label: campus.apelido,
  value: campus.id,
}));

const selectedCampusGlobalState = useCampusContext();

const campus = computed(() => {
  return (
    toggleCampusItems.find(c => c.value === selectedCampusGlobalState.value)
      ?.label ?? 'Carregando campus...'
  );
});

// puxar vinculos da api
const client = useApiClient();

const { data: vinculosResponse } = useQuery({
  queryKey: ['usuarios', `usuario::id::${user.id}`, 'vinculos'],
  queryFn: () =>
    client.perfis.perfilList({
      filterUsuarioId: [user.id],
      filterAtivo: ['true'],
    }),
});

const vinculos = computed(() => vinculosResponse.value?.data ?? []);

const getRoleLabel = (role: string) => {
  switch (role?.toLowerCase()) {
    case 'professor':
      return 'Professor';
    case 'dape':
      return 'DAPE';
    default:
      return role;
  }
};

const vinculosConcatenated = computed(() => {
  const allLabels = vinculos.value.map(v => getRoleLabel(v.cargo));
  return uniq(allLabels).join(' e ');
});
</script>

<template>
  <!-- TODO: adicionar ícones e modal de edição -->
  <section class="banner">
    <div class="profile-card">
      <UIImg
        :src="profilePictureUrl"
        alt="Foto de perfil do usuário."
        class="shrink-0 w-18 h-18 sm:w-24 sm:h-24 lg:w-29.5 lg:h-29.5 border-2 border-ldsa-grey rounded-lg"
      >
        <template #fallbackIcon>
          <IconsUser class="w-1/2 text-ldsa-grey" />
        </template>
      </UIImg>

      <section
        class="profile-metadata text-xs font-medium max-[400px]:text-center"
      >
        <span>
          <h1 class="font-semibold text-sm lg:text-base text-wrap">
            {{ user.nome }}
          </h1>
          <p class="text-ldsa-grey text-wrap break-words">
            {{ user.email }}
          </p>
        </span>
        <span class="leading-5">
          <!-- TODO: puxar os valores abaixo da api (aguardando rota ficar pronta) -->
          <p>{{ campus }}</p>
          <p>{{ vinculosConcatenated || 'Sem vínculo' }}</p>
        </span>
      </section>
    </div>
  </section>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.banner {
  @apply flex justify-center sm:justify-start items-end;
  @apply h-50 rounded-lg;
  @apply bg-[url('@/assets/imgs/Usuario.jpg')] bg-cover;
}

.profile-card {
  @apply flex max-[400px]:flex-col max-[400px]:items-center max-[400px]:gap-2 gap-4 overflow-visible max-[400px]:max-w-56 max-w-9/10;
  @apply ml-0 sm:ml-6 lg:ml-8 p-2.5 sm:p-3 lg:p-4 xl:p-5 lg:min-w-[22.5rem] h-max rounded-t-[0.625rem] bg-ldsa-bg;
}

.profile-metadata {
  @apply flex flex-col justify-center max-[400px]:items-center gap-2 md:ml-2 lg:ml-4;
}
</style>
