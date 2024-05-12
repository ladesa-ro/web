<script lang="ts" setup>
const props = defineProps({});

const years = [2024, 2023, 2022, 2021, 2020, 2019];

type Step = {
	id: string;
	number: number;
	startDate: string;
	endDate: string;
	color: string;
};

const etapas = ref<Step[]>([
	{
		id: '0',
		number: 0,
		startDate: '2024-01-01',
		endDate: '2024-05-14',
		color: '#4830DB',
	},
	{
		id: '1',
		number: 1,
		startDate: '2024-05-15',
		endDate: '2024-12-31',
		color: '#1C5A4F',
	},
]);
</script>

<template>
	<v-container>
		<div class="container">
			<div>
				<!-- Select calendar -->
				<!-- <div class="container-header w-3/6 flex gap-4 m-auto mb-5 justify-center items-center px-3">
					<VVAutocomplete
						name="year.id"
						label="Ano letivo"
						placeholder="Selecione um ano"
						:items="years"
					/>
				</div> -->

				<!-- Content -->
				<div class="flex justify-center items-center w-full h-full">
					<PagesDashboardCalendarMonth :year="2024" />

					<!-- <v-card class="-month mx-auto rounded-lg" max-width="500px">
						
					</v-card> -->
				</div>
			</div>
		</div>
	</v-container>
</template>

<style scoped>
.container {
	margin: 0 auto;
	max-width: 89%;
}

.container-header {
	padding: 50px 0;
}

.container-header-actions {
	flex-shrink: 0;

	display: flex;
	align-items: center;
}
</style>
