<script lang="ts" setup>
import { UILoading } from '#components';
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
      <section class="grid gap-4 md:grid-cols-3 auto-rows-auto">
        <SectionProfileCampus
          :userId="user.id"
          class="border-card md:order-none md:col-span-1"
        />

        <SectionProfileTeaching
          :user="user"
          class="border-card md:order-none md:col-span-2"
        />

        <SectionProfileAvailability
          class="border-card md:order-none md:col-span-3"
        />
      </section>
    </template>

    <span v-else-if="isLoading"><UILoading /></span>
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