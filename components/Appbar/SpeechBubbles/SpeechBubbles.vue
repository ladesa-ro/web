<script setup lang="ts">
import { useElementBounding } from '@vueuse/core';

const props = defineProps<{ notificationsButtonEl: HTMLElement | null }>();
const bubbleEl = ref(null);

const boundingActivator = useElementBounding(props.notificationsButtonEl);

const boundingBubble = useElementBounding(bubbleEl);

const computedPinLeft = computed(() => {
	return (
		boundingActivator.x.value +
		boundingActivator.width.value / 2 -
		boundingBubble.x.value
	);
});
</script>

<template>
	<div ref="bubbleEl" class="chat-bubble bg-white shadow-lg mt-2">
		<div
			class="pin"
			:style="{
				left: `${computedPinLeft}px`,
			}"
		></div>

		<div class="flex flex-col">
			<div class="py-2 px-4">Novo evento gerado.</div>
			<hr />

			<div class="py-2 px-4">O evento IFRO Party foi agendado.</div>

			<hr />

			<div class="py-2 px-4">Novo calendário cadastrado.</div>
		</div>
	</div>
</template>

<style>
.chat-bubble {
	font-weight: bold;

	background-color: #ffffff;

	border: 2px solid #118d3b;

	max-width: 90vw;
	width: 35rem;

	border-radius: 0.625rem;

	position: relative;
}

.pin {
	content: '';
	position: absolute;

	border: 10px solid transparent;
	border-bottom: 10px solid #118d3b;
	top: -20px;

	transform: translateX(-12px);

	width: 20px;
}
</style>
