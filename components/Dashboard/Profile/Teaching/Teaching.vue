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
                  >Técnico em Informática</span>
              </div>

              <div class="flex ml-5">
                <div class="block justify-center gap-7 w-max mx-4 text-nowrap text-xs border-2 border-[#9ab69e] rounded-lg overflow-hidden">
                  <div class="block metade h-3/6 w-full px-4 bg-[#9ab69e] text-white py-1">
                    <span>Redes</span>
                  </div>
                  <div class="block metade2 h-3/6 w-full px-4 py-1">
                    <span>3°A, 3°B</span>
                  </div>
                </div>
                <div class="block justify-center gap-7 max-[1280px]:w-max  mx-4 text-nowrap text-xs border-2 border-[#9ab69e] rounded-lg overflow-hidden">
                  <div class="block metade h-3/6 max-[1279px]:w-full bg-[#9ab69e] text-white px-4 py-1">
                    <span>Redes</span>
                  </div>
                  <div class="block metade2 h-3/6 w-full px-4 py-1">
                    <span>3°A, 3°B</span>
                  </div>
                </div>
              </div>
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
