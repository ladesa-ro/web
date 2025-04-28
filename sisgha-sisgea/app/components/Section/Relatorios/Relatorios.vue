<script>
import { ref } from 'vue';

const professores = ['Danilo Pereira Escudero', 'Guilherme Ferreira', 'Lucas Silva'];
const semestres = ['2024.1', '2024.2', '2023.1', '2023.2', '2022.1', '2022.2'];

</script>

<template>
  <div class="container mx-auto px-4">
    <div class="mx-auto max-w-[50%] p-10">
      <div class="container-header">
        <h1 class="main-title font-semibold pb-5 text-[20px]">
          Relatório de Aulas Ministradas
        </h1>
      </div>
      <div class="w-full">
        <!-- select professor -->
        <div class="flex flex-col xl:flex-row w-full justify-between items-center m-auto mb-6">
          <!-- professor -->
          <VVAutocomplete
            :items="professores"
            class="xl:max-w-[22rem]"
            label="Professor"
            name="professor.id"
            placeholder="Selecione um professor"/>

          <!-- semestre -->
          <VVAutocomplete
            :items="semestres"
            class="xl:max-w-[10rem]"
            label="Semestre"
            name="semestre.id"
            placeholder="Selecione um semestre"/>
        </div>

        <!-- divisoria -->
         <div class="divisor relative">
          <div class="filters relative w-25 bg-ldsa-bg mx-[1.2rem] my-0 p-[0.4rem] text-[0.6rem] font-bold text-ldsa-grey z-2">Filtros Opcionais</div>
         </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.main-title::before {
  content: "";
  border: 2px solid var(--ladesa-green-1-color);
  margin-right: 0.5rem;
}

.divisor:before {
    position: absolute;
    top: 50%;
    content: "";
    display: block;
    width: 100%;
    border-bottom: 0.07rem solid var(--ladesa-grey-color);
    z-index: 1;
}
</style>