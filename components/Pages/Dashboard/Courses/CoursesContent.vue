<script lang="ts" setup>
import { ref } from "vue";

const show = ref(false);

let searchBarText = ref("");
</script>

<template>
  <v-container>
    <div class="container">
      <div>
        <div class="container-header px-3">
          <UISearchBar :value="searchBarText" @update:value="searchBarText = $event" />
          <div class="container-header-actions">
            <PagesDashboardCoursesModalNewCourse />
          </div>
        </div>

        <div class="cardCoursesGeneral">
          <PagesDashboardCoursesCoursesList :searchBarText="searchBarText" />
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

  display: flex;
  align-items: center;
}
</style>
