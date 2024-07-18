<script setup lang="ts">
import type { CursoFindOneResultDto } from '@ladesa-ro/api-client-fetch';
import {
  ApiImageResource,
  useApiImageRoute,
} from '../../../../../integrations/api/RoutesUtil';

type Props = {
  isLoading?: boolean;
  item?: CursoFindOneResultDto | null;
};

const props = defineProps<Props>();

//

const { item: curso } = toRefs(props);

const coverImageSrc = useApiImageRoute(ApiImageResource.CURSO_COVER, curso);
</script>

<template>
  <UICardAutoSkeleton :skeleton="isLoading || !curso">
    <UICard v-if="curso" variant="block" :src="coverImageSrc">
      <template #title>
        {{ curso.nome }}
      </template>

      <template #actions>
        <SectionCursosModal :editId="curso.id" />
      </template>

      <UICardLine>
        <span>Abreviação: {{ curso.nomeAbreviado }}</span>
      </UICardLine>
      <UICardLine>
        <span>Modalidade: {{ curso.modalidade.nome }}</span>
      </UICardLine>
    </UICard>
  </UICardAutoSkeleton>
</template>
