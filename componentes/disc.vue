<script setup>
const props = defineProps({
  imgSr: String,
  sala: String,
  curso: String,
  turno: String,
})

const { imgSr, sala, curso, turno } = props;
</script>

<template class="tudo">
  <div class="pai">
    <img class="lapis" src="~/assets/Edit.jpg">
    <img class="img" :src="imgSr"/>
    <div class="titulo"><b>{{ sala }}</b></div>
    <div class="abreviação">{{ curso }}</div>
    <div class="nível">{{ turno }}</div>
  </div>
</template>

<script>
export default {
  name: 'bloco',
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;1,500&display=swap');
.tudo{
  box-sizing: border-box;
  position:absolute;
}
.pai{
  width: 487px;
  height: 106px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 2.3px solid #B2D2B7;
  background: #FFF;
}
.img{
  width: 106px;
  height: 106px;
  flex-shrink: 0;
}
.titulo{
  position: absolute;
  margin-left: 130px;
  font-family: Poppins;
  font-size: 18.884px;
  font-weight: bold;
  font-style: normal;
  font-weight: 900;
  line-height: bold;
  margin-top: -95px;
}
.abreviação{
  color: #7C9C81;
  font-family: Poppins;
  font-size: 15.107px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: -67px;
  margin-left: 130px;
}
.nível{
  color: #7C9C81;
  font-family: Poppins;
  font-size: 15.107px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 0px;
  margin-left: 130px;
}
.img{
  border-radius: 8px 0px 0px 8px;
}
.lapis{
  position: absolute;
  margin-top: -900px;
}
</style>