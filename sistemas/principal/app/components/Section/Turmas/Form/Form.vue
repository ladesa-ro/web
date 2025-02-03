<script lang="ts" setup>
import { useTurmaDelete } from '~/utils';
import { createAPIFormContext } from '../../../API/Form/Context/Context';
import { useTurmaFormSchema } from './-Helpers/schema';
import type { TurmaFormOutput } from './-Helpers/typings';
import { useTurmaFormExistentDataRetriever } from './-Helpers/useTurmaFormExistentDataRetriever';
import { useTurmaSubmit } from './-Helpers/useTurmaSubmit';

type Props = {
  editId?: string | null;
};
const props = withDefaults(defineProps<Props>(), {
  editId: null,
});
const { editId } = toRefs(props);

//

const $emit = defineEmits(['close']);
const onClose = () => $emit('close');

//

const schema = useTurmaFormSchema();
const formExistentDataRetrieverTurma = useTurmaFormExistentDataRetriever();

const { handleDelete: turmaDelete } = useTurmaDelete({
  afterSuccess: () => onClose(),
});

//

const { turmaSubmit } = useTurmaSubmit();

const onSubmit = async (values: TurmaFormOutput) => {
  await turmaSubmit({ editId: unref(editId), values });
  onClose();
};

//

const { isBusy, isLoading, formOnSubmit } = createAPIFormContext({
  schema,
  //
  editId,
  onSubmit,
  //
  baseQueryKey: ['turmas'],
  //
  formExistentDataRetriever: formExistentDataRetrieverTurma,
});

//
</script>

<template>
  <form @submit.prevent="formOnSubmit">
    <APIFormContextDialog
      :is-busy="isBusy"
      :is-loading="isLoading"
      :on-close="onClose"
      :on-delete="turmaDelete"
      title-edit="Editar Turma"
      title-create="Cadastrar Turma"
    >
      <VVSelectImage :disabled="isLoading || isBusy" name="imagem" />

      <VVAutocompleteAPICurso
        :is-loading="isLoading"
        :disabled="isLoading || isBusy"
        name="curso.id"
      />

      <VVAutocompleteAPIAmbiente
        :is-loading="isLoading"
        :disabled="isLoading || isBusy"
        name="ambientePadraoAula.id"
        label="Sala de Aula"
      />

      <SectionTurmasFormFieldsPeriodo
        :is-loading="isLoading"
        :disabled="isLoading || isBusy"
      />
    </APIFormContextDialog>
  </form>
</template>
