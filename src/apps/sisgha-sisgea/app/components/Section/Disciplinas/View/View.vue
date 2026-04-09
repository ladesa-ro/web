<script lang="ts" setup>
import DisciplinasForm from '../Form/Form.vue';
import { ApiImageResource, useApiImageRoute } from '~/utils';

type Props = { resourceId: string };
const { resourceId } = defineProps<Props>();

const disciplinas = useDisciplinas();
const {
  data: disciplina,
  isLoading,
  isError,
} = disciplinas.findOne(ref(resourceId));

const coverImageSrc = useApiImageRoute(
  ApiImageResource.DISCIPLINA_COVER,
  disciplina
);

const { confirmDelete, handleDelete } = useResourceDelete({
  remove: id => disciplinas.remove(id),
  invalidate: () => disciplinas.invalidate(),
  redirectTo: '/sisgha/dape/disciplinas',
});
</script>

<template>
  <UIResourceView
    :title="disciplina?.nome ?? ''"
    :subtitle="disciplina?.nomeAbreviado"
    :image-src="coverImageSrc"
    :is-loading="isLoading"
    :is-error="isError"
  >
    <template #header-actions>
      <DialogModalEditOrCreateModal
        :edit-id="resourceId"
        :form-component="DisciplinasForm"
      />
      <UIButtonModalDelete @click="handleDelete(resourceId)" />
    </template>

    <template #details>
      <UIResourceViewFieldGroup>
        <UIResourceViewField label="Nome" :value="disciplina?.nome" />
        <UIResourceViewField
          label="Abreviação"
          :value="disciplina?.nomeAbreviado"
        />
        <UIResourceViewField
          label="Carga Horária"
          :value="
            disciplina?.cargaHoraria ? `${disciplina.cargaHoraria} horas` : null
          "
        />
      </UIResourceViewFieldGroup>
    </template>
  </UIResourceView>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    message="Deseja realmente excluir esta disciplina?"
    @confirm="confirmDelete.onConfirm"
  />
</template>
