<script lang="ts" setup>
// Import
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import isBetween from 'dayjs/plugin/isBetween';

// Dayjs config
dayjs.locale('pt-br');
dayjs.extend(isBetween);

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

type EventItem = Omit<Event, 'startDate' | 'endDate'> & {
	details: string;
};

type CalendarDates = {
	steps: Array<Step>;
	events: Array<Event>;
};

// Props
const props = defineProps({});

// Calendar and events
// Years
const years = [2024, 2023, 2022, 2021, 2020, 2019];

// Event and steps
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

const datesDuration = ref<CalendarDates>({
	steps: stepItems,
	events: eventItems,
});

// Set event data
let allEventsItems = ref<EventItem[]>([
	{
		id: '',
		name: '',
		details: '',
		locale: '',
		color: '',
	},
]);

async function setEvents(): Promise<void> {
	try {
		// Set steps
		async function setAllItems(): Promise<boolean> {
			allEventsItems.value = [];

			try {
				for (let i = 0; i < datesDuration.value.steps!.length; i++) {
					allEventsItems.value.push({
						id: datesDuration.value.steps![i].id,
						name: `${datesDuration.value.steps![i].number}° Etapa`,
						details: `Este evento começa dia ${dayjs(
							dayjs(
								datesDuration.value.steps![i].startDate
							).toDate()
						).format('DD/MM')} e termina em ${dayjs(
							dayjs(
								datesDuration.value.steps![i].endDate
							).toDate()
						).format('DD/MM')}.`,
						locale: ``,
						color: datesDuration.value.steps![i].color,
					});
				}

				// Set events
				for (let i = 0; i < datesDuration.value.events!.length; i++) {
					allEventsItems.value.push({
						id: datesDuration.value.events![i].id,
						name: datesDuration.value.events![i].name,
						details: `Este evento começa dia ${dayjs(
							dayjs(
								datesDuration.value.events![i].startDate
							).toDate()
						).format('DD/MM')} e termina em ${dayjs(
							dayjs(
								datesDuration.value.events![i].endDate
							).toDate()
						).format('DD/MM')}.`,
						locale: datesDuration.value.events![i].locale,
						color: datesDuration.value.events![i].color,
					});
				}

				return true;
			} catch (error) {
				return false;
			}
		}

		// Calling internal functions
		await setAllItems();
	} catch (error) {}
}

onMounted(async () => {
	// Calling functions
	await setEvents();
	console.log(allEventsItems.value[0]);
});
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
						:toggle-month="true"
					/>

					<div
						class="flex flex-col gap-2 overflow-y-auto w-[464px] h-[496px]"
						max-width="500px"
					>
						<PagesDashboardCalendarEvent
							v-for="(event, index) in allEventsItems"
							:name="event.name"
							:details="event.details"
							:locale="event.locale"
							:color="event.color"
						/>
					</div>
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
