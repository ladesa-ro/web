<script setup lang="ts">
const {
  //
  isBusy,
  isError,
  canSubmit,
  credentials,
  signInWithCredentials,
} = useAuthSignIn();

useTitle(null, 'Login');
</script>

<template>
  <div class="login">
    <form @submit.prevent="signInWithCredentials" class="login-form">
      <div class="light-1"></div>
      <div class="light-2"></div>

      <div class="login-card">
        <LogoSisghaLogomarca class="logo" />

        <div class="fields">
          <UITextField
            required
            class="field"
            type="text"
            placeholder="Matrícula"
            :disabled="isBusy"
            v-model="credentials.username"
            :input-props="{
              autocapitalize: 'none',
              autocorrect: 'off',
            }"
          />

          <UITextField
            required
            class="field"
            type="password"
            placeholder="Senha"
            :disabled="isBusy"
            v-model="credentials.password"
          />
        </div>

        <span class="block mb-8 text-center">
          Esqueceu a senha?

          <SectionLoginResetPasswordModal />
        </span>

        <UIButton
          class="login-form-submit"
          type="submit"
          :disabled="!canSubmit"
        >
          Entrar
        </UIButton>

        <div v-if="isError">
          <VDivider class="my-4"></VDivider>

          <VAlert
            class="error-feedback"
            v-model="isError"
            closable
            text="Não foi possível realizar o login."
            type="error"
          >
          </VAlert>
        </div>
      </div>
    </form>

    <div>
      <NuxtLink tabindex="-1" class="login-alternative-link" to="/aluno">
        <UIButton
          :disabled="isBusy"
          type="button"
          class="login-alternative-button"
        >
          <template #start-icon>
            <IconsIconUser class="flex w-6 h-6 mr-4" />
          </template>

          <p class="border-l-2 w-full h-full border-solid border-white">
            Entrar como Aluno
          </p>
        </UIButton>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.login {
  background-image: url('@/assets/decorations/login-bloom-1.svg'),
    url('@/assets/decorations/login-bloom-2.svg');

  background-position:
    left top,
    right bottom;

  min-height: 100dvh;

  overflow-x: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;

  padding-bottom: 3rem;
}

@media screen and (max-width: 1070px) {
  .login {
    background-size: 18vmax;
  }
}

.login-form {
  display: grid;

  grid-template-rows: minmax(0, 3.0625rem) auto minmax(0, 2.8125rem);
  grid-template-columns: minmax(1rem, 3.1875rem) auto minmax(1rem, 3.25rem);

  justify-content: center;
  align-content: center;
}

.login-card {
  grid-row: 2 / 3;
  grid-column: 2 / 3;

  background: rgb(var(--sisgha-theme-surface));
  box-shadow: 0px 0px 1px rgba(13, 92, 25, 0.25);

  border: 1px solid #d6d6d6;
  border-radius: 0.5625rem;

  margin: 1rem 0;

  padding: 2rem;
}

.light-1,
.light-2 {
  background-image: url('@/assets/decorations/login-light.svg');

  width: 19.375rem;
  height: 19.375rem;
}

.light-1 {
  grid-column: 2 / 4;
  grid-row: 1 / 3;
  justify-self: end;
}

.light-2 {
  grid-column: 1 / 3;
  grid-row: 3 / 4;
  align-self: end;
}

.login-form-submit {
  width: 100%;
}

.logo {
  max-width: 10.8125rem;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
}

.logo::after {
  content: '';

  display: block;

  margin: 1.375rem auto 0;

  width: 6.4375rem;
  height: 0.125rem;

  background: rgb(var(--sisgha-theme-divider));
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 1.75rem 0;
}

.field {
  width: 16.9375rem;
  max-width: 100%;
  min-width: 100%;
}

.login-alternative-link {
  display: block;
}

.login-alternative-button {
  max-width: 100%;
  width: 21.3125rem;

  box-shadow: 0 0 0 3px rgb(var(--sisgha-theme-primary-text), 0.5);
}

.login-alternative-button .user-icon {
  display: flex;

  align-items: center;
}

.login-alternative-button .user-icon::after {
  content: '';

  display: block;

  margin: 0 1rem;

  width: 0.125rem;
  height: 2rem;

  background-color: rgb(var(--sisgha-theme-primary-text));
}

.login-alternative-button .user-icon :deep(path) {
  fill: rgb(var(--sisgha-theme-primary-text));
}

.error-feedback {
  width: 16.9375rem;
  max-width: 100%;
  min-width: 100%;
}
</style>
