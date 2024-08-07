<script lang="ts" setup>
const props = defineProps({
  searchBarText: String,
});

const { searchBarText } = toRefs(props);

// Listing filter
const orderBy: Array<string> = ['Mês', 'Eventos', 'Bimestre', 'Semestre'];
const orderType: Array<string> = ['Crescente', 'Decrescente'];
</script>

<template>
  <v-form class="-form">
    <div>
      <!-- Title -->
      <h1 class="main-title">Todos os eventos</h1>

      <v-divider class="my-4" />

      <!-- Filter content -->
      <div class="modal-form">
        <!-- Search event -->
        <UISearchBar
          :value="searchBarText"
          @update:value="searchBarText = $event"
        />

        <!-- Order list -->
        <div class="flex flex-row gap-4">
          <VVAutocomplete
            name="orderBy.id"
            label="Ordenar por"
            placeholder="Selecione uma opção"
            :items="orderBy"
            class="w-full"
          />
          <VVAutocomplete
            name="orderType.id"
            label="Ordem"
            placeholder="Selecione uma ordem"
            :items="orderType"
            class="w-full"
          />
        </div>
      </div>

      <v-divider class="my-4" />

      <!-- Content -->
      <div>
        <SectionCalendarioEventsAccordion />
      </div>
    </div>
  </v-form>
</template>

<style scoped>
.-form {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 32px;
  overflow: auto;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.main-title {
  font-size: 24px;
  font-weight: 700;
}

.button-group {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  margin-top: 20px;
  gap: 20px;
}

.button {
  font-weight: 700;
  margin-top: 20px;
  cursor: pointer;
  border: none;
}

.v-btn.buttonCancelar,
.v-btn.buttonCadastro {
  padding: 6px 20px;
  border-radius: 8px;
  height: auto;
  text-transform: none;
}

@media screen and (max-width: 450px) {
  .button-group {
    flex-direction: column;
    gap: 10px;
  }

  .v-btn.buttonCancelar,
  .v-btn.buttonCadastro {
    padding: 6px 20px;
  }
}
</style>
