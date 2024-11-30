<script setup lang="ts">
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

//

const { item: curso } = toRefs(props);

const coverImageSrc = useApiImageRoute(ApiImageResource.CURSO_COVER, curso.value);
</script>

<template>
  <UICardAutoSkeleton :skeleton="isLoading || !curso">
    <UICard v-if="curso" variant="block" :src="coverImageSrc">
      <template #title>
        {{ curso.nome }}
      </template>

      <template #actions>
        <LazySectionCursosModal :editId="curso.id" />
      </template>

      <UICardLine>
        <span>Abreviação: {{ curso.nomeAbreviado }}</span>
      </UICardLine>
      <UICardLine>
        <span>Oferta de Formação: {{ curso.ofertaFormacao.nome }}</span>
      </UICardLine>
    </UICard>
  </UICardAutoSkeleton>
</template>
