<script setup lang="ts">
const props = defineProps<{ notificationsButtonEl: HTMLElement | null }>();
</script>

<!-- 
	<!-- PROFESSOR -->
	<!--  DAPE -- >
-->

<template>
  <div
    class="flex flex-col justify-between items-center w-[19.75rem] h-[18.125rem] px-8 py-6 border-2 border-[#9AB69E] rounded-lg bg-white"
  >
    <span class="font-[600]">Alternar versão</span>

    <section class="flex flex-row justify-between w-full">
      <div
        class="flex flex-col justify-end items-center w-28 h-36 border-2 rounded-lg border-[#9AB69E] px-0 py-8 gap-2 text-center cursor-pointer"
      >
        <IconsIconUser width="38" height="40"/>
        <p class="font-[600]">DAPE</p>
      </div>

      <div
        class="flex flex-col justify-end items-center w-28 h-36 border-2 rounded-lg border-[#118D3B] px-0 py-8 gap-2 bg-[#118D3B] text-center cursor-pointer"
      >
        <IconsIconEducator width="36" height="49" class="-icon-white"/> 
        <p class="font-[600] text-white">Professor</p>
      </div>
    </section>

    <span
      class="flex flex-row justify-between min-w-24 font-[600] cursor-pointer"
    >
      Cancelar
	  <IconsIconClose width="11" height="10"/>
    </span>
  </div>
</template>

<style scoped></style>
<!--ainda irei adicionar estilo de checked-->
