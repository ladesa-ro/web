<script lang="ts" setup>
import CursosForm from '../../Form/Form.vue';

import type { CursoFindOneOutputDto } from '@ladesa-ro/web.api.client';
import { ApiImageResource, useApiImageRoute } from '~/utils';

type Props = {
  isLoading?: boolean;
  item?: CursoFindOneOutputDto | null;
  link?: string;
  editButton?: boolean;
};

const props = defineProps<Props>();

const { item: curso } = toRefs(props);

const link = props.link === undefined || props.link === '' ? 'cursos' : props.link;

//

const coverImageSrc = useApiImageRoute(ApiImageResource.CURSO_COVER, curso);
</script>

<template>
  <UICardAutoSkeleton :skeleton="isLoading || !curso">
    <nuxt-link v-if="curso" :to="link + `/${curso.id}`">
      <UICard
        :src="coverImageSrc"
        :title="curso.nome"
        variant="block"
      >
        <template #actions>
          <DialogModalEditOrCreateModal
            v-if="editButton"
            :edit-id="curso.id"
            :form-component="CursosForm"
          />
          <IconsArrowAlt
            v-else
            class="w-4.5 rotate-180 mr-1.5 arrow-behaviour transition-transform"
          />
        </template>

        <UICardLine :text="`Abreviação: ${curso.nomeAbreviado}`" />
        <UICardLine :text="`Formação: ${curso.ofertaFormacao.nome}`" />
      </UICard>
    </nuxt-link>
  </UICardAutoSkeleton>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

a:hover .arrow-behaviour {
  @apply translate-x-1;
}
</style>
