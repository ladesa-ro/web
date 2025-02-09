<script lang="ts" setup>
import { setupCreateOrManageControlContext } from '../../../Forms/CreateOrManage/Contextual/useCreateOrManageControlContext';

type Props = {
  editId?: string | null;
};

const { editId = null } = defineProps<Props>();

//

const $emit = defineEmits(['close']);
const onClose = () => $emit('close');

//
// ///#region  a

// const schema = useTurmaFormSchema();

// const {
//   crudModule,
//   composables: { useDeleteMutation },
// } = useLadesaApiCrudTurmas();

// const { handleDelete: turmaDelete } = useDeleteMutation({
//   afterSuccess: () => onClose(),
// });

// //

// const { turmaSubmit } = useTurmaSubmit();

// const performSubmit = async (values: TurmaFormOutput) => {
//   await turmaSubmit({ editId: unref(editId), values });
//   onClose();
// };
// ///#endregion

//

// const {
//   state: { isLoading, isBusy },
//   methods: { onSubmit },
// } = setupCreateOrManageControlContext({
//   editId,
//   schema,
  
// });
</script>

<template>
  <div>
    carai sumiu o form de turmaskkkkkkkkkkkkkkkkkkkkkkkkkkk
  </div>
  <!-- <form @submit.prevent="onSubmit">
    <FormsCreateOrManageContextualForm
      title-edit="Editar Turma"
      title-create="Cadastrar Turma"
    >
      <VVSelectImage :disabled="isBusy" name="imagem" />

      <VVAutocompleteAPICurso
        :is-loading="isLoading"
        :disabled="isBusy"
        name="curso.id"
      />

      <VVAutocompleteAPIAmbiente
        :is-loading="isLoading"
        :disabled="isBusy"
        name="ambientePadraoAula.id"
        label="Sala de Aula"
      />

      <SectionTurmasFormFieldsPeriodo
        :is-loading="isLoading"
        :disabled="isBusy"
      />
    </FormsCreateOrManageContextualForm>
  </form> -->
</template>
