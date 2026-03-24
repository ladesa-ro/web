<script lang="ts" setup>
import FormacoesForm from '../../Form/Form.vue';

import type { OfertaFormacaoFindOneOutputDto } from '~/helpers/api-client';

type Props = {
  isLoading?: boolean;
  item?: OfertaFormacaoFindOneOutputDto | null;
};

const props = defineProps<Props>();

const { item: formacao } = toRefs(props);

const modalidadeNome = computed(() => formacao.value?.modalidade?.nome ?? '-');

const niveisFormacoesText = computed(() => {
  const niveis = formacao.value?.niveisFormacoes;
  if (!niveis || niveis.length === 0) return '-';
  return niveis.map(n => n.slug).join(', ');
});
</script>

<template>
  <UICardAutoSkeleton :skeleton="isLoading || !formacao">
    <UICard v-if="formacao" :src="null" :title="formacao.nome" variant="block">
      <template #actions>
        <DialogModalEditOrCreateModal
          :edit-id="formacao.id"
          :form-component="FormacoesForm"
        />
      </template>

      <UICardLine :text="`Abreviação: ${formacao.slug}`" />
      <UICardLine :text="`Modalidade: ${modalidadeNome}`" />
    </UICard>
  </UICardAutoSkeleton>
</template>
