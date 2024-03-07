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
  <div>
    <div>
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
</template>

<style scoped>
.cardCoursesGeneral {
  display: flex;
}
</style>
