<script setup>
// import { ref } from "vue";
// const dayWeek = ref('Segunda');
// const dayMonth = ref('06/03');
</script>

<template>
<div class="flex flex-col justify-center items-center gap-2 rounded-[10px] border-2 border-[#118D3B] p-4"> <!--w-[85px] h-[75px] // w-[106.25px] h-[100px]-->
    <p class="border-b-2 border-b-[#118D3B] p-0 pb-[5px] font-[600] text-[#118D3B]">Segunda</p>
    <p class="font-[600] text-[#118D3B]">06/03</p>
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