<script setup></script>

<template>
  <div>
    <div class="user">
      <div class="container-image">
        <div class="card-profile">
          <img src="@/imgs/Perfil-Foto.png" alt="" />
          <div class="container-text">
            <h2>Danilo Escudero</h2>
            <p>danilo.escudero@gmail.com</p>
            <h4>Professor</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.user {
  width: 85%;
  height: 100vh;
  margin-left: 8%;
  margin-top: 40px;
}
.container-image {
  display: flex;
  align-items: flex-end;
  justify-content: start;
  background-color: #9ab69e;
  height: 200px;
  border-radius: 8px;
}

.card-profile {
  display: flex;
  width: 30%;
  height: 150px;
  background-color: #fff;
  margin-left: 2%;
  box-sizing: border-box;
  border-radius: 10px 10px 0px 0px;
}

.container-text {
  display: flex;
  flex-direction: column;
  margin-left: 5%;
  margin-top: 20px;
  gap: 10px;
}

.card-profile h2 {
  display: block;
  font-size: 17px;
}

@media (max-width: 600) {
  .card-profile {
    flex-direction: column;
  }
}
</style>
