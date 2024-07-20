<script lang="ts" setup>
import { createAPIFormContext } from '../../../API/Form/Context/Context';
import type { TurmaFormOutput, TurmaFormValues } from './-Helpers/typings';
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

const { mutateAsync: turmaHandleSubmit } = useTurmaHandleSubmit();

const onSubmit = async (values: TurmaFormOutput) => {
  await turmaHandleSubmit({ editId: unref(editId), values });
  onClose();
};

//

const apiClient = useApiClient();

const existentDataRetrieverTurma = async (
  id: string
): Promise<TurmaFormValues> => {
  const turma = await apiClient.turmas.turmaFindById({ id });

  return {
    imagem: null,
    periodo: turma.periodo,
    curso: { id: turma.curso.id ?? null },
    ambientePadraoAula: { id: turma.ambientePadraoAula?.id ?? null },
  };
};
//

const { formOnSubmit } = createAPIFormContext<TurmaFormValues, TurmaFormOutput>(
  {
    editId,
    onSubmit,
    existentDataRetriever: existentDataRetrieverTurma,
  }
);

//
</script>

<template>
  <form @submit.prevent="formOnSubmit">
    <APIFormContextDialog
      class="form"
      :on-close="onClose"
      :on-delete="handleDelete"
      title-edit="Editar Turma"
      title-create="Cadastrar Nova Turma"
    >
      <template #body>
        <VVSelectImage name="imagem" />

        <VVAutocompleteCurso name="curso.id" />

        <VVAutocompleteAmbiente
          name="ambientePadraoAula.id"
          label="Sala de Aula"
        />

        <SectionTurmasFormFieldsPeriodo />
      </template>
    </APIFormContextDialog>
  </form>
</template>
