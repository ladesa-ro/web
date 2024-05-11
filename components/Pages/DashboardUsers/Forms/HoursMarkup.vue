<script setup>
const allBackground = ref(null);
const individualBackgrounds = ref(Array(6).fill(null));
const icons = ['07:30', '08:20', '09:10', '10:20', '11:10', '12:00'];

const toggleBackgroundColor = (index) => {
	if (index === 'all') {
		allBackground.value =
			allBackground.value === '#118D3B' ? null : '#118D3B';
		individualBackgrounds.value = individualBackgrounds.value.map(() =>
			allBackground.value ? allBackground.value : null
		);
	} else {
		allBackground.value = null;
		individualBackgrounds.value[index] =
			individualBackgrounds.value[index] === '#118D3B' ? null : '#118D3B';
	}
};
</script>

<template>
	<div>
		<section class="hours">
			<div class="bx">
				<IconsIconMarkup
					class="svgMarkup"
					@click="toggleBackgroundColor('all')"
					:style="{ backgroundColor: allBackground }"
				/>
				<span>Todos</span>
			</div>
			<div v-for="(icon, index) in icons" :key="index" class="bx">
				<span>{{ icon }}</span>
			</div>
		</section>
	</div>
</template>

<style scoped>
.hours {
	display: flex;
	flex-direction: column;
}

.bx {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin-bottom: 10px;
}

.bx span {
	margin-left: 8px;
}

.svgMarkup {
	border-radius: 3px;
}
</style>
