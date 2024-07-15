<script setup lang="ts">
import type { DisciplinaFindOneResultDto } from '@ladesa-ro/api-client-fetch';
import {
  ApiImageResource,
  useApiImageRoute,
} from '../../../../../integrations/api/RoutesUtil';

type Props = {
  isLoading?: boolean;
  item?: DisciplinaFindOneResultDto | null;
};

const props = defineProps<Props>();

//

const { item: disciplina } = toRefs(props);

const coverImageSrc = useApiImageRoute(
  ApiImageResource.DISCIPLINA_COVER,
  disciplina
);
</script>

<template>
  <UICardAutoSkeleton :skeleton="isLoading || !disciplina">
    <UICard v-if="disciplina" variant="block" :src="coverImageSrc">
      <template #title>
        {{ disciplina.nome }}
      </template>

      <template #actions>
        <SectionDisciplinasModal :editId="disciplina.id" />
      </template>

      <UICardLine>
        <span>Carga Horária: {{ disciplina.cargaHoraria }} horas.</span>
      </UICardLine>
      <UICardLine>
        <span>Abreviação: {{ disciplina.nomeAbreviado }}</span>
      </UICardLine>
    </UICard>
  </UICardAutoSkeleton>
</template>
