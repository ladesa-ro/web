<script setup lang="ts"></script>

<template>
  <div class="contentUsu">
    <section class="content-usuario">
      <div class="ctusu">
        <NuxtLink
          v-for="i in 14"
          :key="i"
          :to="`/usuarios/${i}`"
          class="usuario"
        >
          <div class="photoProfile">
            <img class="photoUser" src="@/imgs/Perfil-Foto.png" alt="Photo User">
          </div>
          <h4 class="nomesP">Danilo Escudero</h4>
          <h6 class="cargo">Professor</h6>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<style>
.content-usuario {
  margin-left: 150px;
}
.ctusu {
  display: flex;
  flex-wrap: wrap;
  margin-top: 100px;
}

.label {
  display: block;
  width: 50px;
  font-size: 10px;
  font-weight: 600;
  background-color: white;
  margin-top: 60px;
  margin-left: 20px;
}

.usuario {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 190px;
  border: 2px solid #c8dccb;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.photoUser {
  width: 100px;
  height: 100px;
  border: 1px solid #c8dccb;
  border-radius: 8px;
  background-color: #f0f0f0;
}

.ctusu {
  display: flex;
  gap: 70px;
}

.nomesP {
  margin-top: 10px;
  color: #000;
  font-size: 0.85rem;
  font-weight: 700;
}

.cargo {
  font-weight: 350;
  color: #c8dccb;
  font-size: 14px;
}

.svgvt {
  width: 12px;
  height: 12px;
  position: relative;
}
</style>
