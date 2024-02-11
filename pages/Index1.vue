
<template>
  <search-bar class="search" :msge="msg"></search-bar>
  <bloco class="p1" :imagemSrc="caminhoDaImagem" :mensagem="mensagemDoPai" :abreviacao="abre" :nivel="niv" />

  <bloco  class="p2" :imagemSrc="caminhoDaImagem2" :mensagem="mensagemDoPai2" :abreviacao="abre2" :nivel="niv2" />


  <bloco class="p3" :imagemSrc="caminhoDaImagem3" :mensagem="mensagemDoPai3" :abreviacao="abre3" :nivel="niv3" />
  <SavedModal v-show="showModal"/>

  <div class="save-btn">
    <button @click="showModal = true"><adicionar/></button>
  </div>

</template>
<script>
import bloco from '~/componentes/bloco.vue'
import adicionar from '~/componentes/adicionar.vue'
import caminhoDaImagem from '~/assets/Foto.png'
import SearchBar from "~/componentes/SearchBar.vue"
import SavedModal from '~/componentes/SavedModal.vue'
export default {
  components: {
    bloco,
    SearchBar,
    adicionar,
    SavedModal,
  },
  data() {
    return {
      caminhoDaImagem: caminhoDaImagem,
      mensagemDoPai: "Linguagem e Lógica de Programação", // Defina o valor da prop aqui
      abre: "Abreviação: L. L. Prog.",
      niv: "Modalidade: Técnico Integrado",

      caminhoDaImagem2: "https://tse1.mm.bing.net/th?id=OIP.lKoTmKPpWT-qSlTLmlIwwgHaEK&pid=Api&P=0&h=180",
      mensagemDoPai2: "Matemática", // Defina o valor da prop aqui
      abre2: "Abreviação: Mat.",
      niv2: "Modalidade: Técnico Integrado",

      caminhoDaImagem3: "https://tse4.mm.bing.net/th?id=OIP.-eVHxNSXqiqHdFy8tlPlJAHaFj&pid=Api&P=0&h=180",
      mensagemDoPai3: "Português", // Defina o valor da prop aqui
      abre3: "Abreviação: Port.",
      niv3: "Modalidade: Técnico Integrado",

      msg: "Digite aqui.",
      showModal: false,
    };
  },
}
</script>

<style>
.t{
  box-sizing: border-box;
  position: absolute;
}
.p1
{
  position: absolute;
  margin-left: 200px;
  margin-top: 150px;
}
.p2{
  position: absolute;
  margin-top: 420px;
  margin-left: 200px;
}
.p3{
  position: absolute;
  margin-left: 720px;
  display: block; 
  margin-top: 150px;
}
</style>  

