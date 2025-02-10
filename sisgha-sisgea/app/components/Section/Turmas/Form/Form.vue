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
  useTurmaFormSchema,
  type ITurmaFormOutput,
  type ITurmaFormSchema,
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
  </form>
</template>
