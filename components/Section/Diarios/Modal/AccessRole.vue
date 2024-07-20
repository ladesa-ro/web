<script setup lang="ts">
import { ref, defineEmits } from 'vue';

// Define emit to communicate with parent component
const emit = defineEmits(['selectRole']);

// Track the active button
const activeButton = ref<string>('DAPE');

// Emit an event when 'Professor' is clicked
const selectProfessor = () => {
  activeButton.value = 'Professor';
  emit('selectRole', 'Professor');
};
</script>

<template>
  <div class="flex flex-col justify-between items-center bg-white">
    <section class="flex flex-row justify-between w-full gap-4">
      <!-- ===================== DAPE ===================== -->
      <div
        class="flex flex-col justify-center items-center w-56 h-40 border-2 rounded-lg gap-2 text-center cursor-pointer"
        :class="{'border-green-500': activeButton === 'AGRUPAMENTO', 'border-[#9AB69E]': activeButton !== 'AGRUPAMENTO'}"
        @click="activeButton = 'AGRUPAMENTO'"
      >
        <IconsIconSettings width="38" height="40" />
        <p class="font-[600]">
          Agrupamento
        </p>
      </div>
      <!-- =============================================== -->

      <!-- ================== PROFESSOR ================== -->
      <div
        class="flex flex-col justify-center items-center w-56 h-40 border-2 rounded-lg gap-2 text-center cursor-pointer"
        :class="{'border-green-500': activeButton === 'Professor', 'border-[#9AB69E]': activeButton !== 'Professor'}"
        @click="selectProfessor"
      >
        <IconsIconEducator width="36" height="49" />
        <p class="font-[600]">
          Professores
        </p>
      </div>
      <!-- =============================================== -->
    </section>
  </div>
</template>

<style scoped>
.border-green-500 {
  border-color: #118d3b;
}
</style>
