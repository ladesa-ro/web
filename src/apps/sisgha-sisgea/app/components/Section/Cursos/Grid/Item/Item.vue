<script lang="ts" setup>
import CursosForm from '../../Form/Form.vue';

import type { CursoFindOneOutputDto } from '@ladesa-ro/web.api.client';
import { ApiImageResource, useApiImageRoute } from '~/utils';

type Props = {
  isLoading?: boolean;
  item?: CursoFindOneOutputDto | null;
  link?: string;
};

const props = defineProps<Props>();

const { item: curso } = toRefs(props);

const link = props.link === undefined || props.link === '' ? 'cursos' : props.link;

//

const coverImageSrc = useApiImageRoute(ApiImageResource.CURSO_COVER, curso);
</script>

<template>
  <UICardAutoSkeleton :skeleton="isLoading || !curso">
    <UICard
      v-if="curso"
      :src="coverImageSrc"
      :title="curso.nome"
      variant="block"
    >
      <template #actions>
        <UICardActions :to="`${link}/${curso.id}`">
          <DialogModalEditOrCreateModal :edit-id="curso.id" :form-component="CursosForm" />
        </UICardActions>
      </template>

      <UICardLine :text="`Abreviação: ${curso.nomeAbreviado}`" />
      <UICardLine :text="`Formação: ${curso.ofertaFormacao.nome}`" />
    </UICard>
  </UICardAutoSkeleton>
</template>
