<script lang="ts" setup>
import type { Ladesa_ManagementService_Domain_Contracts_TurmaFindOneOutput as TurmaFindOneOutput } from '@ladesa-ro/management-service-client';
import EditOrCreateModal from '~/components/Dialog/Modal/EditOrCreateModal.vue';
import { ApiImageResource, useApiImageRoute } from '~/utils';
import TurmasForm from '../../Form/Form.vue';

type Props = {
  isLoading?: boolean;
  item?: TurmaFindOneOutput | null;
  link?: string;
  editButton?: boolean
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
            v-if="editButton"
            :edit-id="turma.id"
            :formComponent="TurmasForm"
          />
          <IconsArrowAlt
            v-else
            class="w-4.5 rotate-180 mr-1.5 arrow-behaviour transition-transform"
          />
        </template>

        <UICardLine :text="`Formação: ${turma.curso.ofertaFormacao.nome}`" />
        <UICardLine text="Turno: Matutino e Vespertino" />
      </UICard>
    </nuxt-link>
  </UICardAutoSkeleton>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

a:hover .arrow-behaviour {
  @apply translate-x-1;
}
</style>
