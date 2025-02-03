<script setup lang="ts">
import type { UsuarioFindOneResultView } from '@ladesa-ro/api-client-fetch';
import { ApiImageResource, useApiImageRoute } from '~/utils';

type Props = {
  user: UsuarioFindOneResultView;
};
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
        class="w-[7.375rem] h-[7.375rem] border-2 border-ldsa-grey rounded-lg"
      >
        <template #fallbackIcon>
          <IconsIconUser class="w-2/5" />
        </template>
      </UIImg>

      <section class="profile-metadata text-xs font-medium">
        <span>
          <h1 class="font-semibold text-base">{{ user.nome }}</h1>
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
  @apply flex justify-start items-end;
  @apply h-[12.5rem] rounded-lg;
  @apply bg-[url('@/assets/imgs/Usuario.jpg')] bg-cover;
}

.profile-card {
  @apply flex  overflow-visible;
  @apply ml-8 p-5 min-w-[22.5rem] h-40 rounded-t-[0.625rem] bg-ldsa-bg;
}

.profile-metadata {
  @apply flex flex-col justify-center gap-2 ml-5;
}
</style>
