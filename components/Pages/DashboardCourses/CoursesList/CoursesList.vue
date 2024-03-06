<script setup>
import { ref } from "vue";
import IconEdit from "~/components/Icons/IconEdit.vue";

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
</script>

<template v-slot:search="{ value }">
  <div>
    <section class="courses">
      <div class="cardCourses" v-for="i in 10" :key="i">
        <div class="c">
          <div>
            <img src="@/imgs/CardCourses.png" alt="Imagem de perfil do curso" class="imageCursos" />
          </div>

          <div>
            <div class="edit-01">
              <NuxtLink class="courseTitle" :to="`/cursos/${i}`">{{ value }}</NuxtLink>

              <IconEdit class="iconEdit" @click="openConfirm" />

              <PagesDashboardCoursesModalEditCourse v-if="show" @close="closeConfirm" />
            </div>

            <div class="edit-02 ab">
              <span>Abreviação: Téc. Info.</span>
            </div>

            <div class="edit-02">
              <span>Modalidade: Integrado</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.courses {
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  margin-left: 150px;
}

.cardCourses {
  width: calc(33.33% - 50px);
  height: 300px;
  border: 2px solid #9ab69e;
  border-radius: 8px;
  margin-top: 80px;
  overflow: hidden;
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
  margin-left: 20px;
}

.edit-02.ab {
  margin-top: 60px;
}
</style>
