<script lang="ts" setup>
import CursosForm from '../../Form/Form.vue';

import type { CursoFindOneResultView } from '@ladesa-ro/api-client-fetch';
import { ApiImageResource, useApiImageRoute } from '~/utils';

type Props = {
  isLoading?: boolean;
  item?: CursoFindOneResultView | null;
};

const props = defineProps<Props>();

const { item: curso } = toRefs(props);

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
        <DialogModalEditOrCreateModal
          :edit-id="curso.id"
          :form-component="CursosForm"
        />
      </template>

      <UICardLine :text="`Abreviação: ${curso.nomeAbreviado}`" />
      <UICardLine :text="`Formação: ${curso.ofertaFormacao.nome}`" />
    </UICard>
  </UICardAutoSkeleton>
</template>
