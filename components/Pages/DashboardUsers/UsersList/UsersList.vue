<script setup lang="ts"></script>

<template>
  <v-container >
    <section>
      <div class="flex flex-wrap gap-[27px]">
        <NuxtLink
          v-for="i in 14"
          :key="i"
          no-prefetch
          :to="`/usuarios/${i}`"
          class="flex flex-col justify-center items-center w-[140px] h-[190px] border-2 border-[#9ab69e] rounded-lg no-underline"
        >
          <div class="photoProfile">
            <img
              class="photoUser"
              src="@/imgs/Perfil-Foto.png"
              alt="Photo User"
            />
          </div>
          <h4 class="nomesP">Danilo Escudero</h4>
          <h6 class="cargo">Professor, DAPE</h6>
        </NuxtLink>
      </div>
    </section>
  </v-container>
</template>

<style>
.usuario {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 190px;
  border: 3px solid #9ab69e;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.photoUser {
  width: 100px;
  height: 100px;
  border: 3px solid #9ab69e;
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
  font-weight: 500;
  color: #9ab69e;
  font-size: 14px;
}

.svgvt {
  width: 12px;
  height: 12px;
  position: relative;
}
</style>
