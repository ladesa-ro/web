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

type EventItem = Event & {
	details: string;
};

// Props
const props = defineProps({
	steps: Array<Step>,
	events: Array<Event>,
});

// Set event data
let allEventsItems = ref<EventItem[]>([
	{
		id: '',
		name: '',
		details: '',
		locale: '',
		color: '',
		startDate: '',
		endDate: '',
	},
]);

async function setEvents(): Promise<void> {
	try {
		// Set all events
		async function setAllItems(): Promise<boolean> {
			allEventsItems.value = [];

			// Set steps
			try {
				for (let i = 0; i < props.steps!.length; i++) {
					allEventsItems.value.push({
						id: props.steps![i].id,
						name: `${props.steps![i].number}° Etapa`,
						details: `Este evento começa dia ${dayjs(
							dayjs(props.steps![i].startDate).toDate()
						).format('DD/MM')} e termina em ${dayjs(
							dayjs(props.steps![i].endDate).toDate()
						).format('DD/MM')}.`,
						locale: ``,
						color: props.steps![i].color,
						startDate: props.steps![i].startDate,
						endDate: props.steps![i].endDate,
					});
				}

				// Set events
				for (let i = 0; i < props.events!.length; i++) {
					allEventsItems.value.push({
						id: props.events![i].id,
						name: props.events![i].name,
						details: `Este evento começa dia ${dayjs(
							dayjs(props.events![i].startDate).toDate()
						).format('DD/MM')} e termina em ${dayjs(
							dayjs(props.events![i].endDate).toDate()
						).format('DD/MM')}.`,
						locale: props.events![i].locale,
						color: props.events![i].color,
						startDate: props.steps![i].startDate,
						endDate: props.steps![i].endDate,
					});
				}

				return true;
			} catch (error) {
				return false;
			}
		}

		// Calling internal functions
		await setAllItems();

		// Order list by date
		allEventsItems.value = allEventsItems.value.slice().sort((a, b) => {
			// Save diff dates
			const date1 = dayjs(a.startDate).diff(dayjs().toDate());
			const date2 = dayjs(b.startDate).diff(dayjs().toDate());

			return date1 - date2;
		});
	} catch (error) {}
}

onMounted(async () => {
	// Calling functions
	await setEvents();
});
</script>

<template>
	<div class="flex flex-col gap-2 overflow-y-auto w-[464px] h-[496px]">
		<PagesDashboardCalendarEvent
			v-for="(event, index) in allEventsItems"
			:name="event.name"
			:details="event.details"
			:locale="event.locale"
			:color="event.color"
		/>
	</div>
</template>

<style scoped></style>
