<script lang="ts" setup>
const error = useError();
</script>

<template>
  <NuxtLayout>
    <template v-if="error?.statusCode === 404">
       <div class="min-h-min flex-1 flex flex-col items-center justify-center text-center p-8 mt-10">
        <span class="mdi mdi-alert-circle-outline text-6xl text-red-500 mb-4"></span>
        <h1 class="text-[34px] font-medium text-ldsa-grey mb-2">Oops! 404</h1>
        <h2 class="text-[20px]">Página não encontrada</h2>
        <p class="text-[14px] mt-2">A página que você está procurando não existe.</p>
      </div>
    </template>

    <template v-else>
      <div class="min-h-min flex-1 flex flex-col items-center justify-center text-center p-8">
        <span class="mdi mdi-alert-circle-outline text-6xl mb-4"></span>
        <h1 class="text-[34px] font-medium text-ldsa-grey mb-2">Oops!</h1>
        <p class="text-[20px] mb-2">Houve um comportamento não esperado em nossa aplicação.</p>
        <div class="text-center">
          <p>Pedimos desculpas por este inconveniente.</p>
          <p>Mensagem do erro: {{ error?.message ?? '-' }}</p>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>
