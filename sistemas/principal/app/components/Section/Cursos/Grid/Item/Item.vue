<script setup lang="ts">
import CursosForm from '../../Form/Form.vue';

import type { CursoFindOneResultView } from '@ladesa-ro/api-client-fetch';
import {
  ApiImageResource,
  useApiImageRoute,
} from '../../../../../integrations/api/RoutesUtil';

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
      :title="curso.nome"
      variant="block"
      :src="coverImageSrc"
    >
      <template #actions>
        <DialogModalEditOrCreateModal
          :form-component="CursosForm"
          :edit-id="curso.id"
        />
      </template>

      <UICardLine :text="`Abreviação: ${curso.nomeAbreviado}`" />
      <UICardLine :text="`Formação: ${curso.ofertaFormacao.nome}`" />
    </UICard>
  </UICardAutoSkeleton>
</template>
