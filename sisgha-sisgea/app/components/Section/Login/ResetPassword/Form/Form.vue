<script lang="ts" setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const $emit = defineEmits(['close']);
const onClose = () => $emit('close');

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Por favor, digite um e-mail válido!')
    .required('Email é obrigatório.'),
});

const formInput = reactive({
  email: '',
});

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: formInput,
});

const showAlert = ref(false);

const onSubmit = handleSubmit(
  formData => {
    console.log('Formulário válido, pronto para enviar!', { formData });
    showAlert.value = true;
  },
  errors => {
    console.error('Erro de validação:', errors);
  }
);
</script>
<template>
  <form @submit.prevent="onSubmit">
    <DialogModalBaseLayout
      :close-button="false"
      :on-close="onClose"
      title="Redefinir Senha"
    >
      <VVTextField
        v-if="!showAlert"
        :disabled="showAlert"
        class="mt-1 min-w-96"
        label="E-mail"
        name="email"
        placeholder="Digite aqui seu email"
        type="email"
      />

      <div
        v-if="showAlert"
        class="text-sm max-w-96 bg-blue-100 text-blue-800 px-4 py-2 rounded border border-blue-200"
      >
        Se o endereço de e-mail existir, você receberá as instruções para a
        redefinição de senha em sua caixa de entrada.
      </div>

      <template #button-group>
        <UIButtonModalCancel
          v-if="!showAlert"
          type="button"
          @click="$emit('close')"
        />

        <UIButtonModalOk
          v-if="showAlert"
          class="!px-10"
          type="button"
          @click="$emit('close')"
        />

        <UIButtonModalReset v-if="!showAlert" type="submit" />
      </template>
    </DialogModalBaseLayout>
  </form>
</template>
