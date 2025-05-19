<script lang="ts" setup>
import type { UsuarioFindOneResultView } from '@ladesa-ro/api-client-fetch';
import { ApiImageResource, useApiImageRoute } from '~/utils';

type Props = { user: UsuarioFindOneResultView };
const { user } = defineProps<Props>();

const profilePictureUrl = useApiImageRoute(
  ApiImageResource.USUARIO_PROFILE,
  user
);
</script>

<template>
  <!-- TODO: adicionar ícones de edição -->
  <section class="banner">
    <div class="profile-card">
      <UIImg
        :src="profilePictureUrl"
        alt="Foto de perfil do usuário."
        class="w-24 h-24 lg:w-[7.375rem] lg:h-[7.375rem] border-2 border-ldsa-grey rounded-lg"
      >
        <template #fallbackIcon>
          <IconsIconUser class="w-1/2 text-ldsa-grey" />
        </template>
      </UIImg>

      <section class="profile-metadata text-xs font-medium">
        <span>
          <h1 class="font-semibold text-sm lg:text-base">{{ user.nome }}</h1>
          <p class="text-ldsa-grey">{{ user.email }}</p>
        </span>
        <span class="leading-5">
          <!-- TODO: puxar os valores abaixo da api -->
          <p>Campus Ji-Paraná</p>
          <p>Professor</p>
        </span>
      </section>
    </div>
  </section>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.banner {
  @apply flex max-sm:justify-center sm:justify-start items-end;
  @apply h-[12.5rem] rounded-lg;
  @apply bg-[url('@/assets/imgs/Usuario.jpg')] bg-cover;
}

.profile-card {
  @apply flex overflow-visible;
  @apply max-sm:ml-0 sm:ml-6 lg:ml-8 p-2.5 sm:p-3 lg:p-4 xl:p-5 lg:min-w-[22.5rem] h-max rounded-t-[0.625rem] bg-ldsa-bg;
}

.profile-metadata {
  @apply flex flex-col justify-center gap-2 ml-5;
}
</style>
