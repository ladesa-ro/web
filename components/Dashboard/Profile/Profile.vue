<script setup>
import IconEdit from "@/components/Icons/IconEdit.vue";
import IconEditWhite from "@/components/Icons/IconEditWhite.vue";

import Teaching from "@/components/Dashboard/Profile/Teaching/Teaching.vue";
import Availability from "@/components/Dashboard/Profile/Availability/Availability.vue";
</script>

<template>
  <div class="py-14">
    <v-container class="container-image pa-0">
      <div class="card-profile">
        <div class="container-content">
          <img src="@/imgs/Perfil-Foto.png" alt="" />
          <div class="text">
            <span class="font-bold">Danilo Escudero</span>
            <p class="font-medium">danilo.escudero@gmail.com</p>
            <span class="font-medium">Professor</span>
          </div>
        </div>
        <IconsIconEdit class="cursor-pointer mt-4 self-start"/>
      </div>
      <IconEditWhite class="self-start ml-auto mr-4 mt-4 cursor-pointer" />
    </v-container>

    <v-container class="my-7 pa-0 lg:flex items-stretch gap-[12px] ">
      <Availability class="sm:mb-11" />
      <Teaching class="flex-1" />
    </v-container>
  </div>
</template>

<style>
.border-card {
  border: 2px solid #9ab69e;
  border-radius: 8px;
  overflow: hidden;
}
</style>

<style scoped>
.container-image {
  display: flex;       
  align-items: flex-end;
  justify-content: start;
  background-color: #9ab69e;
  height: 200px;
  border-radius: 8px;
}

.edit-w {
  align-self: flex-start;
  margin-top: 10px;
  margin-left: auto;
  margin-right: 2%;
}

.card-profile {
  display: flex;
  width: 400px;
  height: 150px;
  background-color: #fff;
  margin-left: 3%;
  box-sizing: border-box;
  border-radius: 10px 10px 0px 0px;
  padding: 5px;
  top: 300px;
}

.container-content {
  display: flex;
  padding: 20px;
}

.text {
  margin-left: 5%;
  margin-top: 20px;
  gap: 10px;
}

.text h2,
.text h4,
.text p {
  width: max-content;
}

.card-profile h2 {
  display: block;
  font-size: 17px;
}

.text p {
  color: #9ab69e;
}

.cont {
  border: 2px solid #9ab69e;
  border-radius: 8px;
}
</style>
