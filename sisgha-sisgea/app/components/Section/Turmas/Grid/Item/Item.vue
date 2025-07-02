<script lang="ts" setup>
import type { TurmaFindOneResultView } from '@ladesa-ro/api-client-fetch';
import EditOrCreateModal from '~/components/Dialog/Modal/EditOrCreateModal.vue';
import { ApiImageResource, useApiImageRoute } from '~/utils';
import TurmasForm from '../../Form/Form.vue';

type Props = {
  isLoading?: boolean;
  item?: TurmaFindOneResultView | null;
  link?: string;
};

//

const { item: turma, link: linkProps } = defineProps<Props>();

let link = linkProps === undefined || linkProps === '' ? 'turmas' : linkProps;

//

const coverImageSrc = useApiImageRoute(ApiImageResource.TURMA_COVER, turma);
</script>

<template>
  <UICardAutoSkeleton :skeleton="isLoading || !turma">
    <nuxt-link v-if="turma" :to="link + `/${turma.id}`">
      <UICard
        :src="coverImageSrc"
        :title="`${turma.periodo} - ${turma.curso.nomeAbreviado}`"
        variant="block"
      >
        <template #actions>
          <EditOrCreateModal
            v-if="link === 'turmas'"
            :edit-id="turma.id"
            :formComponent="TurmasForm"
          />
          <IconsArrowIconArrowAlt v-else class="w-4.5 rotate-180 mr-1" />
        </template>

        <UICardLine :text="`Formação: ${turma.curso.ofertaFormacao.nome}`" />
        <UICardLine :text="`Turno: Matutino e Vespertino`" />
      </UICard>
    </nuxt-link>
  </UICardAutoSkeleton>
</template>
