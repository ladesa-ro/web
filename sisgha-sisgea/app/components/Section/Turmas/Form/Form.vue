<script lang="ts" setup>
import type {
  Ladesa_ManagementService_Domain_Contracts_TurmaCreateInput as TurmaCreateInput,
  Ladesa_ManagementService_Domain_Contracts_TurmaUpdateInput as TurmaUpdateInput,
} from '@ladesa-ro/management-service-client';
import { useQuery } from '@tanstack/vue-query';
import { getQueryKeyForCrudModuleQueryState } from '../../../../composables/integrations/generic-crud/utils/get-query-key';
import { type ICreateOrManageConfig } from '../../../Forms/CreateOrManage/Base/Control/config';
import { setupCreateOrManageControlContext } from '../../../Forms/CreateOrManage/Contextual/useCreateOrManageControlContext';
import {
  type ITurmaFormOutput,
  type ITurmaFormSchema,
  useTurmaFormSchema,
} from './-Helpers/schema';
import SectionTurmasFormAvailability from '../Form/Availability/Availability.vue';

type Props = {
  editId?: string | null;
};

const { editId = null } = defineProps<Props>();

//

const $emit = defineEmits(['close']);
const onClose = () => $emit('close');
const isClassesOpen = ref(true);
const isAvailabilityOpen = ref(true);

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
      perform: async formData => {
        const data: TurmaCreateInput = {
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
      perform: async id => {
        await crudModule.deleteOne(id);
        return true;
      },
    },

    update: {
      perform: async (id, formData) => {
        const data: TurmaUpdateInput = {
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
  <form @submit.prevent="onSubmit" class="flex">
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
      v-show="isClassesOpen"
        :disabled="isBusy"
        :is-loading="isLoading"
      />

    </FormsCreateOrManageContextualForm>
    
      <SectionTurmasFormAvailability
      v-show="isAvailabilityOpen"
        :disabled="isBusy"
        :is-loading="isLoading"
      />
  </form>
</template>
