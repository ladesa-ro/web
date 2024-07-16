<script setup lang="ts">
import { ref } from 'vue';
const activeButton = ref<string>('DAPE');
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
        @click="activeButton = 'Professor'"
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
.border-green-600 {
  border-color: #118d3b;
}
</style>
