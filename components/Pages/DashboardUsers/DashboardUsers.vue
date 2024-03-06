<script setup lang="ts">
import { ref } from "vue";
import IconAdd from "~/components/Icons/IconAdd.vue";

const show = ref(false);

const openConfirm = () => {
  show.value = true;
  console.log("clicou no iconeadd");
};

const closeConfirm = () => {
  show.value = false;
  console.log("Cheghoy aqi");
};

const testeConsole = () => {
  console.log("clicou");
};
</script>

<template>
  <div>
    <div>
      <SearchBar value="Pesquisar" />
    </div>

    <div>
      <IconAdd @click="openConfirm" />
      <PagesDashboardUsersModalNewUser v-if="show" @close="closeConfirm" />
    </div>

    <div>
      <PagesDashboardUsersUsersList />
    </div>
  </div>
</template>
