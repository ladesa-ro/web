<template>
  <div class="modal-overlay">
    <form class="modal">
      <div class="img_container">
        <h4 class="title">Cadastrar nova disciplina</h4>
        <div class="contemimg">
          <img class="ft" src="~/assets/Foto.png" />
          <div class="search-bar1">
            <fieldset class="f1">
              <legend class="legenda1">Nome</legend>
              <p class="placeholder1">Programação orientada a objetos</p>
            </fieldset>
          </div>
          <div class="search-bar2">
            <fieldset class="f2">
              <legend class="legenda2">Nome abreviado</legend>
              <p class="placeholder2">P.O.O</p>
            </fieldset>
          </div>
          <div class="search-bar3">
            <fieldset class="f3">
              <legend class="legenda3">Carga horária</legend>
              <p class="placeholder3">100 horas</p>
            </fieldset>
          </div>
          <div class="grupX">
            <h4 class="cance">Cancelar</h4>
            <img
              class="x"
              src="~/assets/Recusar.jpg"
              onmouseover="this.src='~/assets/checked_falso.png'"
            />
          </div>

          <div class="grupV">
            <h4 class="cadas">Cadastrar</h4>
            <img class="v" src="~/assets/Confirmar.jpg" />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {};
</script>
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #00000999;
}

.modal {
  position: absolute;
  margin-left: 700px;
  margin-top: 110px;
  background: white;
  height: 600px;
  width: 445px;
  border-radius: 10px;
  border: 2.3px solid #9ab69e;
  box-shadow: 0px 0px 33.5px 0px rgba(17, 141, 59, 0.15);
}

.title {
  color: #000;
  text-align: center;
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.975px;
  margin-top: 25px;
}

.contemimg {
  position: absolute;
  margin-left: 8%;
  border-radius: 10px;
  border: 2.3px solid #9ab69e;
  background: #f0f0f0;
  width: 370px;
  height: 150px;
  margin-top: 20px;
}

.ft {
  width: 370px;
  height: 150px;
  border-radius: 8px;
}
.f1 {
  position: absolute;
  margin-left: 0px;
  margin-top: 10px;
  border-radius: 10px;
  border: 2.5px solid #b2d2b7;
  width: 345px;
  height: 50px;
}
.f1:hover {
  cursor: pointer;
}
.legenda1 {
  color: #9ab69e;
  font-family: Poppins;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 6px;
}
.placeholder1 {
  color: black;
  font-family: Poppins;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  position: absolute;
  margin-top: 0px;
  margin-left: 5px;
}
.placeholder1:hover {
  cursor: pointer;
}

.f2 {
  position: absolute;
  margin-left: 0px;
  margin-top: 90px;
  border-radius: 10px;
  border: 2.5px solid #b2d2b7;
  width: 345px;
  height: 50px;
}
.f2:hover {
  cursor: pointer;
}
.legenda2 {
  color: #9ab69e;
  font-family: Poppins;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 6px;
}
.placeholder2 {
  color: black;
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  position: absolute;
  margin-top: 0px;
  margin-left: 5px;
}
.placeholder2:hover {
  cursor: pointer;
}

.f3 {
  position: absolute;
  margin-left: 0px;
  margin-top: 170px;
  border-radius: 10px;
  border: 2.5px solid #b2d2b7;
  width: 345px;
  height: 50px;
}
.f3:hover {
  cursor: pointer;
}
.legenda3 {
  color: #9ab69e;
  font-family: Poppins;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 6px;
}
.placeholder3 {
  color: black;
  font-family: Poppins;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  position: absolute;
  margin-top: 0px;
  margin-left: 5px;
}
.placeholder3:hover {
  cursor: pointer;
}
.cance {
  color: #000;
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.975px;
  position: absolute;
  margin-top: 290px;
  margin-left: 5px;
}

.cadas {
  color: #000;
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.975px;
  position: absolute;
  margin-top: 290px;
  margin-left: 250px;
}
.x {
  position: absolute;
  margin-top: 291px;
  margin-left: 110px;
  width: 22px;
  height: 22px;
}

.v {
  position: absolute;
  margin-top: 293px;
  margin-left: 360px;
  width: 24px;
  height: 20px;
}
.grupX:hover,
.cance:hover,
.x:hover {
  cursor: pointer;
  color: red;
}

.grupV:hover,
.cadas:hover,
.v:hover {
  cursor: pointer;
  color: green;
}
</style>
