<script lang="ts" setup>
import FormacoesForm from '../../Form/Form.vue';

import type { OfertaFormacaoFindOneOutputDto } from '@ladesa-ro/web.api.client';

type Props = {
  isLoading?: boolean;
  item?: OfertaFormacaoFindOneOutputDto | null;
  link?: string;
  editButton?: boolean;
};

const props = defineProps<Props>();

const { item: formacao } = toRefs(props);

const link = props.link === undefined || props.link === '' ? 'formacoes' : props.link;

const modalidadeNome = computed(() => formacao.value?.modalidade?.nome ?? '-');

const niveisFormacoesText = computed(() => {
  const niveis = formacao.value?.niveisFormacoes;
  if (!niveis || niveis.length === 0) return '-';
  return niveis.map(n => n.slug).join(', ');
});
</script>

<template>
  <UICardAutoSkeleton :skeleton="isLoading || !formacao">
    <nuxt-link v-if="formacao" :to="`${link}/${formacao.id}`">
      <UICard :src="null" :title="formacao.nome" variant="block">
        <template #actions>
          <DialogModalEditOrCreateModal
            v-if="editButton"
            :edit-id="formacao.id"
            :form-component="FormacoesForm"
          />
          <IconsArrowAlt
            v-else
            class="w-4.5 rotate-180 mr-1.5 arrow-behaviour transition-transform"
          />
        </template>

        <UICardLine :text="`Abreviação: ${formacao.slug}`" />
        <UICardLine :text="`Modalidade: ${modalidadeNome}`" />
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
