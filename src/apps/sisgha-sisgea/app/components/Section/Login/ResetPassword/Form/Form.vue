<script lang="ts" setup>
import { useMutation } from '@tanstack/vue-query';
import { useForm } from 'vee-validate';
import { autenticacaoRequestPasswordReset } from '@ladesa-ro/web.api.client';
import { resetPasswordSchema } from './-Helpers/schema';

const $emit = defineEmits(['close']);

const formInput = ref({ email: '' });

const { values, errors, handleSubmit } = useForm({
  validationSchema: resetPasswordSchema,
  initialValues: formInput.value,
});

const showAlert = ref(false);

//

const api = useApiClient();

const {
  isError,
  mutateAsync,
  data: canRecoverPassword,
} = useMutation({
  mutationFn: (email: string) =>
    api.call(autenticacaoRequestPasswordReset, {
      body: { email },
    }),
});

const onSubmit = handleSubmit(
  async formData => {
    try {
      await mutateAsync(formData.email);

      if (canRecoverPassword) {
        showAlert.value = true;
      }
    } catch {
      // erro tratado pelo useMutation (isError)
    }
  }
);
</script>

<template>
  <form @submit.prevent="onSubmit">
    <DialogModalBaseLayout
      :close-button="false"
      :on-close="() => $emit('close')"
      title="Redefinir Senha"
    >
      <VVTextField
        v-if="!showAlert"
        :disabled="showAlert"
        class="mt-1.5"
        label="E-mail"
        name="email"
        placeholder="Digite aqui seu email"
        type="email"
      />

      <UIAlert
        v-if="showAlert && !isError"
        type="info"
        message="Se o endereço de e-mail existir, você receberá as instruções para a redefinição de senha em sua caixa de entrada."
      />

      <UIAlert
        v-else-if="showAlert && isError"
        type="error"
        message="Ocorreu um erro ao tentar encontrar o e-mail."
      />

      <template #button-group>
        <UIButtonModalCancel
          v-if="!showAlert"
          type="button"
          @click="$emit('close')"
        />

        <UIButtonModalReset
          v-if="!showAlert"
          type="submit"
          :disabled="errors.email !== undefined || values.email === ''"
        />

        <UIButtonModalOk
          v-if="showAlert"
          class="px-10"
          type="button"
          @click="$emit('close')"
        />
      </template>
    </DialogModalBaseLayout>
  </form>
</template>
