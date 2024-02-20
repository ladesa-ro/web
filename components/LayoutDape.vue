<template>
  <div>
    <div>
      <SearchBar />

      <div>
      <IconAdd @click="openConfirm" />
      <ModalNewCourses v-if="show" @close="closeConfirm"></ModalNewCourses>
    </div>
    </div>

    <div class="cardCoursesGeneral">
      <CardCursos :value="'Técnico em Informática'" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import CardCursos from "./Courses/CardCursos.vue";
import SearchBar from "./SearchBar.vue";
import { ref } from "vue";
import IconAdd from "./Icons/IconAdd.vue";
import ModalNewCourses from "./ModalAdd/ModalNewCourses.vue";

const show = ref(false);

const openConfirm = () => {
  show.value = true;
  console.log("clicou no iconeadd");
};

const closeConfirm = () => {
  show.value = false;
  console.log("Cheghoy aqi");
};

</script>

<style scoped>
.cardCoursesGeneral {
  display: flex;
}


</style>
