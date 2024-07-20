<script lang="ts" setup>
import * as yup from 'yup';
import { createAPIFormContext } from '../../../API/Form/Context/Context';
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

const existentFormDataRetrieverTurma = useTurmaExistentFormDataRetriever();

//

const schema = yup.object().shape({
  imagem: yup.mixed().nullable().optional().default(null),

  curso: yup.object().shape({
    id: yup.string().required('Curso é obrigatório!').default(null),
  }),

  ambientePadraoAula: yup.object().shape({
    id: yup.string().uuid().nullable().optional().default(null),
  }),

  periodo: yup.string().required('Período é obrigatório!').default(''),
});

const { isBusy, formOnSubmit } = createAPIFormContext({
  schema,
  //
  editId,
  onSubmit,
  //
  baseQueryKey: ['turmas', 'form-data'],
  //
  existentFormDataRetriever: existentFormDataRetrieverTurma,
});

//
</script>

<template>
  <form @submit.prevent="formOnSubmit">
    <APIFormContextDialog
      :on-close="onClose"
      :on-delete="handleDelete"
      title-edit="Editar Turma"
      title-create="Cadastrar Nova Turma"
    >
      <template #body>
        <VVSelectImage :disabled="isBusy" name="imagem" />

        <VVAutocompleteCurso :disabled="isBusy" name="curso.id" />

        <VVAutocompleteAmbiente
          :disabled="isBusy"
          name="ambientePadraoAula.id"
          label="Sala de Aula"
        />

        <SectionTurmasFormFieldsPeriodo />
      </template>
    </APIFormContextDialog>
  </form>
</template>
