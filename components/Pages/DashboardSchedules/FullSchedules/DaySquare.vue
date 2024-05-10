<script setup>
// import { ref } from "vue";
// const dayWeek = ref('Segunda');
// const dayMonth = ref('06/03');
</script>

<template>
<div class="flex flex-col justify-center items-center w-[85px] h-[75px] rounded-[10px] border-[1.5px] border-[#118D3B]">
    <p class="text-[#118D3B] text-[12px] p-0 pb-[5px] border-b-[1.5px] border-b-[#118D3B]">Segunda</p>
    <p class="text-[#118D3B] text-[11px] mt-[6px]">06/03</p>
</div>
</template>

<style scoped>
#today {
  background-color: #118D3B;
}

div#today p {
  color: white;
}

div#today p:first-child {
  border-bottom-color: white;
}
</style>