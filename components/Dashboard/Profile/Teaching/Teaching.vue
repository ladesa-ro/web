<script setup>
import "vue3-carousel/dist/carousel.css";
</script>

<template>
  <DashboardProfileCard>
    <template #icone>
      <IconsIconTeaching class="icon" />
    </template>

    <template #titulo>Ensino</template>

    <div class="ml-[10px] slid w-auto">
      <Carousel snapAlign="start" :items-to-show="2.5" :wrap-around="true">
        <Slide v-for="slide in 10" :key="slide">
          <div class="carousel__item border-card">
            <div class="content block">
              <img class="image" src="@/imgs/Foto-Curso.png" alt="" />

              <div class="pa-2 px-5 text-start m-1">
                <span class="block text-sm font-semibold"
                  >Técnico em Informática</span
                >
                <!-- <span
                  class="flex text-[#9ab69e] text-[11px] font-semibold mt-2 align-center"
                >
                  Turmas:
                  <div
                    class="font-light text-[10px] w-max ml-2 px-2 py-1 text-[#1b0d91] rounded-lg overflow-hidden"
                  >
                    <span>3°A, 3°B</span>
                  </div>
                  <div
                    class="font-light text-[10px] w-max ml-2 px-2 py-1  text-[#c5e65c]  rounded-lg overflow-hidden"
                  >
                    <span>2°A, 2°B</span>
                  </div>
                  <div
                    class="font-light text-[10px] w-max ml-2 px-2 py-1 text-[#349e97] rounded-lg overflow-hidden"
                  >
                    <span>1°A, 1°B</span>
                  </div>
                </span> -->
              </div>

              <!-- <div
                class="flex justify-center gap-3 w-max mx-4 text-nowrap text-xs"
              >
                <div
                  class="font-medium w-full px-4 py-1 border-2  border-[#1b0d91] text-[#1b0d91] rounded-lg overflow-hidden"
                >
                  <span>Redes</span>
                </div>
                <div
                  class="font-medium w-full px-4 py-1 border-2 border-[#349e97] text-[#349e97] rounded-lg overflow-hidden"
                >
                  <span>L.P.</span>
                </div>
                <div
                  class="font-medium w-full px-4 py-1 border-2 border-[#c5e65c] text-[#c5e65c] rounded-lg overflow-hidden"
                >
                  <span>POO</span>
                </div>
              </div> -->
              
              <div class="flex ml-5">
                <div class="block justify-center gap-7 w-max mx-4 text-nowrap text-xs border-2 border-[#9ab69e] rounded-lg overflow-hidden">
                <div class="block metade h-3/6  w-full px-4 bg-[#9ab69e] text-white py-1">
                  <span>Redes</span>
                </div>
                <div class="block metade2 h-3/6  w-full px-4 py-1">
                  <span>3°A, 3°B</span>
                </div>
              </div>
              <div class="block justify-center gap-7 w-max mx-4 text-nowrap text-xs border-2 border-[#9ab69e] rounded-lg overflow-hidden">
                <div class="block metade h-3/6 w-full bg-[#9ab69e] text-white px-4 py-1">
                  <span>Redes</span>
                </div>
                <div class="block metade2 h-3/6  w-full px-4 py-1">
                  <span>3°A, 3°B</span>
                </div>
              </div>
              </div>

              <!-- <span
                class="p-2 rounded-lg text-sm font-medium border-2 hover:bg-[#d7f2db] border-[#9ab69e]"
              >
              <span class="block text-xs text-nowrap text-[#1b0d91]"
              >3°b e 3°A</span
              >
              <v-divider
                :thickness="4"
                class="border-opacity-100"
                color="info"
              ></v-divider>
                L. P.
              </span>
              <span
                class="p-2 rounded-lg text-sm font-medium border-2 hover:bg-[#d7f2db] border-[#9ab69e]"
              >
                <span class="block text-xs text-nowrap text-[#1b0d91]"
                  >3°b e 3°A</span
                >
                <span></span>
                Redes
              </span> -->
            </div>
          </div>
        </Slide>

        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
    </div>
  </DashboardProfileCard>
</template>

<style>
.card-container {
  height: 300px;
  background-color: #fff;
  border: 2px solid #9ab69e;
  border-radius: 8px;
  overflow: hidden;
}

.slid {
  height: 257px;
  background-color: #fff;
  margin-top: 40px;
}

.carousel__item {
  min-height: 200px;
  width: 100%;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: start;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
}

.image {
  height: 70px;
}
</style>
