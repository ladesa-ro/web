<script lang="ts" setup>
import type { CalendarioAgendamentoCreateInputDto } from '@ladesa-ro/web.api.client';
import { useForm } from 'vee-validate';
import {
  useAgendamentoFormSchema,
  type IAgendamentoFormOutput,
  type IParticipantesData,
} from './schema';

const props = withDefaults(defineProps<{
  editId?: string | null;
  initialData?: Partial<CalendarioAgendamentoCreateInputDto>;
  disabled?: boolean;
  bare?: boolean;
  showParticipants?: boolean;
  origemProfessor?: boolean;
}>(), { bare: false, showParticipants: false, origemProfessor: false });

const emit = defineEmits<{
  back: [];
  submit: [data: IAgendamentoFormOutput];
  delete: [];
}>();

const isEditMode = computed(() => !!props.editId);
const schema = useAgendamentoFormSchema();

function buildInitialValues(data?: Partial<CalendarioAgendamentoCreateInputDto>) {
  return {
    nome: data?.nome ?? '',
    cor: data?.cor ?? null,
    repeticao: data?.repeticao ?? null,
    diaInteiro: data?.diaInteiro ?? false,
    dataInicio: data?.dataInicio ?? '',
    dataFim: data?.dataFim ?? null,
    horarioInicio: data?.horarioInicio ?? '',
    horarioFim: data?.horarioFim ?? '',
    participantes: {
      todosParticipam: false,
      turmas: [],
      perfis: [],
      ofertasFormacao: [],
    } as IParticipantesData,
  };
}

const { handleSubmit, resetForm, validate, setValues, values } = useForm({
  validationSchema: schema,
  initialValues: buildInitialValues(props.initialData),
});

watch(
  () => props.initialData,
  newData => {
    if (newData) {
      resetForm({ values: buildInitialValues(newData) });
    }
  },
  { immediate: true }
);

const onSubmit = handleSubmit(formValues => {
  const isDiaInteiro = formValues.diaInteiro;
  const output: IAgendamentoFormOutput = {
    ...formValues,
    horarioInicio: isDiaInteiro ? '00:00:00' : formValues.horarioInicio,
    horarioFim: isDiaInteiro ? '23:59:59' : formValues.horarioFim,
  };
  emit('submit', output);
});

async function validateAndGetValues(): Promise<IAgendamentoFormOutput | null> {
  const { valid } = await validate();
  if (!valid) return null;
  const isDiaInteiro = values.diaInteiro;
  const output: IAgendamentoFormOutput = {
    ...values,
    horarioInicio: isDiaInteiro ? '00:00:00' : values.horarioInicio,
    horarioFim: isDiaInteiro ? '23:59:59' : values.horarioFim,
  };
  return output;
}

defineExpose({ validateAndGetValues, setValues, resetForm });
</script>

<template>
  <!-- Bare mode: just the form fields, no modal wrapper -->
  <div v-if="bare" class="flex flex-col gap-5">
    <SectionCalendarioFormSharedEventoFormFields
      :disabled="disabled"
      :show-participants="showParticipants"
      :origem-professor="origemProfessor"
    />
  </div>

  <!-- Modal mode: wrapped in dialog layout -->
  <DialogModalBaseLayout
    v-else
    :title="isEditMode ? 'Editar evento' : 'Cadastrar evento'"
    :close-button="false"
    :on-close="() => emit('back')"
    class="evento-form-modal"
  >
    <form class="flex flex-col gap-5" @submit.prevent="onSubmit">
      <SectionCalendarioFormSharedEventoFormFields
        :disabled="disabled"
        :show-participants="showParticipants"
        :origem-professor="origemProfessor"
      />
    </form>

    <template #button-group>
      <UIButtonModalGoBack class="flex-1" @click="emit('back')" />
      <UIButtonModalDelete v-if="isEditMode" class="flex-1" @click="emit('delete')" />
      <UIButtonModalEdit v-if="isEditMode" class="flex-1" @click="onSubmit" />
      <UIButtonModalSave v-else class="flex-1" @click="onSubmit" />
    </template>
  </DialogModalBaseLayout>
</template>

<style>
.evento-form-modal.modal-layout {
  max-width: 50rem;
}
</style>
