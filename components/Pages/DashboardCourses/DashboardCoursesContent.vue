<script lang="ts" setup>
import { ref } from "vue";

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

<template>
  <v-container>
    <div class="container">
      <div>
        <div class="containerButtons px-3">
          <UISearchBar />
    
          <div>
            <UIButtonAdd @click="openConfirm" />
            <PagesDashboardCoursesModalNewCourse
              v-if="show"
              @close="closeConfirm"
            />
          </div>
        </div>
    
        <div class="cardCoursesGeneral">
          <PagesDashboardCoursesCoursesList :value="'Técnico em Informática'" />
        </div>
      </div>
    </div>
  </v-container>
</template>

<style scoped>
.container {
  margin: 0 auto;
  max-width: 89%;
}

.containerButtons {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
}

@media (max-width: 600px) {
  .containerButtons {
    row-gap: 10px;
    flex-direction: column;
    align-items: flex-end;
  }
}


</style>
