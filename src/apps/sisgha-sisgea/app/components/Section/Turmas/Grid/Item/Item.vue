<script lang="ts" setup>
import EditOrCreateModal from '~/components/Dialog/Modal/EditOrCreateModal.vue';
import type { TurmaFindOneOutputDto } from '@ladesa-ro/web.api.client';
import { ApiImageResource, useApiImageRoute } from '~/utils';
import TurmasForm from '../../Form/Form.vue';

type Props = {
  isLoading?: boolean;
  item?: TurmaFindOneOutputDto | null;
  link?: string;
};

//

const { item: turma, link: linkProps } = defineProps<Props>();

const link = linkProps === undefined || linkProps === '' ? 'turmas' : linkProps;

//

const coverImageSrc = useApiImageRoute(ApiImageResource.TURMA_COVER, turma);
</script>

<template>
  <UICardAutoSkeleton :skeleton="isLoading || !turma">
    <UICard
      v-if="turma"
      :src="coverImageSrc"
      :title="`${turma.periodo} - ${turma.curso.nomeAbreviado}`"
      variant="block"
    >
      <template #actions>
        <UICardActions :to="link + `/${turma.id}`">
          <EditOrCreateModal :edit-id="turma.id" :form-component="TurmasForm" />
        </UICardActions>
      </template>

      <UICardLine :text="`Formação: ${turma.curso.ofertaFormacao.nome}`" />
      <UICardLine text="Turno: Matutino e Vespertino" />
    </UICard>
  </UICardAutoSkeleton>
</template>
