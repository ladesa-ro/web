<script lang="ts" setup>
import type { TurmaEventoCreateInputDto } from '@ladesa-ro/web.api.client';
import { useField, useForm } from 'vee-validate';
import {
  useTurmaEventoFormSchema,
  type ITurmaEventoFormOutput,
} from './-Helpers/schema';

const props = defineProps<{
  editId?: string | null;
  initialData?: Partial<TurmaEventoCreateInputDto>;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  back: [];
  submit: [data: ITurmaEventoFormOutput];
  delete: [];
}>();

const isEditMode = computed(() => !!props.editId);
const schema = useTurmaEventoFormSchema();

function buildInitialValues(data?: Partial<TurmaEventoCreateInputDto>) {
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

const { handleSubmit, resetForm } = useForm({
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
  const output: Record<string, unknown> = { ...values };
  if (output.diaInteiro) {
    output.horarioInicio = '00:00:00';
    output.horarioFim = '23:59:59';
  }
  emit('submit', output as ITurmaEventoFormOutput);
});
</script>

<template>
  <DialogModalBaseLayout
    :title="isEditMode ? 'Editar evento' : 'Cadastrar evento'"
    :close-button="false"
    :on-close="() => emit('back')"
    class="evento-form-modal"
  >
    <form class="flex flex-col gap-5" @submit.prevent="onSubmit">
      <UIFormTextField
        v-model="nome"
        name="nome"
        label="Nome"
        :disabled="disabled"
        :error="nomeError"
        @blur="nomeBlur"
      />

      <div class="flex flex-col gap-1.5">
        <span class="text-[0.813rem] font-semibold text-ldsa-grey px-1"
          >Cor</span
        >
        <SectionTurmasFormEventosEventoColorPalette
          v-model="cor"
          :disabled="disabled"
        />
      </div>

      <SectionTurmasFormEventosEventoRRuleEditor
        v-model="repeticao"
        :disabled="disabled"
      />

      <label
        class="flex items-center gap-2.5 cursor-pointer"
        :class="{ 'opacity-60 cursor-not-allowed': disabled }"
      >
        <input
          v-model="diaInteiro"
          type="checkbox"
          class="size-4.5 accent-ldsa-green-1 cursor-pointer"
          :disabled="disabled"
        />
        <span class="text-sm font-medium text-ldsa-text-default select-none">
          Dura todo o dia
        </span>
      </label>

      <div class="flex gap-4">
        <div class="flex-1">
          <UIFormTextField
            v-model="dataInicio"
            name="dataInicio"
            label="Data inicial"
            type="date"
            :disabled="disabled"
            :error="dataInicioError"
            @blur="dataInicioBlur"
          />
        </div>
        <div class="flex-1">
          <UIFormTextField
            v-model="dataFimModel"
            name="dataFim"
            label="Data final"
            type="date"
            :disabled="disabled"
            @blur="dataFimBlur"
          />
        </div>
      </div>

      <div v-if="!diaInteiro" class="flex gap-4">
        <div class="flex-1">
          <UIFormTimeField
            v-model="horarioInicio"
            label="Horário inicial"
            :disabled="disabled"
          />
        </div>
        <div class="flex-1">
          <UIFormTimeField
            v-model="horarioFim"
            label="Horário final"
            :disabled="disabled"
          />
        </div>
      </div>
    </form>

    <template #button-group>
      <UIButtonModalGoBack class="flex-1" @click="emit('back')" />

      <UIButtonModalDelete
        v-if="isEditMode"
        class="flex-1"
        @click="emit('delete')"
      />

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
