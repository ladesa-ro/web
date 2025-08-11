<script lang="ts" setup>
import type { Ladesa_ManagementService_Domain_Contracts_DisciplinaFindOneOutput as DisciplinaFindOneOutput } from '@ladesa-ro/management-service-client';
import { ApiImageResource, useApiImageRoute } from '~/utils';
import DisciplinasForm from '../../Form/Form.vue';

type Props = {
  isLoading?: boolean;
  item?: DisciplinaFindOneOutput | null;
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
      :src="coverImageSrc"
      :title="disciplina.nome"
      variant="block"
    >
      <template #actions>
        <DialogModalEditOrCreateModal
          :edit-id="disciplina.id"
          :form-component="DisciplinasForm"
        />
      </template>

      <UICardLine :text="`Carga Horária: ${disciplina.cargaHoraria} horas`" />
      <UICardLine :text="`Abreviação: ${disciplina.nomeAbreviado}`" />
    </UICard>
  </UICardAutoSkeleton>
</template>
