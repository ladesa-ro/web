<script lang="ts" setup>
import NiveisFormacoesForm from '../../Form/Form.vue';
import type { NivelFormacaoFindOneOutputDto } from '@ladesa-ro/web.api.client';

type Props = {
  isLoading?: boolean;
  item?: NivelFormacaoFindOneOutputDto | null;
  link?: string;
  editButton?: boolean;
};

const props = defineProps<Props>();

const { item: nivelFormacao } = props;

const link = props.link === undefined || props.link === '' ? 'niveis-formacoes' : props.link;
</script>

<template>
  <UICardAutoSkeleton :skeleton="isLoading || !nivelFormacao">
    <nuxt-link v-if="nivelFormacao" :to="`${link}/${nivelFormacao.id}`">
      <UICard
        :src="null"
        :title="nivelFormacao.slug"
        variant="block"
      >
        <template #actions>
          <DialogModalEditOrCreateModal
            v-if="editButton"
            :edit-id="nivelFormacao.id"
            :form-component="NiveisFormacoesForm"
          />
          <IconsArrowAlt
            v-else
            class="w-4.5 rotate-180 mr-1.5 arrow-behaviour transition-transform"
          />
        </template>

        <UICardLine :text="`Slug: ${nivelFormacao.slug}`" />
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
