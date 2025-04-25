<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';
</script>

<template>
  <v-container>
    <div class="container mx-auto max-w-[80%] p-10">
      <div class="container-header">
        <h1 class="main-title font-semibold">
          Início - Acesso Rápido
        </h1>
        <hr class="divider flex-grow" />
      </div>
      <div class="content">
        <div class="horario-academico">
          
        </div>
      </div>
    </div>
  </v-container>
</template>

<style scoped>
.main-title::before {
  content: "";
  border: 2px solid #1bba47;
  margin-right: 0.5rem;
}
</style>