<script lang="ts" setup>
import CampusForm from '../Form/Form.vue';

type Props = { resourceId: string };
const { resourceId } = defineProps<Props>();

const campi = useCampi();
const { data: campus, isLoading, isError } = campi.findOne(ref(resourceId));

const confirmDelete = useConfirmDelete();
const router = useRouter();

const handleDelete = async () => {
  const confirmed = await confirmDelete.confirm();
  if (confirmed) {
    await campi.remove(resourceId);
    await campi.invalidate();
    router.push('/sisgea/campus');
  }
};
</script>

<template>
  <UIResourceView
    :title="campus?.apelido ?? ''"
    :subtitle="campus?.nomeFantasia"
    :image-src="null"
    :is-loading="isLoading"
    :is-error="isError"
  >
    <template #breadcrumb />

    <template #header-actions>
      <DialogModalEditOrCreateModal
        :edit-id="resourceId"
        :form-component="CampusForm"
      />
      <UIButtonModalDelete @click="handleDelete" />
    </template>

    <template #details>
      <UIResourceViewFieldGroup>
        <UIResourceViewField label="Apelido" :value="campus?.apelido" />
        <UIResourceViewField label="Nome Fantasia" :value="campus?.nomeFantasia" />
        <UIResourceViewField label="Razão Social" :value="campus?.razaoSocial" />
        <UIResourceViewField label="CNPJ" :value="campus?.cnpj" />
      </UIResourceViewFieldGroup>

      <UIResourceViewFieldGroup>
        <UIResourceViewField label="CEP" :value="campus?.endereco?.cep" />
        <UIResourceViewField label="Logradouro" :value="campus?.endereco?.logradouro" />
        <UIResourceViewField label="Número" :value="campus?.endereco?.numero?.toString()" />
        <UIResourceViewField label="Bairro" :value="campus?.endereco?.bairro" />
        <UIResourceViewField label="Complemento" :value="campus?.endereco?.complemento" />
        <UIResourceViewField label="Ponto de Referência" :value="campus?.endereco?.pontoReferencia" />
        <UIResourceViewField label="Cidade" :value="campus?.endereco?.cidade?.nome" />
        <UIResourceViewField label="Estado" :value="campus?.endereco?.cidade?.estado?.sigla" />
      </UIResourceViewFieldGroup>
    </template>
  </UIResourceView>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    message="Deseja realmente excluir este campus?"
    @confirm="confirmDelete.onConfirm"
  />
</template>
