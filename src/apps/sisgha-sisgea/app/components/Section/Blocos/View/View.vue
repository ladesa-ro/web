<script lang="ts" setup>
import EntityDetailPage from '../../-Shared/EntityDetailPage.vue';
import BlocosForm from '../Form/Form.vue';

type Props = { resourceId: string };
const { resourceId } = defineProps<Props>();

const blocos = useBlocos();
const { data: bloco, isLoading, isError } = blocos.findOne(ref(resourceId));

const { data: coverImageSrc } = blocos.imageCover(ref(resourceId));
</script>

<template>
  <EntityDetailPage
    :resource-id="resourceId"
    :form-component="BlocosForm"
    :title="bloco?.nome"
    :subtitle="bloco?.codigo"
    :image-src="coverImageSrc"
    :is-loading="isLoading"
    :is-error="isError"
    delete-message="Deseja realmente excluir este bloco?"
    :remove="id => blocos.remove(id)"
    :invalidate="() => blocos.invalidate()"
    redirect-to="/sisgea/blocos"
  >
    <template #details>
      <UIResourceViewFieldGroup>
        <UIResourceViewField label="Nome" :value="bloco?.nome" />
        <UIResourceViewField label="Código" :value="bloco?.codigo" />
        <UIResourceViewField label="Campus" :value="bloco?.campus?.apelido" />
      </UIResourceViewFieldGroup>
    </template>
  </EntityDetailPage>
</template>
