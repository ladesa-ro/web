<script setup lang="ts">
const { isBusy, isError, canSubmit, credentials, signInWithCredentials } =
  useAuthSignIn();

useTitle(null, 'Login');
</script>

<template>
  <div class="login">
    <form class="login-form" @submit.prevent="signInWithCredentials">
      <div class="light-1" />
      <div class="light-2" />

      <div class="login-card w-full">
        <LogoSisghaLogomarca class="logo" />

        <div class="fields">
          <UITextField
            v-model="credentials.username"
            required
            type="text"
            class="field"
            :disabled="isBusy"
            placeholder="Matrícula"
            :input-props="{
              autocapitalize: 'none',
              autocorrect: 'off',
            }"
          />

          <UITextField
            v-model="credentials.password"
            required
            class="field"
            type="password"
            :disabled="isBusy"
            placeholder="Senha"
          />
        </div>

        <span class="block mb-8 text-center">
          Esqueceu a senha?
          <LazySectionLoginResetPasswordModal />
        </span>

        <UIButton
          type="submit"
          :disabled="!canSubmit"
          class="login-form-submit"
        >
          Entrar
        </UIButton>

        <div v-if="isError">
          <VDivider class="my-4" />

          <VAlert
            v-model="isError"
            closable
            type="error"
            class="error-feedback"
            text="Não foi possível realizar o login."
          />
        </div>
      </div>
    </form>

    <div class="login-alternative-actions">
      <NuxtLink
        tabindex="-1"
        class="login-alternative-link"
        to="/sisgha/consulta"
      >
        <UIButton
          type="button"
          :disabled="isBusy"
          class="login-alternative-button"
        >
          <template #start-icon>
            <IconsIconUser class="flex w-6 h-6 mr-4" />
          </template>

          <p class="w-full h-full border-l-2">
            <span class="ml-4" />
            <span>Entrar como aluno</span>
          </p>
        </UIButton>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.login {
  flex-shrink: 0;

  min-height: 100vh;
  min-height: 100dvh;
  overflow-x: hidden;

  background-repeat: no-repeat;

  background-image: url('@/assets/decorations/login-bloom-1.svg'),
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

  @apply grid-rows-[1rem_1fr_1rem] sm:grid-cols-[3.0625rem_1fr_2.8125rem];
  @apply grid-cols-[1rem_1fr_1rem] sm:grid-cols-[3.1875rem_1fr_3.25rem];

  justify-content: center;
  align-content: center;

  overflow: hidden;

  @apply mb-4;
}

.login-card {
  @apply max-w-[21.25rem];
}

.login-alternative-actions {
  @apply px-4;
  @apply w-full shrink-0;
}

.login-alternative-link {
  @apply max-w-[21.25rem] mx-auto;
}

.login-card {
  grid-row: 2 / 3;
  grid-column: 2 / 3;

  background: var(--ladesa-background-color);
  box-shadow: 0px 0px 1px rgba(13, 92, 25, 0.25);
  @apply border border-ldsa-grey/45 rounded-[0.5625rem];

  @apply mt-8 mb-4;
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

  background: var(--ladesa-border-color);
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

.login-alternative-link {
  display: block;
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
