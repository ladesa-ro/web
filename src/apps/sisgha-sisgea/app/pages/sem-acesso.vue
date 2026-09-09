<script lang="ts" setup>
definePageMeta({
  layout: 'empty',
  auth: true,
});

const { signOut } = useAuth();

const handleLogout = async () => {
  await signOut();
  navigateTo('/login');
};
</script>

<template>
  <div class="u-flex u-items-center u-justify-center u-px-4 sem-acesso">
    <div
      class="u-flex u-flex-col u-items-center u-gap-6 u-text-center sem-acesso__content"
    >
      <IconsInfo class="sem-acesso__icon" />

      <h1 class="u-font-bold sem-acesso__title">Sem acesso ao sistema</h1>

      <p class="u-text-sm sem-acesso__description">
        Você não possui perfil vinculado a nenhum campus. Entre em contato com o
        setor responsável do seu campus ou escola para solicitar acesso.
      </p>

      <button
        class="u-flex u-items-center u-gap-2 u-px-6 u-py-2-5 u-rounded-lg u-font-medium u-text-sm sem-acesso__logout-button"
        @click="handleLogout"
      >
        <IconsLogout class="sem-acesso__logout-icon" />
        Sair
      </button>
    </div>
  </div>
</template>

<style scoped>
.sem-acesso {
  min-height: 100vh;
  background-color: var(--ladesa-background-color);
}

.sem-acesso__content {
  max-width: 28rem;
}

.sem-acesso__icon {
  width: 4rem;
  height: 4rem;
  color: var(--ladesa-grey-color);
}

.sem-acesso__title {
  font-size: 1.5rem;
  color: var(--ladesa-text-default-color);
}

.sem-acesso__description {
  color: var(--ladesa-grey-color);
  line-height: 1.625;
}

.sem-acesso__logout-button {
  border: 2px solid var(--ladesa-grey-color);
  color: var(--ladesa-text-default-color);
  transition: background-color var(--ui-duration-base) var(--ui-easing-standard);
}

.sem-acesso__logout-button:hover {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 15%);
}

.sem-acesso__logout-icon {
  width: 1rem;
  height: 1rem;
}
</style>
