<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { IconsDiscipline } from '#components';
import { usuarioEnsinoById } from '@ladesa-ro/web.api.client';
import type { UsuarioFindOneOutputDto } from '@ladesa-ro/web.api.client';
import ProfileCarousel from './ProfileCarousel.vue';

type Props = { user: UsuarioFindOneOutputDto };
const { user } = defineProps<Props>();

const api = useApiClient();
const { isLoading, isError, data } = useQuery({
  queryKey: ['ensino', user.id],
  queryFn: async () =>
    await api.call(usuarioEnsinoById, { path: { id: user.id } }),
});
</script>

<template>
  <SectionProfileSectionsLayout :icon="IconsDiscipline" title="Ensino">
    <div v-if="isLoading" class="state-warning">Carregando...</div>

    <div v-else-if="isError" class="state-warning">
      Ocorreu um erro inesperado ao buscar as disciplinas vinculadas a este
      usuário.
    </div>

    <template v-else-if="data">
      <div v-if="data.disciplinas.length === 0" class="state-warning">
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
