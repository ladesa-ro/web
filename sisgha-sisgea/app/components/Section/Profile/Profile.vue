<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query';

type Props = { userId: string };
const { userId } = defineProps<Props>();

const {
  data: user,
  isLoading,
  isError,
} = useQuery(findUserById({ id: userId }));
</script>

<template>
  <UIContainer
    variant="larger"
    class="flex flex-col justify-center gap-5 lg:gap-6.5 xl:gap-8"
  >
    <template v-if="user">
      <SectionProfileHeader :user="user" />

      <!-- disponibilidade + ensino -->
      <!-- TODO: puxar da api -->
      <section class="flex max-[900px]:flex-col gap-4">
        <SectionProfileAvailability class="flex-1/2 min-[1144px]:flex-1" />
        <SectionProfileTeaching :user class="flex-1/2 min-[1144px]:flex-2" />
      </section>
    </template>

    <span v-else-if="isLoading">Carregando...</span>
    <span v-else-if="isError">
      Ocorreu um erro inesperado ao procurar o usuário.
    </span>
  </UIContainer>
</template>

<style>
@reference "~/assets/styles/app.css";

/* class provided for the child components */
.border-card {
  @apply overflow-hidden border-2 border-ldsa-grey rounded-xl;
}
</style>
