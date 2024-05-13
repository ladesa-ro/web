<script setup>
import 'vue3-carousel/dist/carousel.css';
</script>

<template>
	<DashboardProfileCard>
		<template #icone>
			<IconsIconDiscipline class="icon" />
		</template>

		<template #titulo>Ensino</template>

		<div class="ml-[20px] mr-[30px] slid w-auto">
			<Carousel
				snapAlign="start"
				:items-to-show="2.5"
				:wrap-around="true"
			>
				<Slide v-for="slide in 10" :key="slide">
					<div class="carousel__item border-card">
						<div class="content block w-full">
							<img
								alt="Capa do Curso Técnico"
								class="image w-full object-cover"
								src="@/imgs/Foto-Curso.png"
							/>

							<div class="my-4 px-5">
								<div class="text-start">
									<span
										class="block text-sm text-center font-semibold"
									>
										Técnico em Informática {{ slide }}
									</span>
								</div>

								<div class="mt-3"></div>

								<div
									class="flex flex-wrap justify-center gap-2"
								>
									<div
										v-for="disciplina in 2"
										class="block justify-center gap-7 w-max text-nowrap text-xs border-2 border-[#9ab69e] rounded-lg overflow-hidden"
									>
										<div
											class="block h-3/6 w-full px-4 bg-[#9ab69e] text-white py-1"
										>
											<span>Redes</span>
										</div>
										<div
											class="block h-3/6 w-full px-4 py-1"
										>
											<span>3°A, 3°B</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Slide>
				<!-- so um text para commitar teste -->
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
	min-height: 300px;
	background-color: #fff;
	border: 2px solid #9ab69e;
	border-radius: 8px;
	overflow: hidden;
}

.slid {
	min-height: 257px;
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

.carousel__prev {
	margin-left: -20px;
}

.carousel__next {
	margin-right: -30px;
}

.image {
	height: 70px;
}
</style>
