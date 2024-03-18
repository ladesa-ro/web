<template>
  <search-bar class="search" :msge="msg"></search-bar>
  <ContainerDiscipline
    class="p1"
    :imagemSrc="caminhoDaImagem"
    :mensagem="mensagemDoPai"
    :abreviacao="abre"
    :nivel="niv"  
  />

  <ContainerDiscipline
    class="p2"
    :imagemSrc="caminhoDaImagem2"
    :mensagem="mensagemDoPai2"
    :abreviacao="abre2"
    :nivel="niv2"
  />

  <ContainerDiscipline
    class="p3"
    :imagemSrc="caminhoDaImagem3"
    :mensagem="mensagemDoPai3"
    :abreviacao="abre3"
    :nivel="niv3"
  />
  <SavedModal v-show="showModal" />

  <div class="save-btn">
    <button @click="showModal = true">
      <adicionar/>
    </button>
  </div>
</template>

<script>
import caminhoDaImagem from "~/assets/Foto.png";
import SavedModal from "~/components/Modais/SavedModal.vue";
import SearchBar from "~/components/SearchBar.vue";
import adicionar from "~/componentes/adicionar.vue";
import ButtonAdd from "~/components/UI/ButtonAdd/ButtonAdd.vue";
import ContainerDiscipline from "~/components/Containers/ContainerDiscipline.vue";
export default {
  components: {
    ContainerDiscipline,
    SearchBar,
    adicionar,
    SavedModal,
    ButtonAdd
  },
  data() {
    return {
      caminhoDaImagem: caminhoDaImagem,
      mensagemDoPai: "Linguagem e Lógica de Programação", // Defina o valor da prop aqui
      abre: "Abreviação: L. L. Prog.",
      niv: "Modalidade: Técnico Integrado",

      caminhoDaImagem2:
        "https://tse1.mm.bing.net/th?id=OIP.lKoTmKPpWT-qSlTLmlIwwgHaEK&pid=Api&P=0&h=180",
      mensagemDoPai2: "Matemática", // Defina o valor da prop aqui
      abre2: "Abreviação: Mat.",
      niv2: "Modalidade: Técnico Integrado",

      caminhoDaImagem3:
        "https://tse4.mm.bing.net/th?id=OIP.-eVHxNSXqiqHdFy8tlPlJAHaFj&pid=Api&P=0&h=180",
      mensagemDoPai3: "Português", // Defina o valor da prop aqui
      abre3: "Abreviação: Port.",
      niv3: "Modalidade: Técnico Integrado",

      msg: "Digite aqui.",
      showModal: false,
    };
  },
};
</script>

<style>
.t {
  box-sizing: border-box;
  position: absolute;
}

.p1 {
  position: absolute;
  margin-left: 150px;
  margin-top: 40px;
}

.p2 {
  position: absolute;
  margin-top: 300px;
  margin-left: 150px;
}

.p3 {
  position: absolute;
  margin-left: 660px;
  display: block;
  margin-top: 40px;
}
</style>
