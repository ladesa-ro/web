<script setup>
import { ref, defineProps, watchEffect } from "vue";
import IconEdit from "~/components/Icons/IconEdit.vue";

const props = defineProps({
  searchBarText: String,
});

const { cursos } = await useApiCursosFindAll(props.searchBarText);
</script>

<template v-slot:search="{ value }">
  <v-container class="">
    <v-row v-if="cursos">
      <v-col cols="12" sm="6" md="4" lg="4" class="px-2" v-for="curso in cursos" :key="curso.id">
        <v-card class="cardCourses mx-auto" max-width="100%">
          <v-img src="https://picsum.photos/487/120" height="120px" width="100%" cover></v-img>
          <div class="textAndButton">
            <v-card-title class="courseTitle">{{ curso.nome }}</v-card-title>
            <IconEdit class="detail" />
          </div>
          <v-card-subtitle class="edit-02">
            Abreviação: {{ curso.nomeAbreviado }}
          </v-card-subtitle>
          <v-card-subtitle class="edit-02">
            Modalidade: {{ curso.modalidade.nome }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-alert
    v-if="cursos.length === 0"
    color="info"
      icon="$info"
      variant="tonal"
      title="Nenhum curso encontrado"
      text=""
  ></v-alert>
  </v-container>
</template>

<style scoped>
.courses {
  display: flex;
  flex-wrap: wrap;
  column-gap: 30px;
  row-gap: 25px;
}

.textAndButton {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail {
  cursor: pointer;
  z-index: 10;
  margin-right: 10px;
}

.cardCourses {
  border: 2px solid #9ab69e;
  border-radius: 8px;
  overflow: hidden;
  padding-bottom: 20px;
}

.c {
  text-decoration: none;
}

.courseTitle {
  white-space: nowrap;
  font-weight: 600;
  color: black;
  text-decoration: none;
}

.imageCursos {
  border-radius: 8px 8px 0px 0px;
  width: 100%;
  height: 60%;
  overflow: hidden;
}

.edit-01 {
  display: flex;
  margin-top: 10px;
  margin-left: 20px;
}

.iconEdit {
  margin-left: 380px;
}

.edit-02 {
  display: block;
  color: #9ab69e;
  font-weight: 500;
  opacity: 1 !important;
}

.edit-02.ab {}
</style>
