<script lang="ts" setup>
import ModalidadesForm from '../../Form/Form.vue';
import type { ModalidadeFindOneOutputDto } from '@ladesa-ro/web.api.client';

type Props = {
  isLoading?: boolean;
  item?: ModalidadeFindOneOutputDto | null;
  link?: string;
  editButton?: boolean;
};

const props = defineProps<Props>();

const { item: modalidade } = props;

const link = props.link === undefined || props.link === '' ? 'modalidades' : props.link;
</script>

<template>
  <UICardAutoSkeleton :skeleton="isLoading || !modalidade">
    <nuxt-link v-if="modalidade" :to="`${link}/${modalidade.id}`">
      <UICard
        :src="null"
        :title="modalidade.nome"
        variant="block"
      >
        <template #actions>
          <DialogModalEditOrCreateModal
            v-if="editButton"
            :edit-id="modalidade.id"
            :form-component="ModalidadesForm"
          />
          <IconsArrowAlt
            v-else
            class="w-4.5 rotate-180 mr-1.5 arrow-behaviour transition-transform"
          />
        </template>

        <UICardLine :text="`Slug: ${modalidade.slug}`" />
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
