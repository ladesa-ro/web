<template>
  <div>
    <!-- <div class="d-flex justify-center mt-5 welcomeMessage text-center mx-3">
    Olá, pequeno gafanhoto.
  </div>
  <p class="d-flex justify-center text-center mx-5">
    Seja bem vindo ao desenvolvimento do SISGHA, espero que tenha estudado o
    suficiente.
  </p> -->
<LayoutDape/>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from '~/components/Sidebar/Sidebar.vue';
</script>

<style>
.welcomeMessage {
  font-family: "Poppins", sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #4f4f4f;
}
</style>
