<script setup>
import { ref } from 'vue';
import caminhoDaImagem from "~/assets/Foto.png";
import SavedModal from "~/components/Modais/SavedModal.vue";
import IconAdd from "~/components/Icons/IconAdd.vue"; 
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
}
</script>
<template>
  <SearchBar value="Pesquisar" />
  <v-container class="container">
    <ContainerDiscipline
    class="p1"
    :imagemSrc="caminhoDaImagem"
    :mensagem="mensagemDoPai"
    :abreviacao="abre"
    :nivel="niv"  
  />
  <ContainerDiscipline
    class="p1"
    :imagemSrc="caminhoDaImagem"
    :mensagem="mensagemDoPai"
    :abreviacao="abre"
    :nivel="niv"  
  />
  <ContainerDiscipline
    class="p1"
    :imagemSrc="caminhoDaImagem"
    :mensagem="mensagemDoPai"
    :abreviacao="abre"
    :nivel="niv"  
  />
  </v-container>
  

  <SavedModal v-if="show" @close="closeConfirm"/>

  <div class="save-btn">
    <button @click="showModal = true">
      <IconAdd class="adc" @click="openConfirm" />
    </button>
  </div>
</template>
<style scooped>
.container{
  display: flex;
  margin-left: 90px;
  margin-top: 15px;
  flex-direction: row;
  align-items: flex-end;
  border: 1px solid red;

}
</style>