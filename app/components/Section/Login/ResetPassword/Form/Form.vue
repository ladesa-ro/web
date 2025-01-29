<script setup lang="ts">
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
  (formData) => {
    console.log('Formulário válido, pronto para enviar!', { formData });
    showAlert.value = true;
  },
  (errors) => {
    console.error('Erro de validação:', errors);
  }
);
</script>
<template>
  <form @submit.prevent="onSubmit">
    <DialogModalBaseLayout
      title="Redefinir Senha"
      :on-close="onClose"
      :close-button="false"
    >
      <VVTextField
        v-if="!showAlert"
        type="email"
        name="email"
        label="E-mail"
        :disabled="showAlert"
        placeholder="Digite aqui seu email"
        class="mt-1 min-w-96"
      />

      <v-alert
        v-if="showAlert"
        class="text-sm max-w-96"
        variant="flat"
        density="compact"
        type="info"
        text="Se o endereço de e-mail existir, você receberá as instruções para a redefinição de senha em sua caixa de entrada."
      />

      <template #button-group>
        <UIButtonModalCancelButton
          v-if="!showAlert"
          type="button"
          @click="$emit('close')"
        />

        <UIButtonModalOkButton
          v-if="showAlert"
          type="button"
          class="!px-10"
          @click="$emit('close')"
        />

        <UIButtonModalResetButton v-if="!showAlert" type="submit" />
      </template>
    </DialogModalBaseLayout>
  </form>
</template>
