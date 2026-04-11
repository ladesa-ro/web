<script lang="ts" setup>
import TurmasForm from '../Form/Form.vue';

type Props = { resourceId: string };
const { resourceId } = defineProps<Props>();

const turmas = useTurmas();
const { data: turma, isLoading, isError } = turmas.findOne(ref(resourceId));

const { data: coverImageSrc } = turmas.imageCover(ref(resourceId));

const confirmDelete = useConfirmDelete();
const router = useRouter();

const handleDelete = async () => {
  const confirmed = await confirmDelete.confirm();
  if (confirmed) {
    await turmas.remove(resourceId);
    await turmas.invalidate();
    router.push('/sisgha/dape/turmas');
  }
};
</script>

<template>
  <UIResourceView
    :title="`${turma?.periodo ?? ''} - ${turma?.curso?.nomeAbreviado ?? ''}`"
    :subtitle="turma?.curso?.ofertaFormacao?.nome"
    :image-src="coverImageSrc"
    :is-loading="isLoading"
    :is-error="isError"
  >
    <template #header-actions>
      <DialogModalEditOrCreateModal
        :edit-id="resourceId"
        :form-component="TurmasForm"
      />
      <UIButtonModalDelete @click="handleDelete" />
    </template>

    <template #details>
      <UIResourceViewFieldGroup>
        <UIResourceViewField label="Período" :value="turma?.periodo" />
        <UIResourceViewField label="Curso" :value="turma?.curso?.nome" />
        <UIResourceViewField
          label="Ambiente Padrão de Aula"
          :value="turma?.ambientePadraoAula?.nome"
        />
        <UIResourceViewField
          label="Formação"
          :value="turma?.curso?.ofertaFormacao?.nome"
        />
      </UIResourceViewFieldGroup>
    </template>
  </UIResourceView>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    message="Deseja realmente excluir esta turma?"
    @confirm="confirmDelete.onConfirm"
  />
</template>
