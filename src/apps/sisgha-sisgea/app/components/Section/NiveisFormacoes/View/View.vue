<script lang="ts" setup>
import NiveisFormacoesForm from '../Form/Form.vue';
import { ApiImageResource, useApiImageRoute } from '~/utils';

type Props = { resourceId: string };
const { resourceId } = defineProps<Props>();

const niveisFormacoes = useNiveisFormacoes();
const { data: nivelFormacao, isLoading, isError } = niveisFormacoes.findOne(ref(resourceId));

const coverImageSrc = useApiImageRoute(ApiImageResource.NIVEL_FORMACAO_COVER, nivelFormacao);

const confirmDelete = useConfirmDelete();
const router = useRouter();

const handleDelete = async () => {
  const confirmed = await confirmDelete.confirm();
  if (confirmed) {
    await niveisFormacoes.remove(resourceId);
    await niveisFormacoes.invalidate();
    router.push('/sisgha/dape/niveis-formacoes');
  }
};
</script>

<template>
  <UIResourceView
    :title="nivelFormacao?.nome ?? nivelFormacao?.slug ?? ''"
    :image-src="coverImageSrc"
    :is-loading="isLoading"
    :is-error="isError"
  >
    <template #header-actions>
      <DialogModalEditOrCreateModal
        :edit-id="resourceId"
        :form-component="NiveisFormacoesForm"
      />
      <UIButtonModalDelete @click="handleDelete" />
    </template>

    <template #details>
      <UIResourceViewFieldGroup>
        <UIResourceViewField label="Nome" :value="nivelFormacao?.nome" />
        <UIResourceViewField label="Slug" :value="nivelFormacao?.slug" />
      </UIResourceViewFieldGroup>
    </template>
  </UIResourceView>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    message="Deseja realmente excluir este nível de formação?"
    @confirm="confirmDelete.onConfirm"
  />
</template>
