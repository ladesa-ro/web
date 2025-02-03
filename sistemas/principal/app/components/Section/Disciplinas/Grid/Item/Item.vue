<script setup lang="ts">
import type { DisciplinaFindOneResultView } from '@ladesa-ro/api-client-fetch';
import { ApiImageResource, useApiImageRoute } from '~/utils';
import DisciplinasForm from '../../Form/Form.vue';

type Props = {
  isLoading?: boolean;
  item?: DisciplinaFindOneResultView | null;
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
    <UICard
      v-if="disciplina"
      :title="disciplina.nome"
      variant="block"
      :src="coverImageSrc"
    >
      <template #actions>
        <DialogModalEditOrCreateModal
          :form-component="DisciplinasForm"
          :edit-id="disciplina.id"
        />
      </template>

      <UICardLine :text="`Carga Horária: ${disciplina.cargaHoraria} horas`" />
      <UICardLine :text="`Abreviação: ${disciplina.nomeAbreviado}`" />
    </UICard>
  </UICardAutoSkeleton>
</template>
