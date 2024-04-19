<script setup>
import { ref } from 'vue';
import caminhoDaImagem from "~/assets/Foto.png";
import SavedModal from "~/components/Modais/SavedModal.vue";
import IconAdd from "~/components/Icons/IconAdd.vue"; 
import ContainerDiscipline from "~/components/Containers/ContainerDiscipline.vue";

const mensagemDoPai = ref("Sala 27");
const abre = "Bloco: BI. Info";
const niv = "Estado: Ocupado";

const caminhoDaImagem2 = "https://tse1.mm.bing.net/th?id=OIP.lKoTmKPpWT-qSlTLmlIwwgHaEK&pid=Api&P=0&h=180";
const mensagemDoPai2 = ref("Sala 27");
const abre2 = "Bloco: BI. Info";
const niv2 = "Estado: Ocupado";

const caminhoDaImagem3 = "https://tse4.mm.bing.net/th?id=OIP.-eVHxNSXqiqHdFy8tlPlJAHaFj&pid=Api&P=0&h=180";
const mensagemDoPai3 = ref("Sala 27");
const abre3 = "Bloco: BI. Info";
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
  <SavedModal v-if="show" @close="closeConfirm"/>

  <div class="save-btn">
    <button @click="showModal = true">
      <IconAdd class="adc" @click="openConfirm" />
    </button>
  </div>
</template>

<style scooped>
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


.adc:hover{
  cursor: pointer; 
}
</style>