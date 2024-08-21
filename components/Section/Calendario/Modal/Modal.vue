<script lang="ts" setup>
import { ref } from 'vue';

const isActive = ref(false);
</script>

<template>
  <v-dialog max-width="500" v-model="isActive">
    <template v-slot="{ isActive }">
      <v-card class="dialog-style">
        <SectionCalendarioModalEventList />
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>
.dialog-style {
  border-radius: 14px !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: solid 2px #9ab69e;
}

.detail {
  cursor: pointer;
  z-index: 10;
  margin-right: 16px;
}
</style>
