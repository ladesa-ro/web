<script setup lang="ts">
const apiClient = useApiClient();

const response = await apiClient.usuarios.usuarioList();

const usuarios = response.data;
</script>

<template>
  <v-container>
    <section class="m-0 p-0">
      <div class="flex flex-wrap gap-[36.59px]">
        <SectionUsuariosGridItem
          v-for="usuario in usuarios"
          :key="usuario.id"
          :usuario="usuario"
        />
      </div>
    </section>
  </v-container>
</template>

<style>
.nomesP {
  color: #000;
  font-size: 0.85rem;
  font-weight: 700;
}

.cargo {
  font-weight: 500;
  color: #9ab69e;
  font-size: 14px;
}

.bg {
  grid-template-rows: 65% auto;
}

.detail {
  cursor: pointer;
  z-index: 1000;
  margin-right: 10px;
}
</style>
