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
        <div class="container-header px-3">
          <UISearchBar />

          <div class="container-header-actions">
            <UIButtonAdd @click="openConfirm" />
            <PagesDashboardCoursesModalNewCourse v-if="show" @close="closeConfirm" />
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

.container-header {
  padding: 50px 0;

  margin: 0 auto;
  display: flex;

  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.container-header-actions {
  flex-shrink: 0;
}
</style>
