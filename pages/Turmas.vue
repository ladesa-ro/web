<template class="t  ">
  <search-bar class="place" :msge="msg"></search-bar>
  <adicionar/>
<disc class="dis2" :imgSr="caminhoDaImagem2" :sala="mensagemDoPai2" :curso="abre2" :turno="niv2"/>
<disc class="dis3" :imgSr="caminhoDaImagem1" :sala="mensagemDoPai1" :curso="abre1" :turno="niv1"/>
<disc class="dis" :imgSr="caminhoDaImagem3" :sala="mensagemDoPai3" :curso="abre3" :turno="niv3"/>

</template>
<script>
import adicionar from '~/componentes/adicionar.vue'
import SearchBar from '~/componentes/SearchBar.vue'
import disc from '~/componentes/disc.vue'
import iagex from '~/assets/kilo.png'
export default{
components:{
  adicionar,
  SearchBar,
  disc,
},
data() {
  return {
    msg: "Procure uma turma...",

    caminhoDaImagem3: iagex,
    mensagemDoPai3: "2°Ano A - Informática", // Defina o valor da prop aqui
    abre3: "Curso: Téc.Info.",
    niv3: "Turnos: Maatutino e Vespertino",

    caminhoDaImagem2: "https://tse4.mm.bing.net/th?id=OIP.-eVHxNSXqiqHdFy8tlPlJAHaFj&pid=Api&P=0&h=180",
    mensagemDoPai2: "2°Ano B - Floresta", // Defina o valor da prop aqui
    abre2: "Curso: Téc.Flor.",
    niv2: "Turnos: Matutino e vespertino",

    caminhoDaImagem1: "https://tse4.mm.bing.net/th?id=OIP.-eVHxNSXqiqHdFy8tlPlJAHaFj&pid=Api&P=0&h=180",
    mensagemDoPai1: "2°Ano A - Química", // Defina o valor da prop aqui
    abre1: "Curso: Téc.Quim.",
    niv1: "Turnos: Matutino e vespertino",
  };
}
}
</script>
<style>
.t{
box-sizing: border-box;
position: absolute;
}
.dis
{
position: absolute;
margin-left: 200px;
margin-top: 150px;
}
.dis2{
position: absolute;
margin-top: 295px;
margin-left: 200px;
}
.dis3{
position: absolute;
margin-left: 715px;
display: block; 
margin-top: 150px;
}
</style>  