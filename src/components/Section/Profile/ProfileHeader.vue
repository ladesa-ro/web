<script setup lang="ts">
import { ApiImageResource, useApiImageRoute } from '~/integrations';

type Props = {
  user: any;
};
const props = defineProps<Props>();
const { user } = toRef(props.user);

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
          class="bg-cover"
          alt="Foto de perfil do usuário."
        />
        <IconsIconUser v-else class="text-ldsa-grey/75 m-7" />
      </div>

      <section class="profile-metadata text-xs font-medium">
        <!-- TODO: puxar os dois valores abaixo da api -->
        <span>
          <h1 class="font-semibold text-base">Danilo Escudero</h1>
          <p class="text-ldsa-grey">danilo.escudero@ifro.edu.br</p>
        </span>
        <span class="leading-5">
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
