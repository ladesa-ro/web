<script lang="ts" setup>
import type { CalendarioAgendamentoCreateInputDto } from '@ladesa-ro/web.api.client';
import { useField, useForm } from 'vee-validate';
import {
  useAgendamentoFormSchema,
  type IAgendamentoFormOutput,
} from './schema';

export interface IParticipantesData {
  todosParticipam: boolean;
  turmas: Array<{ id: string }>;
  perfis: Array<{ id: string }>;
  ofertasFormacao: Array<{ id: string }>;
}

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
  submit: [data: IAgendamentoFormOutput & { participantes?: IParticipantesData }];
  delete: [];
}>();

const participantes = ref<IParticipantesData>({
  todosParticipam: false,
  turmas: [],
  perfis: [],
  ofertasFormacao: [],
});

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
  };
}

const { handleSubmit, resetForm, validate, setValues } = useForm({
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

const {
  value: nome,
  errorMessage: nomeError,
  handleBlur: nomeBlur,
} = useField<string>('nome');
const { value: cor } = useField<string | null>('cor');
const { value: repeticao } = useField<string | null>('repeticao');
const { value: diaInteiro } = useField<boolean>('diaInteiro');
const {
  value: dataInicio,
  errorMessage: dataInicioError,
  handleBlur: dataInicioBlur,
} = useField<string>('dataInicio');
const {
  value: dataFim,
  handleBlur: dataFimBlur,
} = useField<string | null>('dataFim');
const dataFimModel = computed({
  get: () => dataFim.value ?? '',
  set: (v: string) => {
    dataFim.value = v || null;
  },
});
const { value: horarioInicio } = useField<string | null>('horarioInicio');
const { value: horarioFim } = useField<string | null>('horarioFim');

const onSubmit = handleSubmit(values => {
  const isDiaInteiro = values.diaInteiro;
  const output: IAgendamentoFormOutput & { participantes?: IParticipantesData } = {
    ...values,
    horarioInicio: isDiaInteiro ? '00:00:00' : values.horarioInicio,
    horarioFim: isDiaInteiro ? '23:59:59' : values.horarioFim,
    ...(props.showParticipants ? { participantes: participantes.value } : {}),
  };
  emit('submit', output);
});

async function validateAndGetValues(): Promise<(IAgendamentoFormOutput & { participantes?: IParticipantesData }) | null> {
  const { valid } = await validate();
  if (!valid) return null;
  const isDiaInteiro = diaInteiro.value;
  const output: IAgendamentoFormOutput & { participantes?: IParticipantesData } = {
    nome: nome.value,
    cor: cor.value,
    repeticao: repeticao.value,
    diaInteiro: isDiaInteiro,
    dataInicio: dataInicio.value,
    dataFim: dataFim.value,
    horarioInicio: isDiaInteiro ? '00:00:00' : horarioInicio.value,
    horarioFim: isDiaInteiro ? '23:59:59' : horarioFim.value,
    ...(props.showParticipants ? { participantes: participantes.value } : {}),
  };
  return output;
}

const fieldProps = computed(() => ({
  disabled: props.disabled,
  showParticipants: props.showParticipants,
  origemProfessor: props.origemProfessor,
  nome: nome.value,
  nomeError: nomeError.value,
  cor: cor.value,
  repeticao: repeticao.value,
  diaInteiro: diaInteiro.value,
  dataInicio: dataInicio.value,
  dataInicioError: dataInicioError.value,
  dataFim: dataFimModel.value,
  horarioInicio: horarioInicio.value,
  horarioFim: horarioFim.value,
  participantes: participantes.value,
  'onUpdate:nome': (v: string) => { nome.value = v; },
  'onUpdate:cor': (v: string | null) => { cor.value = v; },
  'onUpdate:repeticao': (v: string | null) => { repeticao.value = v; },
  'onUpdate:diaInteiro': (v: boolean) => { diaInteiro.value = v; },
  'onUpdate:dataInicio': (v: string) => { dataInicio.value = v; },
  'onUpdate:dataFim': (v: string) => { dataFim.value = v || null; },
  'onUpdate:horarioInicio': (v: string | null) => { horarioInicio.value = v; },
  'onUpdate:horarioFim': (v: string | null) => { horarioFim.value = v; },
  'onUpdate:participantes': (v: IParticipantesData) => { participantes.value = v; },
  'onBlur:nome': () => nomeBlur(),
  'onBlur:dataInicio': () => dataInicioBlur(),
  'onBlur:dataFim': () => dataFimBlur(),
}));

defineExpose({ validateAndGetValues, setValues, resetForm });
</script>

<template>
  <!-- Bare mode: just the form fields, no modal wrapper -->
  <div v-if="bare" class="flex flex-col gap-5">
    <SectionCalendarioFormSharedEventoFormFields v-bind="fieldProps" />
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
      <SectionCalendarioFormSharedEventoFormFields v-bind="fieldProps" />
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
