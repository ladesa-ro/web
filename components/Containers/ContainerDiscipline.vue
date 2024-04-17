<script setup>
const props = defineProps({
  imagemSrc: String,
  mensagem: String,
  abreviacao: String,
  nivel: String,
});

const { imagemSrc, mensagem, abreviacao, nivel } = props;
</script>

<template>
  <v-card
  elevation="3"
  class="cardCourses mx-auto" 
  max-width="40%"
    hover
  >
    <v-img
      height="148px"
      :src="imagemSrc"
      cover
    ></v-img>

    <v-card-title class="title">
      {{ mensagem }}
    </v-card-title>

    <v-card-subtitle class="subtitle">
      {{ abreviacao }}
    </v-card-subtitle>

    <v-card-subtitle class="subtitle">
      {{ nivel }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  name: "ContainerDiscipline.vue",
}; //EXPORTAÇÃO//
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;1,500&display=swap");

.cardCourses {
  border: 2.5px solid #9AB69E;
  border-radius: 10px;
  overflow: hidden;
  padding-bottom: 20px;
}
.title{
  color: #05270F;
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 9px;
  margin-top: 12px;
}
.subtitle{
  color: #0D7B1D;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 9px;
}

</style>
