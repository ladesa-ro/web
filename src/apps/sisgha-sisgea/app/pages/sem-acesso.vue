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
  <div class="flex min-h-screen items-center justify-center bg-ldsa-bg px-4">
    <div class="flex flex-col items-center gap-6 text-center max-w-md">
      <IconsInfo class="w-16 h-16 text-ldsa-grey" />

      <h1 class="text-2xl font-bold text-ldsa-text-default">
        Sem acesso ao sistema
      </h1>

      <p class="text-sm text-ldsa-grey leading-relaxed">
        Você não possui perfil vinculado a nenhum campus.
        Entre em contato com o setor responsável do seu campus ou escola para solicitar acesso.
      </p>

      <button
        class="flex items-center gap-2 px-6 py-2.5 rounded-lg border-2 border-ldsa-grey text-ldsa-text-default font-medium text-sm hover:bg-ldsa-grey/15 transition-colors"
        @click="handleLogout"
      >
        <IconsLogout class="w-4 h-4" />
        Sair
      </button>
    </div>
  </div>
</template>
