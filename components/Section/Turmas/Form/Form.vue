<script lang="ts" setup>
import { createAPIFormContext } from '../../../API/Form/Context/Context';
import { useTurmaFormSchema } from './-Helpers/schema';
import type { TurmaFormOutput } from './-Helpers/typings';
import { useTurmaExistentFormDataRetriever } from './-Helpers/useTurmaExistentDataRetriever';
import { useTurmaHandleDelete } from './-Helpers/useTurmaHandleDelete';
import { useTurmaHandleSubmit } from './-Helpers/useTurmaHandleSubmit';

//

const props = defineProps({
  editId: {
    type: String,
    required: false,
    default: null,
  },
});

const { editId } = toRefs(props);

//

const $emit = defineEmits(['close']);
const onClose = () => $emit('close');

//

const schema = useTurmaFormSchema();
const existentFormDataRetrieverTurma = useTurmaExistentFormDataRetriever();

const { handleDelete } = useTurmaHandleDelete({
  afterSuccess: () => onClose(),
});

//

const { handleSubmit: turmaHandleSubmit } = useTurmaHandleSubmit();

const onSubmit = async (values: TurmaFormOutput) => {
  await turmaHandleSubmit({ editId: unref(editId), values });
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
  existentFormDataRetriever: existentFormDataRetrieverTurma,
});

//
</script>

<template>
  <form @submit.prevent="formOnSubmit">
    <APIFormContextDialog
      :is-busy="isBusy"
      :is-loading="isLoading"
      :on-close="onClose"
      :on-delete="handleDelete"
      title-edit="Editar Turma"
      title-create="Cadastrar Nova Turma"
    >
      <template #body>
        <VVSelectImage :disabled="isLoading || isBusy" name="imagem" />

        <VVAutocompleteCurso
          :is-loading="isLoading"
          :disabled="isLoading || isBusy"
          name="curso.id"
        />

        <VVAutocompleteAmbiente
          :is-loading="isLoading"
          :disabled="isLoading || isBusy"
          name="ambientePadraoAula.id"
          label="Sala de Aula"
        />

        <SectionTurmasFormFieldsPeriodo  :is-loading="isLoading"
        :disabled="isLoading || isBusy" />
      </template>
    </APIFormContextDialog>
  </form>
</template>
