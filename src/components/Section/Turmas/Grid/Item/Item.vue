<script setup lang="ts">
import type { TurmaFindOneResultView } from '@ladesa-ro/api-client-fetch';
import {
  ApiImageResource,
  useApiImageRoute,
} from '../../../../../integrations/api/RoutesUtil';

type Props = {
  isLoading?: boolean;
  item?: TurmaFindOneResultView | null;
};

const props = defineProps<Props>();

//

const { item: turma } = toRefs(props);

const coverImageSrc = useApiImageRoute(ApiImageResource.TURMA_COVER, turma);
</script>

<template>
  <UICardAutoSkeleton :skeleton="isLoading || !turma">
    <UICard v-if="turma" variant="block" :src="coverImageSrc">
      <template #title>
        {{ turma.periodo }} - {{ turma.curso.ofertaFormacao.nome }}
      </template>

      <template #actions>
        <LazySectionTurmasModal :edit-id="turma.id" />
      </template>

      <UICardLine>
        <span>Curso: {{ turma.curso.nomeAbreviado }}</span>
      </UICardLine>
      <UICardLine>
        <span>Turno: Matutino e Vespertino</span>
      </UICardLine>
    </UICard>
  </UICardAutoSkeleton>
</template>
