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

type EventItem = Omit<Event, 'locale'> & {
	details: string;
	locale?: string;
};

// Props
const props = defineProps({
	year: Number,
	steps: Array<Step>,
	events: Array<Event>,
	monthNum: Number,
});

// Set event data
let allEventsItems = ref<EventItem[]>([
	{
		id: '',
		name: '',
		details: '',
		color: '',
		startDate: '',
		endDate: '',
	},
]);

async function setEvents(): Promise<void> {
	try {
		// Push in 'EventItems' array
		async function pushItemInList(
			Id: string,
			Name: string,
			StartDate: string,
			EndDate: string,
			Color: string,
			Locale?: string
		): Promise<void> {
			try {
				allEventsItems.value.push({
					id: Id,
					name: Name,
					details: `Este evento começa dia ${dayjs(
						dayjs(StartDate).toDate()
					).format('DD/MM')} e termina em ${dayjs(
						dayjs(EndDate).toDate()
					).format('DD/MM')}.`,
					color: Color,
					locale: Locale,
					startDate: StartDate,
					endDate: EndDate,
				});
			} catch (error) {}
		}

		// Set all events
		async function setAllItems(): Promise<boolean> {
			allEventsItems.value = [];

			try {
				// Set steps
				for (let i = 0; i < props.steps!.length; i++) {
					await pushItemInList(
						props.steps![i].id,
						`${props.steps![i].number}° Etapa`,
						props.steps![i].startDate,
						props.steps![i].endDate,
						props.steps![i].color
					);
				}

				// Set events
				for (let i = 0; i < props.events!.length; i++) {
					await pushItemInList(
						props.events![i].id,
						props.events![i].name,
						props.events![i].startDate,
						props.events![i].endDate,
						props.events![i].color,
						props.events![i].locale
					);
				}

				return true;
			} catch (error) {
				return false;
			}
		}

		// Order list by date
		async function OrderList(): Promise<boolean> {
			try {
				// Order
				allEventsItems.value = allEventsItems.value
					.slice()
					.sort((a, b) => {
						// Save diff dates
						const date1 = dayjs(a.endDate).diff(dayjs().toDate());
						const date2 = dayjs(b.endDate).diff(dayjs().toDate());

						// Remove before events
						return date1 - date2;
					});

				// Order events by month
				const firstDayOfMonth = dayjs(
					`${props.year!}-${props.monthNum! + 1}-01`
				);

				allEventsItems.value = allEventsItems.value.filter(
					(event) =>
						(dayjs(event.startDate) >=
							firstDayOfMonth.startOf('month') ||
							dayjs(event.endDate) >=
								firstDayOfMonth.startOf('month')) &&
						dayjs(event.startDate) <= firstDayOfMonth.endOf('month')
				);
				return true;
			} catch (error) {
				return false;
			}
		}

		// Calling internal functions
		await setAllItems();
		await OrderList();
	} catch (error) {}
}

onMounted(async () => {
	// Calling functions
	await setEvents();
});

watch(
	() => props.monthNum!,
	(newValue: number) => {
		if (newValue !== null) {
			setEvents();
		}
	}
);
</script>

<template>
	<div
		class="-custom-scrollbar flex flex-col gap-2 overflow-y-auto w-[464px] h-[496px]"
	>
		<PagesDashboardCalendarEvent
			v-for="(event, index) in allEventsItems"
			:id="event.id"
			:key="event.id"
			:name="event.name"
			:details="event.details"
			:locale="event.locale"
			:color="event.color"
		/>
	</div>
</template>

<style scoped>
.-custom-scrollbar::-webkit-scrollbar {
	width: 0px;
}
</style>
