<script lang="ts" setup>
import FormacoesForm from '../Form/Form.vue';
import { ApiImageResource, useApiImageRoute } from '~/utils';

type Props = { resourceId: string };
const { resourceId } = defineProps<Props>();

const ofertasFormacoes = useOfertasFormacoes();
const { data: formacao, isLoading, isError } = ofertasFormacoes.findOne(ref(resourceId));

const coverImageSrc = useApiImageRoute(ApiImageResource.OFERTA_FORMACAO_COVER, formacao);

const modalidadeNome = computed(() => formacao.value?.modalidade?.nome ?? '-');

const niveisFormacoesText = computed(() => {
  const niveis = formacao.value?.niveisFormacoes;
  if (!niveis || niveis.length === 0) return '-';
  return niveis.map(n => n.slug).join(', ');
});

const { confirmDelete, handleDelete } = useResourceDelete({
  remove: (id) => ofertasFormacoes.remove(id),
  invalidate: () => ofertasFormacoes.invalidate(),
  redirectTo: '/sisgha/dape/formacoes',
});
</script>

<template>
  <UIResourceView
    :title="formacao?.nome ?? ''"
    :subtitle="formacao?.slug"
    :is-loading="isLoading"
    :is-error="isError"
    :image-src="coverImageSrc"
  >
    <template #header-actions>
      <DialogModalEditOrCreateModal
        :edit-id="resourceId"
        :form-component="FormacoesForm"
      />
      <UIButtonModalDelete @click="handleDelete(resourceId)" />
    </template>

    <template #details>
      <UIResourceViewFieldGroup>
        <UIResourceViewField label="Nome" :value="formacao?.nome" />
        <UIResourceViewField label="Slug" :value="formacao?.slug" />
        <UIResourceViewField label="Modalidade" :value="modalidadeNome" />
        <UIResourceViewField label="Níveis de Formação" :value="niveisFormacoesText" />
      </UIResourceViewFieldGroup>
    </template>
  </UIResourceView>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    message="Deseja realmente excluir esta oferta de formação?"
    @confirm="confirmDelete.onConfirm"
  />
</template>
