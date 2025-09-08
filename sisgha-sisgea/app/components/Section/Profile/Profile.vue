<script lang="ts" setup>
import { UILoading } from '#components';
import { useQuery } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';

type Props = { userId: string };
const { userId } = defineProps<Props>();

const {
  data: user,
  isLoading,
  isError,
} = useQuery(findUserById({ id: userId }));

//

const router = useRouter();
const goBack = () => {
  router.push('/sisgha/dape/usuarios'); 
};
</script>

<template>
  <UIContainer
    variant="larger"
    class="flex flex-col justify-center gap-5 lg:gap-6.5 xl:gap-8"
  >
    <template v-if="user">      
     <div>
      <UIButtonModalGoBack @click="goBack"/>
     </div>
      <SectionProfileHeader :user="user" />

      <!-- TODO: puxar da api -->
      <section class="grid gap-4 md:grid-cols-5 auto-rows-auto">
        <SectionProfileAvailability
          class="border-card md:order-none md:col-span-2"
        />

        <SectionProfileTeaching
          :user="user"
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
