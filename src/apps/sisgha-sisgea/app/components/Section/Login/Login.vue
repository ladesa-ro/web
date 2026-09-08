<script lang="ts" setup>
const { isBusy, isError, canSubmit, credentials, signInWithCredentials } =
  useAuthSignIn();

useTitle(null, 'Login');
</script>

<template>
  <div class="login">
    <form class="login-form" @submit.prevent="signInWithCredentials">
      <div class="light-1" />
      <div class="light-2" />

      <div class="login-card u-w-full">
        <LogoSISGHALogomarca class="logo" />

        <div class="fields">
          <SectionLoginTextField
            v-model="credentials.username"
            :disabled="isBusy"
            :input-props="{
              autocapitalize: 'none',
              autocorrect: 'off',
            }"
            class="field"
            placeholder="Matrícula"
            required
            type="text"
          />

          <SectionLoginTextField
            v-model="credentials.password"
            :disabled="isBusy"
            class="field"
            placeholder="Senha"
            required
            type="password"
          />
        </div>

        <span class="login-forgot-password u-mb-8 u-text-center">
          Esqueceu a senha?
          <LazySectionLoginResetPasswordModal :disabled="isBusy" />
        </span>

        <UIButtonDefault
          :disabled="!canSubmit"
          class="login-form-submit"
          type="submit"
        >
          Entrar
        </UIButtonDefault>

        <div
          v-if="isError"
          class="login-error u-flex u-gap-2 u-p-2 u-rounded-md u-text-sm u-mt-8"
        >
          <IconsWarning class="login-error-icon" />
          Não foi possível realizar o login.
        </div>
      </div>
    </form>

    <div class="login-alternative-actions">
      <NuxtLink
        class="login-alternative-link"
        tabindex="-1"
        to="/sisgha/consulta"
      >
        <UIButtonDefault
          :disabled="isBusy"
          class="login-alternative-button"
          type="button"
        >
          <template #start-icon>
            <IconsUser class="login-alternative-icon u-flex u-mr-4" />
          </template>

          <span class="login-alternative-content u-w-full u-h-full">
            <span class="u-ml-4" />
            <span>Entrar como aluno</span>
          </span>
        </UIButtonDefault>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.login {
  flex-shrink: 0;

  min-height: 100vh;
  min-height: 100dvh;
  overflow-x: hidden;

  background-repeat: no-repeat;

  background-image:
    url('@/assets/decorations/login-bloom-1.svg'),
    url('@/assets/decorations/login-bloom-2.svg');

  background-position:
    left top,
    right bottom;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding-bottom: 2rem;
}

.login-form {
  display: grid;
  grid-template-rows: 1rem 1fr 1rem;
  grid-template-columns: 1rem 1fr 1rem;
  justify-content: center;
  align-content: center;
  overflow: hidden;
  margin-bottom: 1rem;
}

@media (min-width: 40rem) {
  .login-form {
    grid-template-columns: 3.1875rem 1fr 3.25rem;
  }
}

.login-alternative-actions {
  padding-inline: 1rem;
  width: 100%;
  flex-shrink: 0;
}

.login-alternative-link {
  display: block;
  max-width: 21.25rem;
  margin-inline: auto;
}

.login-card {
  grid-row: 2 / 3;
  grid-column: 2 / 3;

  max-width: 21.25rem;

  background: var(--ladesa-background-color);
  box-shadow: 0px 0px 1px rgba(13, 92, 25, 0.25);
  border: 1px solid rgb(from var(--ladesa-grey-color) R G B / 45%);
  border-radius: 0.5625rem;

  margin-top: 2rem;
  margin-bottom: 1rem;
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

  background: var(--ladesa-grey-color);
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 1.75rem 0;
}

.field {
  max-width: 100%;
  min-width: 100%;
}

.login-forgot-password {
  display: block;
}

.login-error {
  background-color: rgb(from var(--ladesa-red-color) R G B / 10%);
  color: var(--ladesa-red-color);
  border: 1px solid rgb(from var(--ladesa-red-color) R G B / 10%);
}

.login-error-icon {
  width: 1.125rem;
}

.login-alternative-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.login-alternative-content {
  border-left: 2px solid currentColor;
}

.login-alternative-button {
  max-width: 100%;
  width: 100%;
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

  background-color: var(--ladesa-text-default-color);
}

.login-alternative-button .user-icon :deep(path) {
  fill: var(--ladesa-text-default-color);
}

.error-feedback {
  width: 16.9375rem;
  max-width: 100%;
  min-width: 100%;
}

@media screen and (max-width: 1070px) {
  .login {
    background-size: 18vmax;
  }
}
</style>
