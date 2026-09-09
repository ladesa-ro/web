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

    <template #related>
      <UICollapsible class="turma-alunos-collapsible u-rounded-lg">
        <template #trigger>
          <div
            class="turma-alunos-trigger u-flex u-items-center u-justify-between u-p-5 u-font-medium"
          >
            Alunos

            <IconsArrow class="turma-alunos-trigger-icon" />
          </div>
        </template>

        <div class="u-p-5 u-pt-0">
          <SectionTurmasViewAlunos
            :turma-id="resourceId"
            :campus-id="turma?.curso?.campus?.id"
          />
        </div>
      </UICollapsible>
    </template>
  </UIResourceView>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    message="Deseja realmente excluir esta turma?"
    @confirm="confirmDelete.onConfirm"
  />
</template>

<style scoped>
.turma-alunos-collapsible {
  border: 2px solid var(--ladesa-grey-color);
}

.turma-alunos-trigger:hover {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 10%);
}

.turma-alunos-trigger-icon {
  color: var(--ladesa-text-green-color);
}
</style>
