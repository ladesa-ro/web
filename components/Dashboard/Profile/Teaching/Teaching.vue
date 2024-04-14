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
              <img class="image"
              src="@/imgs/Foto-Curso.png" alt=""/>

              <div class="text-start m-1">
                <span class="block text-sm font-semibold">Técnico em Informática</span>
                <span class="text-[#9ab69e] text-sm font-semibold">Turmas: 1°A, 2°B, 3°A</span>
              </div>

              <div class=" mt-3 flex justify-center gap-7 ">
                <span class="p-2 rounded-lg text-sm font-medium border-2 border-[#9ab69e]">L.L. Prog</span>
                <span class="p-2 rounded-lg text-sm font-medium border-2 border-[#9ab69e]">L.L. Prog</span>
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
