<script setup lang="ts">
import dayjs from '../../-Helpers/dayjs';
import type { ILesson } from '../../-Helpers/ILesson';

type Props = {
	lesson: ILesson;
	startTime: string;
	// variant?: 'active' | 'completed';
};
const props = defineProps<Props>();

const timeClass: string = props.startTime;
const splitString: string[] = timeClass.split(':');
const hr = Number(splitString[0]);
const min = Number(splitString[1]);

// const diaAula: dayjs.Dayjs = dayjs();
const start: dayjs.Dayjs = dayjs().hour(hr).minute(min).second(0);
const end: dayjs.Dayjs = start.add(50, 'minutes'); //add 50 minutes to the class start time

function verifyClassStatus(start: dayjs.Dayjs, end: dayjs.Dayjs) {
    const now = dayjs().hour(9);
	if (now > end) return 'completed';
	else if (now >= start && now < end) return 'active';
	return;
}

const variant = verifyClassStatus(start, end);
</script>

<template>
	<div
		class="flex flex-row items-center justify-between border-2 border-[#118D3B] rounded-lg px-5 py-3"
		:class="{ completed: variant === 'completed' }"
	>
		<section class="flex flex-col justify-between">
			<h1 class="font-[600]">
				{{ lesson.discipline }} - {{ lesson.class }}
			</h1>
			<p>Ambiente: {{ lesson.environment }}</p>
			<p>Horário: {{ start.format('HH:mm') }} - {{ end.format('HH:mm') }}</p>
		</section>

		<IconsIconClock 
			v-if="variant === 'active'"
			class="icon max-w-8"
		/>
	</div>
</template>

<style scoped>
.completed {
	border-color: #9ab69e;
	color: #9ab69e;
}
</style>
