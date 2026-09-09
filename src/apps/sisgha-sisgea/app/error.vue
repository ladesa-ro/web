<script lang="ts" setup>
const error = useError();
</script>

<template>
  <NuxtLayout>
    <template v-if="error?.statusCode === 404">
      <div
        class="u-flex u-flex-col u-items-center u-justify-center u-text-center u-p-8 error-page error-page--404"
      >
        <h1 class="u-font-medium error-page__title">Oops! 404</h1>
        <h2 class="error-page__subtitle">Página não encontrada</h2>
        <p class="error-page__description">
          A página que você está procurando não existe.
        </p>
      </div>
    </template>

    <template v-else>
      <div
        class="u-flex u-flex-col u-items-center u-justify-center u-text-center u-p-8 error-page"
      >
        <h1 class="u-font-medium error-page__title">Oops!</h1>
        <p class="error-page__subtitle error-page__subtitle--spaced">
          Houve um comportamento não esperado em nossa aplicação.
        </p>
        <div class="u-text-center">
          <p>Pedimos desculpas por este inconveniente.</p>
          <p>Mensagem do erro: {{ error?.message ?? '-' }}</p>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<style scoped>
.error-page {
  min-height: min-content;
  flex: 1 1 0%;
}

.error-page--404 {
  margin-top: var(--ui-space-10);
}

.error-page__title {
  font-size: 34px;
  margin-bottom: var(--ui-space-2);
  color: var(--ladesa-grey-color);
}

.error-page__subtitle {
  font-size: 20px;
}

.error-page__subtitle--spaced {
  margin-bottom: var(--ui-space-2);
}

.error-page__description {
  font-size: 14px;
  margin-top: var(--ui-space-2);
}
</style>
