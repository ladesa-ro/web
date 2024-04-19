<script setup>
import iagex from "~/assets/kilo.png";
import SearchBar from "~/components/SearchBar.vue";
import ContainerClass from "~/components/Containers/ContainerClass.vue";

const caminhoDaImagem1 = "https://tse4.mm.bing.net/th?id=OIP.-eVHxNSXqiqHdFy8tlPlJAHaFj&pid=Api&P=0&h=180";
const mensagemDoPai1 = "2°Ano A - Química"; 
const abre1 = "Curso: Téc.Quim.";
const niv1 = "Turnos: Matutino e vespertino";

const caminhoDaImagem2 = "https://tse4.mm.bing.net/th?id=OIP.-eVHxNSXqiqHdFy8tlPlJAHaFj&pid=Api&P=0&h=180";
const mensagemDoPai2 = "2°Ano B - Floresta"; 
const abre2 = "Curso: Téc.Flor.";
const niv2 = "Turnos: Matutino e vespertino";

const caminhoDaImagem3 = iagex;
const mensagemDoPai3 = "2°Ano A - Informática";
const abre3 = "Curso: Téc.Info.";
const niv3 = "Turnos: Maatutino e Vespertino";
</script>

<template class="t">
  <search-bar class="place" :msge="msg"></search-bar>
  <UIButtonAdd v-bind="activatorProps" />

  <ContainerClass
    class="dis2"
    :imgSr="caminhoDaImagem2"
    :sala="mensagemDoPai2"
    :curso="abre2"
    :turno="niv2"
  />
  <ContainerClass
    class="dis3"
    :imgSr="caminhoDaImagem1"
    :sala="mensagemDoPai1"
    :curso="abre1"
    :turno="niv1"
  />
  <ContainerClass
    class="dis"
    :imgSr="caminhoDaImagem3"
    :sala="mensagemDoPai3"
    :curso="abre3"
    :turno="niv3"
  />
</template>

<style>
.t {
  box-sizing: border-box;
  position: absolute;
}

.dis {
  position: absolute;
  margin-left: 150px;
  margin-top: 20px;
}

.dis2 {
  position: absolute;
  margin-top: 160px;
  margin-left: 150px;
}

.dis3 {
  position: absolute;
  margin-left: 661px;
  display: block;
  margin-top: 20px;
}
</style>
