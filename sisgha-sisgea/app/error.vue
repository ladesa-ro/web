<script lang="ts" setup>
const error = useError();
</script>

<template>
  <NuxtLayout>
    <template v-if="error?.statusCode === 404">
      <v-empty-state
        class="min-h-min flex-1"
        headline="Oops! 404"
        icon="mdi-alert-circle-outline"
        text="A página que você está procurando não existe."
        title="Página não encontrada"
      />
    </template>

    <template v-else>
      <v-empty-state
        class="min-h-min flex-1"
        headline="Oops!"
        icon="mdi-alert-circle-outline"
        title="Houve um comportamento não esperado em nossa aplicação."
      >
        <div class="text-center">
          <p>Pedimos desculpas por este inconveniente.</p>
          <p>Mensagem do erro: {{ error?.message ?? '-' }}</p>
        </div>
      </v-empty-state>
    </template>
  </NuxtLayout>
</template>
