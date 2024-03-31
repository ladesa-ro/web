<script setup></script>
<template>
  <div>
    <div class="user">
      <div class="container-image">
        <div class="card-profile">
          <div class="container-content">
            <img src="@/imgs/Perfil-Foto.png" alt="" />
            <div class="text">
              <h2>Danilo Escudero</h2>
              <p>danilo.escudero@gmail.com</p>
              <h4>Professor</h4>
            </div>
            <UIIconsIconEdit class="icon-edit" />
          </div>
        </div>
        <UIIconsIconEditWhite class="edit-w" />
      </div>

      <div class="container-availability">
        <div class="hours-availability">
          <UIIconsIconBefore/>
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

.container-availability {
  height: 300px;
  width: 45%;
  margin-top: 40px;
  border: 2px solid #9ab69e;
  border-radius: 8px;
}

@media (max-width: 1370px) {
  .text h2 {
    font-size: 15px;
  }

  .text p {
    font-size: 14px;
  }

  .text h4 {
    font-size: 14px;
  }
}

@media (max-width: 600px) {
  .card-profile {
    width: 80%;
    margin-left: 7%;
  }

  .text p {
    font-size: 10px;
  }
}

@media (max-width: 460px) {
  .card-profile {
    width: 85%;
  }
}

@media (max-width: 435px) {
  .text p {
    font-size: 8px;
    width: 30px;
  }

  .text h4 {
    font-size: 10px;
  }

  .edit-w {
    margin-right: 5%;
  }
}



@media (max-width: 395px) {
  .card-profile {
    align-items: center;
  }

  .card-profile img {
    width: 15%;
    margin-left: 7.5%;
    margin-top: -60px;
  }

  .container-content {
    display: flex;
    flex-direction: column;
    margin-left: 15%;
  }
  .text {
    display: block;
    width: 500px;
    margin: 5px 0px 0px 15px;
    overflow-wrap: none !important;
  }

  .text p {
    width: max-content;
    margin-left: 5px;
    overflow-wrap: normal;
  }

  .text h4 {
    margin-left: 38px;
    width: max-content;
  }

  .icon-edit {
    display: flex;
    margin: -130px 0px 0px 140px;
  }
}
</style>