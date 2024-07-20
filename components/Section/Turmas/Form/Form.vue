<script lang="ts" setup>
import { createFormContext } from '../../../VV/FormContext/-Context/Context';
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

const { mutateAsync: turmaHandleDelete } = useTurmaHandleDelete();

const handleDelete = async (id: string) => {
  try {
    const resposta = window.confirm(
      'Você tem certeza de que deseja deletar esta turma?'
    );

    if (resposta) {
      await turmaHandleDelete(id);
      onClose();
    }
  } catch (e) {}
};

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

const { formOnSubmit } = createFormContext<TurmaFormValues, TurmaFormOutput>({
  editId,
  onSubmit,
  existentDataRetriever: existentDataRetrieverTurma,
});

//
</script>

<template>
  <form @submit.prevent="formOnSubmit">
    <VVFormContextDialog
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
    </VVFormContextDialog>
  </form>
</template>
