<script lang="ts" setup>
import type { DisciplinaFindOneOutputDto } from '@ladesa-ro/web.api.client';
import { ApiImageResource, useApiImageRoute } from '~/utils';
import DisciplinasForm from '../../Form/Form.vue';

type Props = {
  isLoading?: boolean;
  item?: DisciplinaFindOneOutputDto | null;
  link?: string;
};

const props = defineProps<Props>();

//

const { item: disciplina } = toRefs(props);

const link = props.link === undefined || props.link === '' ? 'disciplinas' : props.link;

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
        <UICardActions :to="`${link}/${disciplina.id}`">
          <DialogModalEditOrCreateModal :edit-id="disciplina.id" :form-component="DisciplinasForm" />
        </UICardActions>
      </template>

      <UICardLine :text="`Carga Horária: ${disciplina.cargaHoraria} horas`" />
      <UICardLine :text="`Abreviação: ${disciplina.nomeAbreviado}`" />
    </UICard>
  </UICardAutoSkeleton>
</template>
