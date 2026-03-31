<script lang="ts" setup>
import type { DisciplinaFindOneOutputDto } from '@ladesa-ro/web.api.client';
import { ApiImageResource, useApiImageRoute } from '~/utils';
import DisciplinasForm from '../../Form/Form.vue';

type Props = {
  isLoading?: boolean;
  item?: DisciplinaFindOneOutputDto | null;
  link?: string;
  editButton?: boolean;
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
    <nuxt-link v-if="disciplina" :to="link + `/${disciplina.id}`">
      <UICard
        :src="coverImageSrc"
        :title="disciplina.nome"
        variant="block"
      >
        <template #actions>
          <DialogModalEditOrCreateModal
            v-if="editButton"
            :edit-id="disciplina.id"
            :form-component="DisciplinasForm"
          />
          <IconsArrowAlt
            v-else
            class="w-4.5 rotate-180 mr-1.5 arrow-behaviour transition-transform"
          />
        </template>

        <UICardLine :text="`Carga Horária: ${disciplina.cargaHoraria} horas`" />
        <UICardLine :text="`Abreviação: ${disciplina.nomeAbreviado}`" />
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
