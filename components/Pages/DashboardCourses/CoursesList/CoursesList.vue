<script setup>
import { ref } from "vue";
import IconEdit from "~/components/Icons/IconEdit.vue";
import cardPhoto from "~/imgs/CardCourses.png";

defineProps(["value"]);

const show = ref(false);

const openConfirm = () => {
  show.value = true;
  console.log("clicou no iconeEdit");
};

const closeConfirm = () => {
  show.value = false;
  console.log("Cheghoy aqi no iconeEdit");
};

const cardInfo = [
  {
    title: "Curso 1",
    abreviation: "Téc. Info.",
    modality: "Integrado",
    cardPhoto: cardPhoto,
  },
  {
    title: "Curso 2",
    abreviation: "Téc. Info.",
    modality: "Integrado",
    cardPhoto: cardPhoto,
  },
  {
    title: "Curso 3",
    abreviation: "Téc. Info.",
    modality: "Integrado",
    cardPhoto: cardPhoto,
  },
  {
    title: "Curso 4",
    abreviation: "Téc. Info.",
    modality: "Integrado",
    cardPhoto: cardPhoto,
  },
  {
    title: "Curso 5",
    abreviation: "Téc. Info.",
    modality: "Integrado",
    cardPhoto: cardPhoto,
  },
  {
    title: "Curso 6",
    abreviation: "Téc. Info.",
    modality: "Integrado",
    cardPhoto: cardPhoto,
  },
  {
    title: "Curso 7",
    abreviation: "Téc. Info.",
    modality: "Integrado",
    cardPhoto: cardPhoto,
  },
  {
    title: "Curso 8",
    abreviation: "Téc. Info.",
    modality: "Integrado",
    cardPhoto: cardPhoto,
  },
  {
    title: "Curso 9",
    abreviation: "Téc. Info.",
    modality: "Integrado",
    cardPhoto: cardPhoto,
  },
  {
    title: "Curso 10",
    abreviation: "Téc. Info.",
    modality: "Integrado",
    cardPhoto: cardPhoto,
  },
];
</script>

<template v-slot:search="{ value }">
  <v-container class="">
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="4"
        class="px-2"
        v-for="i in cardInfo"
        :key="i"
      >
        <v-card class="cardCourses mx-auto" max-width="100%">
          <v-img :src="cardPhoto" height="120px" width="100%" cover></v-img>
          <div class="textAndButton">
            <v-card-title class="courseTitle">{{ i.title }}</v-card-title>
            <IconEdit class="detail" />
          </div>
          <v-card-subtitle class="edit-02">
            Abreviação: {{ i.abreviation }}
          </v-card-subtitle>
          <v-card-subtitle class="edit-02">
            Modalidade: {{ i.modality }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
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

.edit-02.ab {
}
</style>
