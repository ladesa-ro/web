<script lang="ts" setup>
// Import

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
	locale: string;
};

// Props
const props = defineProps({});

// Calendar and events
// Years
const years = [2024, 2023, 2022, 2021, 2020, 2019];

// Event and steps (For example. Remove in other moment)
const stepItems: Array<Step> = [
	{
		id: '1',
		number: 1,
		startDate: '2024-02-08',
		endDate: '2024-03-23',
		color: '#0092E4',
	},
	{
		id: '2',
		number: 2,
		startDate: '2024-03-24',
		endDate: '2024-05-14',
		color: '#2DAC0D',
	},
	{
		id: '3',
		number: 3,
		startDate: '2024-05-15',
		endDate: '2024-07-09',
		color: '#D1A300',
	},
	{
		id: '4',
		number: 4,
		startDate: '2024-08-10',
		endDate: '2024-11-28',
		color: '#D7004D',
	},
];
const eventItems: Array<Event> = [
	{
		id: '1',
		name: 'IFRO Party',
		startDate: '2024-05-15',
		endDate: '2024-05-22',
		locale: 'Refeitório',
		color: '#B51B2A',
	},
];

// Functions

// Month num (get emitted value)
let monthNumReceived = ref<number>(0);

const handleUpdate = (v: number) => {
	monthNumReceived.value = v;
};

watch(monthNumReceived, (newValue: number) => {
	if (newValue !== null) {
		monthNumReceived.value = newValue;
	}
});
</script>

<template>
	<v-container>
		<div class="container">
			<div class="flex justify-center w-full h-auto">
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
				<div
					class="grid grid-cols-1 xl:grid-cols-2 gap-6 w-auto xl:w-full"
				>
					<!-- Month selected -->
					<PagesDashboardCalendarMonth
						:year="2024"
						:steps="stepItems"
						:events="eventItems"
						:toggle-month="true"
						@custom:month-num="handleUpdate"
					/>

					<!-- Event list -->
					<PagesDashboardCalendarEventList
						:year="2024"
						:steps="stepItems"
						:events="eventItems"
						:month-num="monthNumReceived"
					/>
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
