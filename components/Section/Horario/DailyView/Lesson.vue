<script setup lang="ts">
import type { ILesson } from './IDailyView';
type Props = {
	lesson: ILesson;
	variant?: 'active' | 'completed';
};
defineProps<Props>();
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
			<p>Horário: {{ lesson.startsAt }} - {{ lesson.endsAt }}</p>
		</section>

		<div v-if="variant === 'active'" class="icon max-w-7">
			<IconsIconClock />
		</div>
	</div>
</template>

<style scoped>
.completed {
	border-color: #9ab69e;
	color: #9ab69e;
}
</style>
