<script setup>
import profilePicture from '../assets/icons/profilePicture.svg';
</script>

<template>
  <v-app-bar elevation="2">
    <div class="userInfo">
      <VImg class="ml-5" :src="profilePicture" width="52"></VImg>
      <div class="nameRole">
        <p class="name">Danilo Escudero</p>
        <p class="role">Professor</p>
      </div>
    </div>
  </v-app-bar>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

.userInfo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.nameRole p {
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  margin: 0;
}

.name {
  font-weight: 600;
}

.role {
  font-weight: 400;
}
</style>