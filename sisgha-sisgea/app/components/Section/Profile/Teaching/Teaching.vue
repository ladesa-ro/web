<script setup lang="ts">
import type { UsuarioFindOneByIdResponse } from '@ladesa-ro/management-service-client';
import { useQuery } from '@tanstack/vue-query';
import IconDiscipline from '~/components/Icons/Discipline.vue';
import ProfileCarousel from './ProfileCarousel.vue';

type Props = { user: UsuarioFindOneByIdResponse };
const { user } = defineProps<Props>();

const { isLoading, isError, data } = useQuery({
  queryKey: ['ensino', user.id],
  queryFn: async () =>
    await useApiClient().usuarios.usuarioEnsinoById({ id: user.id }),
});
</script>

<template>
  <SectionProfileSectionsLayout :icon="IconDiscipline" title="Ensino">
    <div class="state-warning" v-if="isLoading">Carregando...</div>

    <div class="state-warning" v-else-if="isError">
      Ocorreu um erro inesperado ao buscar as disciplinas vinculadas a este
      usuário.
    </div>

    <template v-else-if="data">
      <div class="state-warning" v-if="data.disciplinas.length === 0">
        Ainda não há disciplinas vinculadas a este usuário.
      </div>

      <ProfileCarousel v-else :items="data.disciplinas">
        <template #item="{ item: subject }">
          <SectionProfileTeachingCarouselItem :subject="subject" />
        </template>
      </ProfileCarousel>
    </template>
  </SectionProfileSectionsLayout>
</template>

<style>
@reference "~/assets/styles/app.css";

.state-warning {
  @apply w-full h-full flex items-center justify-center pb-15 text-center;
}
</style>
