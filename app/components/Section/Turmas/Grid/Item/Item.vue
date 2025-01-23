<script setup lang="ts">
import TurmasForm from '../../Form/Form.vue';
import type { TurmaFindOneResultView } from '@ladesa-ro/api-client-fetch';
import {
  ApiImageResource,
  useApiImageRoute,
} from '../../../../../integrations/api/RoutesUtil';
import EditOrCreateModal from '~/components/Dialog/Modal/EditOrCreateModal.vue';

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
        <EditOrCreateModal
          :edit-id="turma.id"
          :formComponent="TurmasForm"
        />
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
