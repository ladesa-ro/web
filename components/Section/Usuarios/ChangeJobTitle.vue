<script setup lang="ts">
const props = defineProps<{ notificationsButtonEl: HTMLElement | null }>();
const activeButton = ref<string>('DAPE');
</script>

<template>
  <div
    class="flex flex-col justify-between items-center w-[19.75rem] h-[18.125rem] px-8 py-6 border-2 border-[#9AB69E] rounded-lg bg-white"
  >
    <span class="font-[600]">Alternar versão</span>

    <section class="flex flex-row justify-between w-full">
      <!-- ===================== DAPE ===================== -->
      <div
        class="flex flex-col justify-end items-center w-28 h-36 border-2 rounded-lg border-[#9AB69E] px-0 py-8 gap-2 text-center cursor-pointer"
        :class="{active: activeButton === 'DAPE'}"
        @click="activeButton = 'DAPE'"
      >
        <IconsIconUser width="38" height="40"/>
        <p class="font-[600]">DAPE</p>
      </div>
      <!-- =============================================== -->


      <!-- ================== PROFESSOR ================== -->
      <div
        class="flex flex-col justify-end items-center w-28 h-36 border-2 rounded-lg border-[#9AB69E] px-0 py-8 gap-2 text-center cursor-pointer"
        :class="{active: activeButton === 'Professor'}"
        @click="activeButton = 'Professor'"
      >
        <IconsIconEducator width="36" height="49" />
        <p class="font-[600]">Professor</p>
      </div>
      <!-- =============================================== -->
    </section>

    <span
      class="flex flex-row justify-between min-w-24 font-[600] cursor-pointer"
    >
      Cancelar
	  <IconsIconClose width="11" height="10"/>
    </span>
  </div>
</template>

<style scoped>
.active {
  background-color: #118D3B;
  border-color: #118D3B;
  color: white;
}
</style>