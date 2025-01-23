<script setup lang="ts">
import type { UsuarioFindOneResultView } from '@ladesa-ro/api-client-fetch';
import { ApiImageResource, useApiImageRoute } from '~~/app/integrations';

type Props = {
  user: UsuarioFindOneResultView;
};
const props = defineProps<Props>();
const { user } = toRefs(props);

const profilePicureUrl = useApiImageRoute(
  ApiImageResource.USUARIO_PROFILE,
  user
);
</script>

<template>
  <!-- TODO: adicionar ícones de edição -->
  <section class="banner">
    <div class="profile-card overflow-visible">
      <div class="profile-photo">
        <img
          v-if="profilePicureUrl"
          :src="profilePicureUrl ?? ''"
          class="h-full"
          alt="Foto de perfil do usuário."
        />
        <IconsIconUser v-else class="text-ldsa-grey/75 m-7" />
      </div>

      <section class="profile-metadata text-xs font-medium">
        <span>
          <h1 class="font-semibold text-base">{{ user.nome }}</h1>
          <p class="text-ldsa-grey">{{ user.email }}</p>
        </span>
        <span class="leading-5">
          <!-- TODO: puxar os dois valores abaixo da api -->
          <p>Campus Ji-Paraná</p>
          <p>Professor</p>
        </span>
      </section>
    </div>
  </section>
</template>

<style scoped>
.banner {
  @apply flex justify-start items-end;
  @apply h-[12.5rem] rounded-lg;
  @apply bg-[url('@/imgs/Usuario.jpg')] bg-cover;
}

.profile-card {
  @apply flex overflow-hidden;
  @apply ml-8 p-5 min-w-[22.5rem] h-40 rounded-t-[0.625rem] bg-ldsa-bg;
}

.profile-photo {
  @apply flex justify-center items-center;
  @apply w-[7.375rem] h-[7.375rem] rounded-lg;
  @apply border-2 border-ldsa-grey/40 bg-ldsa-grey/15;
}

.profile-metadata {
  @apply flex flex-col justify-center gap-2 ml-5;
}
</style>
