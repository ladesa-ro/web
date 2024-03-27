<script setup>
import { ref } from 'vue';
import caminhoDaImagem from "~/assets/Foto.png";
import SavedModal from "~/components/Modais/SavedModal.vue";
import adicionar from "~/componentes/adicionar.vue";
import ButtonAdd from "~/components/UI/ButtonAdd/ButtonAdd.vue";
import ContainerDiscipline from "~/components/Containers/ContainerDiscipline.vue";

const mensagemDoPai = ref("Linguagem e Lógica de Programação");
const abre = "Abreviação: L. L. Prog.";
const niv = "Modalidade: Técnico Integrado";

const caminhoDaImagem2 = "https://tse1.mm.bing.net/th?id=OIP.lKoTmKPpWT-qSlTLmlIwwgHaEK&pid=Api&P=0&h=180";
const mensagemDoPai2 = ref("Matemática");
const abre2 = "Abreviação: Mat.";
const niv2 = "Modalidade: Técnico Integrado";

const caminhoDaImagem3 = "https://tse4.mm.bing.net/th?id=OIP.-eVHxNSXqiqHdFy8tlPlJAHaFj&pid=Api&P=0&h=180";
const mensagemDoPai3 = ref("Português");
const abre3 = "Abreviação: Port.";
const niv3 = "Modalidade: Técnico Integrado";

const msg = "Digite aqui.";
const showModal = ref(false);
</script>
<template>
  <SearchBar value="Pesquisar" />
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
