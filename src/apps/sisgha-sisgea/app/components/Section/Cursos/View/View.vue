<script lang="ts" setup>
import CursosForm from '../Form/Form.vue';
import { ApiImageResource, useApiImageRoute } from '~/utils';

type Props = { resourceId: string };
const { resourceId } = defineProps<Props>();

const cursos = useCursos();
const { data: curso, isLoading, isError } = cursos.findOne(ref(resourceId));

const coverImageSrc = useApiImageRoute(ApiImageResource.CURSO_COVER, curso);

const confirmDelete = useConfirmDelete();
const router = useRouter();

const handleDelete = async () => {
  const confirmed = await confirmDelete.confirm();
  if (confirmed) {
    await cursos.remove(resourceId);
    await cursos.invalidate();
    router.push('/sisgha/dape/cursos');
  }
};
</script>

<template>
  <UIResourceView
    :title="curso?.nome ?? ''"
    :subtitle="curso?.nomeAbreviado"
    :image-src="coverImageSrc"
    :is-loading="isLoading"
    :is-error="isError"
  >
    <template #header-actions>
      <DialogModalEditOrCreateModal
        :edit-id="resourceId"
        :form-component="CursosForm"
      />
      <UIButtonModalDelete @click="handleDelete" />
    </template>

    <template #details>
      <UIResourceViewFieldGroup>
        <UIResourceViewField label="Nome" :value="curso?.nome" />
        <UIResourceViewField label="Abreviação" :value="curso?.nomeAbreviado" />
        <UIResourceViewField
          label="Oferta de Formação"
          :value="curso?.ofertaFormacao?.nome"
        />
        <UIResourceViewField label="Campus" :value="curso?.campus?.apelido" />
      </UIResourceViewFieldGroup>
    </template>
  </UIResourceView>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    message="Deseja realmente excluir este curso?"
    @confirm="confirmDelete.onConfirm"
  />
</template>
