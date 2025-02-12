<script lang="ts" setup>
const emit = defineEmits(['selectRole']);

const activeButton = ref<string>('DAPE');

const selectProfessor = () => {
  activeButton.value = 'Professor';
  emit('selectRole', 'Professor');
};

const selectAgrupamento = () => {
  activeButton.value = 'AGRUPAMENTO';
  emit('selectRole', 'AGRUPAMENTO');
};
</script>

<template>
  <div class="flex flex-col justify-between items-center bg-ldsa-bg">
    <section class="flex flex-row justify-between w-full gap-4">
      <!-- ===================== AGRUPAMENTO ===================== -->
      <div
        :class="{
          active: activeButton === 'AGRUPAMENTO',
          'border-ldsa-grey': activeButton !== 'AGRUPAMENTO',
        }"
        class="toggle-option"
        @click="selectAgrupamento"
      >
        <IconsIconGroup height="40" width="42" />
        <p class="font-[600]">Aulas por dia</p>
      </div>
      <!-- =============================================== -->

      <!-- ================== PROFESSOR ================== -->
      <div
        :class="{
          active: activeButton === 'Professor',
          'border-ldsa-grey': activeButton !== 'Professor',
        }"
        class="toggle-option"
        @click="selectProfessor"
      >
        <IconsIconEducator height="49" width="36" />
        <p class="font-[600]">Professores</p>
      </div>
      <!-- =============================================== -->
    </section>
  </div>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.toggle-option {
  @apply flex flex-col justify-center items-center gap-2;
  @apply w-56 h-40 border-2 rounded-lg text-center cursor-pointer;
}

.active {
  @apply bg-ldsa-green-1 border-ldsa-green-1 text-ldsa-white;
}
</style>
