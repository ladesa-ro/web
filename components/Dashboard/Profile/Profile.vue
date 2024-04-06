<script setup>
import IconEdit from "@/components/Icons/IconEdit.vue";
import IconEditWhite from "@/components/Icons/IconEditWhite.vue";
import Availability from "@/components/Dashboard/Availability/Availability.vue";
</script>
<template>
  <v-container class="container-image pa-0 mt-14">
    <div class="card-profile">
      <div class="container-content">
        <img src="@/imgs/Perfil-Foto.png" alt="" />
        <div class="text">
          <h2>Danilo Escudero</h2>
          <p>danilo.escudero@gmail.com</p>
          <h4>Professor</h4>
        </div>
        <IconEdit class="icon-edit" />
      </div>
    </div>
    <IconEditWhite class="edit-w" />
  </v-container>


  <Availability class="avb" />
  <!-- <DashboardTeaching/> -->

</template>
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

</style>
