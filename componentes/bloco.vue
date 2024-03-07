<script setup>
const props = defineProps({
  imagemSrc: String,
  mensagem: String,
  abreviacao: String,
  nivel : String,
})

const { imagemSrc, mensagem, abreviacao, nivel } = props;
</script>

<template class="tudo">
  <div class="pai">
    <img class="img" :src="imagemSrc"/>
    <div class="titulo"><b>{{ mensagem }}</b></div>
    <div class="abreviação">{{ abreviacao }}</div>
    <div class="nível">{{ nivel }}</div>
    <img class="ft" src="~assets/Editar.png">
  </div>
</template>

<script>
export default {
  name: 'bloco',
}//EXPORTAÇÃO//
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;1,500&display=swap');
.tudo{
  box-sizing: border-box;
  position:absolute;
}
.pai{
  width: 487px;
  height: 239px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1.5px solid #9AB69E;
  background: #FFF;
}
.img{
  width: 487px;
  height: 120px;
  flex-shrink: 0;
}
.titulo{
  position: absolute;
  margin-left: 20px;
  font-family: Poppins;
  font-size: 15.107px;
  font-weight: bold;
  font-style: normal;
  font-weight: 900;
  line-height: bold;
  margin-top: 15px;
}
.abreviação{
  position: absolute;
  margin-left: 20px;
  font-family: Poppins;
  font-size: 15.107px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: #9AB69E;
  margin-top: 50px;
}
.nível{
  position: absolute;
  margin-left: 20px;
  font-family: Poppins;
  font-size: 15.107px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: #9AB69E;
  margin-top: 70px;
}
.img{
  border-radius: 8px 8px 0px 0px;
}
.ft{
  position: absolute;
  margin-left: -45px;
  margin-top: 140px;
  width: 30px;
  height: 30px;
}
</style>