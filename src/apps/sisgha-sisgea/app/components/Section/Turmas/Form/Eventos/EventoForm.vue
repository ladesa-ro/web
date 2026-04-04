<script lang="ts" setup>
import { useForm, useField } from 'vee-validate';
import type { TurmaEventoCreateInputDto } from '@ladesa-ro/web.api.client';
import { useTurmaEventoFormSchema, type ITurmaEventoFormOutput } from './-Helpers/schema';

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

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    nome: props.initialData?.nome ?? '',
    cor: props.initialData?.cor ?? null,
    repeticao: props.initialData?.repeticao ?? null,
    diaInteiro: props.initialData?.diaInteiro ?? false,
    dataInicio: props.initialData?.dataInicio ?? '',
    dataFim: props.initialData?.dataFim ?? null,
    horarioInicio: props.initialData?.horarioInicio ?? '',
    horarioFim: props.initialData?.horarioFim ?? '',
  },
});

const { value: diaInteiro } = useField<boolean>('diaInteiro');
const { value: corValue } = useField<string | null>('cor');
const { value: repeticaoValue } = useField<string | null>('repeticao');

const onSubmit = handleSubmit((values) => {
  emit('submit', values as ITurmaEventoFormOutput);
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
      <VVTextField
        name="nome"
        label="Nome"
        :disabled="disabled"
      />

      <div class="flex flex-col gap-1.5">
        <span class="text-[0.813rem] font-semibold text-ldsa-grey px-1">Cor</span>
        <SectionTurmasFormEventosEventoColorPalette
          v-model="corValue"
          :disabled="disabled"
        />
      </div>

      <SectionTurmasFormEventosEventoRRuleEditor
        v-model="repeticaoValue"
        :disabled="disabled"
      />

      <VVCheckboxField
        name="diaInteiro"
        label="Dura todo o dia"
        :disabled="disabled"
      />

      <div class="flex gap-4">
        <VVTextField
          name="dataInicio"
          label="Data inicial"
          type="date"
          class="flex-1"
          :disabled="disabled"
        />
        <VVTextField
          name="dataFim"
          label="Data final"
          type="date"
          class="flex-1"
          :disabled="disabled"
        />
      </div>

      <div v-if="!diaInteiro" class="flex gap-4">
        <VVTimeField
          name="horarioInicio"
          label="Horário inicial"
          class="flex-1"
          :disabled="disabled"
        />
        <VVTimeField
          name="horarioFim"
          label="Horário final"
          class="flex-1"
          :disabled="disabled"
        />
      </div>
    </form>

    <template #button-group>
      <UIButtonModalGoBack
        class="flex-1"
        @click="emit('back')"
      />

      <UIButtonModalDelete
        v-if="isEditMode"
        class="flex-1"
        @click="emit('delete')"
      />

      <UIButtonModalEdit
        v-if="isEditMode"
        class="flex-1"
        @click="onSubmit"
      />

      <UIButtonModalSave
        v-else
        class="flex-1"
        @click="onSubmit"
      />
    </template>
  </DialogModalBaseLayout>
</template>

<style>
.evento-form-modal.modal-layout {
  max-width: 50rem;
}
</style>
