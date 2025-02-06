<script lang="ts" setup>
import { CRUD_FORM_QUERY_CONTEXT } from '../../../Integrations/Crud/Form/Context/Typings';
import { useCrudFormQuery } from '../../../Integrations/Crud/Form/useCrudFormQuery';
import { useTurmaFormSchema } from './-Helpers/schema';
import type { TurmaFormOutput } from './-Helpers/typings';
import { useTurmaSubmit } from './-Helpers/useTurmaSubmit';

type Props = {
  editId?: string | null;
};

const { editId = null } = defineProps<Props>();

//

const $emit = defineEmits(['close']);
const onClose = () => $emit('close');

//

const schema = useTurmaFormSchema();

const {
  crudModule,
  composables: { useDeleteMutation },
} = useLadesaApiCrudTurmas();

const { handleDelete: turmaDelete } = useDeleteMutation({
  afterSuccess: () => onClose(),
});

//

const { turmaSubmit } = useTurmaSubmit();

const onSubmit = async (values: TurmaFormOutput) => {
  await turmaSubmit({ editId: unref(editId), values });
  onClose();
};

//

const crudFormQuery = useCrudFormQuery({
  editId,
  crudModule,
  onSubmit,
  schema,
});

const { isBusy, isLoading, formOnSubmit } = crudFormQuery;

provide(CRUD_FORM_QUERY_CONTEXT, crudFormQuery);

await crudFormQuery.suspense();
</script>

<template>
  <form @submit.prevent="formOnSubmit">
    <IntegrationsCrudFormDialog
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
    </IntegrationsCrudFormDialog>
  </form>
</template>
