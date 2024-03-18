<template class="t">
  <search-bar class="place" :msge="msg"></search-bar>

  <adicionar />
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

<script>
import iagex from "~/assets/kilo.png";
import SearchBar from "~/components/SearchBar.vue";
import adicionar from "~/componentes/adicionar.vue";
import ContainerClass from "~/components/Containers/ContainerClass.vue";
export default {
  components: {
    adicionar,
    SearchBar,
    ContainerClass,
  },
  data() {
    return {
      msg: "Procure uma turma...",

      caminhoDaImagem3: iagex,
      mensagemDoPai3: "2°Ano A - Informática", // Defina o valor da prop aqui
      abre3: "Curso: Téc.Info.",
      niv3: "Turnos: Maatutino e Vespertino",

      caminhoDaImagem2:
        "https://tse4.mm.bing.net/th?id=OIP.-eVHxNSXqiqHdFy8tlPlJAHaFj&pid=Api&P=0&h=180",
      mensagemDoPai2: "2°Ano B - Floresta", // Defina o valor da prop aqui
      abre2: "Curso: Téc.Flor.",
      niv2: "Turnos: Matutino e vespertino",

      caminhoDaImagem1:
        "https://tse4.mm.bing.net/th?id=OIP.-eVHxNSXqiqHdFy8tlPlJAHaFj&pid=Api&P=0&h=180",
      mensagemDoPai1: "2°Ano A - Química", // Defina o valor da prop aqui
      abre1: "Curso: Téc.Quim.",
      niv1: "Turnos: Matutino e vespertino",
    };
  },
};
</script>

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
