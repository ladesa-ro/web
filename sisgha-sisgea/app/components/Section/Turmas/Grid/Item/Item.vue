<script setup lang="ts">
import type { TurmaFindOneResultView } from '@ladesa-ro/api-client-fetch';
import EditOrCreateModal from '~/components/Dialog/Modal/EditOrCreateModal.vue';
import { ApiImageResource, useApiImageRoute } from '~/utils';
import TurmasForm from '../../Form/Form.vue';

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
    <UICard
      v-if="turma"
      :title="`${turma.periodo} - ${turma.curso.ofertaFormacao.nome}`"
      variant="block"
      :src="coverImageSrc"
    >
      <template #actions>
        <EditOrCreateModal :edit-id="turma.id" :formComponent="TurmasForm" />
      </template>

      <UICardLine :text="`Curso: ${turma.curso.nomeAbreviado}`" />
      <UICardLine :text="`Turno: Matutino e Vespertino`" />
    </UICard>
  </UICardAutoSkeleton>
</template>
