<script setup lang="ts">
import type { TurmaFindOneResultDto } from '@ladesa-ro/api-client-fetch';
import {
  ApiImageResource,
  useApiImageRoute,
} from '../../../../../integrations/api/RoutesUtil';

type Props = {
  isLoading?: boolean;
  item?: TurmaFindOneResultDto | null;
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
        {{ turma.periodo }} - {{ turma.curso.modalidade.nome }}
      </template>

      <template #actions>
        <LazySectionTurmasModal :editId="turma.id" />
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
