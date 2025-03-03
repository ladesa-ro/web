<script lang="ts" setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';

type Props = {
  editId?: string | null;
};

const props = withDefaults(defineProps<Props>(), {
  editId: null,
});

const editIdRef = toRef(props, 'editId');

const $emit = defineEmits(['close']);

type FormValues = {
  horaInicio: number;
  minutoInicio: number;
  horaTermino: number;
  minutoTermino: number;
};

type FormOutput = {
  horaInicio: number;
  minutoInicio: number;
  horaTermino: number;
  minutoTermino: number;
};

const initialFormValues = reactive({
  horaInicio: undefined,
  minutoInicio: undefined,
  horaTermino: undefined,
  minutoTermino: undefined,
});

const handleDelete = () => {
  const id = editIdRef.value;

  if (!id) return;

  const resposta = window.confirm(
    'Você tem certeza de que deseja deletar este intervalo?'
  );

  if (resposta) {
    console.log("Intervalo deletado:", { id });
    $emit('close');
  }
};

const schema = yup.object().shape({
  horaInicio: yup.string().required('A hora de início é obrigatória!'),
  minutoInicio: yup.string().required('O minuto de início é obrigatório!'),
  horaTermino: yup.string().required('A hora de término é obrigatória!'),
  minutoTermino: yup.string().required('O minuto de término é obrigatório!'),
});

const {
  resetForm,
  handleSubmit,
  setFieldValue,
  values: formValues,
} = useForm<FormValues, FormOutput>({
  validationSchema: schema,
  initialValues: initialFormValues,
});

const onSubmit = handleSubmit((values) => {
  const editId = editIdRef.value;

  const { ...data } = values;

  let id;

  if (editId === null) {
    id = Date.now(); // Gerando um ID fictício
    console.log("Intervalo criado:", { id, ...data });
  } else {
    console.log("Intervalo atualizado:", { id: editId, ...data });
    id = editId;
  }

  console.log("Lista de intervalos atualizada");

  resetForm();
  $emit('close');
}, console.error);

const horaInicio = computed({
  get: () => formValues.horaInicio,
  set: (value) => setFieldValue('horaInicio', Number(value)),
});

const minutoInicio = computed({
  get: () => formValues.minutoInicio,
  set: (value) => setFieldValue('minutoInicio', Number(value)),
});

const horaTermino = computed({
  get: () => formValues.horaTermino,
  set: (value) => setFieldValue('horaTermino', Number(value)),
});

const minutoTermino = computed({
  get: () => formValues.minutoTermino,
  set: (value) => setFieldValue('minutoTermino', Number(value)),
});


function onClose() {
  $emit('close');
}

</script>

<template>
  <DialogModalBaseLayout :on-close="onClose" :title="editId ? 'Editar Intervalo' : 'Cadastrar Intervalo'">
    <div class="flex items-center mr-3">
      <span class="font-semibold mr-2">Início</span>
      <hr class="divider flex-grow" />
    </div>

    <div class="form-body modal-form">
      <VVTextField
        v-model="horaInicio"
        class="number-input mb-2"
        label="Hora inicial"
        name="nome"
        type="number"
      />
      <VVTextField
        v-model="minutoInicio"
        class="number-input mb-2"
        label="Minuto inicial"
        name="nome"
        type="number"
      />

      <div class="flex items-center mr-3 mt-5 mb-5">
        <span class="font-semibold mr-2">Término</span>
        <hr class="divider flex-grow" />
      </div>

      <VVTextField
        v-model="horaTermino"
        class="number-input mb-2"
        label="Hora de término"
        name="nome"
        type="number"
      />
      <VVTextField
        v-model="minutoTermino"
        class="number-input mb-2"
        label="Minuto de término"
        name="nome"
        type="number"
      />
    </div>

    <template #button-group>
        <UIButtonModalCancelButton @click="$emit('close')" />

        <UIButtonModalDeleteButton
          v-if="editId"
          @click.prevent="handleDelete"
        />
        <UIButtonModalEditButton v-if="editId" />
        <UIButtonModalSaveButton v-else />
      </template>
  </DialogModalBaseLayout>
</template>
