<script lang="ts" setup>
import type {
  TurmaInputCreateView,
  TurmaInputUpdateView,
} from '@ladesa-ro/api-client-fetch';
import { useQuery } from '@tanstack/vue-query';
import { getQueryKeyForCrudModuleQueryState } from '../../../../composables/integrations/generic-crud/utils/get-query-key';
import { type ICreateOrManageConfig } from '../../../Forms/CreateOrManage/Base/Control/config';
import { setupCreateOrManageControlContext } from '../../../Forms/CreateOrManage/Contextual/useCreateOrManageControlContext';
import {
  type ITurmaFormOutput,
  type ITurmaFormSchema,
  useTurmaFormSchema,
} from './-Helpers/schema';

type Props = {
  editId?: string | null;
};

const { editId = null } = defineProps<Props>();

//

const $emit = defineEmits(['close']);
const onClose = () => $emit('close');

const schema = useTurmaFormSchema();

const {
  crudModule,
  composables: { useFindOneQuery },
} = useLadesaApiCrudTurmas();

const { query: findOneQuery } = useFindOneQuery(editId);

const formStateQuery = useQuery({
  queryKey: getQueryKeyForCrudModuleQueryState(crudModule, editId),

  queryFn: async (): Promise<ITurmaFormOutput | null> => {
    const { data } = await findOneQuery.suspense();

    if (data) {
      return {
        curso: data.curso,
        periodo: data.periodo,
        ambientePadraoAula: data.ambientePadraoAula,

        imagem: null,
        _: {} as any,
      };
    }

    return null;
  },
});

const config = {
  state: {
    editId: computed(() => editId),
  },

  schema,

  methods: {
    onFinish: onClose,
  },

  crud: {
    baseQueryKeys: crudModule.baseQueryKeys,

    create: {
      perform: async (formData) => {
        const data: TurmaInputCreateView = {
          curso: formData.curso,
          periodo: formData.periodo,
          ambientePadraoAula: formData.ambientePadraoAula,
        };

        await crudModule.create(data);

        return true;
      },
    },

    get: {
      query: formStateQuery,
    },

    delete: {
      perform: async (id) => {
        await crudModule.deleteOne(id);
        return true;
      },
    },

    update: {
      perform: async (id, formData) => {
        const data: TurmaInputUpdateView = {
          curso: formData.curso,
          periodo: formData.periodo,
          ambientePadraoAula: formData.ambientePadraoAula,
        };

        await crudModule.updateOne(id, data);

        return true;
      },
    },
  },
} satisfies ICreateOrManageConfig<
  ITurmaApiModuleTypings['CompleteView']['id'],
  ITurmaFormSchema
>;

const {
  methods: { onSubmit },
  state: { isLoading, isBusy },
} = setupCreateOrManageControlContext(config);
</script>

<template>
  <form @submit.prevent="onSubmit">
    <FormsCreateOrManageContextualForm
      title-create="Cadastrar Turma"
      title-edit="Editar Turma"
    >
      <VVSelectImage :disabled="isBusy" name="imagem" />

      <VVAutocompleteAPICurso
        :disabled="isBusy"
        :is-loading="isLoading"
        name="curso.id"
      />

      <VVAutocompleteAPIAmbiente
        :disabled="isBusy"
        :is-loading="isLoading"
        label="Sala de Aula"
        name="ambientePadraoAula.id"
      />

      <SectionTurmasFormFieldsPeriodo
        :disabled="isBusy"
        :is-loading="isLoading"
      />
    </FormsCreateOrManageContextualForm>
  </form>
</template>
