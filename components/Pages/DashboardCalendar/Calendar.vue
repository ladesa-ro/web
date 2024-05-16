<script lang="ts" setup>
// Interface and types
type Step = {
	id: string;
	number: number;
	startDate: string;
	endDate: string;
	color: string;
};

type Event = {
	id: string;
	name: string;
	startDate: string;
	endDate: string;
	color: string;
};

type CalendarDates = {
	steps: Array<Step>;
	events: Array<Event>;
};

// Props
const props = defineProps({});

const years = [2024, 2023, 2022, 2021, 2020, 2019];

const etapas: Array<Step> = [
	{
		id: '0',
		number: 0,
		startDate: '2024-02-01',
		endDate: '2024-03-23',
		color: '#0092E4',
	},
	{
		id: '0',
		number: 0,
		startDate: '2024-03-24',
		endDate: '2024-05-14',
		color: '#2DAC0D',
	},
	{
		id: '0',
		number: 0,
		startDate: '2024-05-15',
		endDate: '2024-08-09',
		color: '#D1A300',
	},
	{
		id: '1',
		number: 1,
		startDate: '2024-08-10',
		endDate: '2024-12-31',
		color: '#D7004D',
	},
];
const eventos: Array<Event> = [
	{
		id: '0',
		name: 'Bang',
		startDate: '2024-05-15',
		endDate: '2024-05-22',
		color: '#B51B2A',
	},
];

const datesDuration: CalendarDates = {
	steps: etapas,
	events: eventos,
};
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
					<PagesDashboardCalendarMonth
						:year="2024"
						:calendar-dates="datesDuration"
					/>

					<PagesDashboardCalendarEvent />
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
