<script setup lang="ts">
import { ref } from 'vue';
import IconArrow from '~/components/Icons/Arrow/IconArrow.vue';

const selectedOptions = ref();

const options = [
	{ value: 'Domingo' },
	{ value: 'Segunda' },
	{ value: 'Terça' },
	{ value: 'Quarta' },
	{ value: 'Quinta' },
	{ value: 'Sexta' },
	{ value: 'Sábado' },
];

selectedOptions.value = options[1];

let currentDayIndex = ref(1);

const changeDay = (delta: number) => {
	currentDayIndex.value =
		(currentDayIndex.value + delta + options.length) % options.length;

	selectedOptions.value = options[currentDayIndex.value];
};
</script>
<template>
	<v-form class="p-5 overflow-auto">
		<div class="modal">
			<div class="form-header">
				<h1 class="main-title">
					<span>Disponibilidade</span>
				</h1>
			</div>
			<div class="flex justify-between items-center mt-5">
				<IconArrow class="cursor-pointer" @click="changeDay(-1)" />
				<div>
					<span class="font-medium">
						{{ selectedOptions?.value }}
					</span>
				</div>
				<IconArrow
					class="cursor-pointer rotate-180"
					@click="changeDay(1)"
				/>
			</div>

			<v-divider class="my-4" />
			<div class="flex flex-col gap-5">
				<section class="flex justify-between mt-10">
					<div>
						<span>Matutino</span>
						<v-checkbox
							hide-details
							density="compact"
							color="success"
							label="Manhã"
							v-for="i in 7"
							name="disponibilidade"
						/>
					</div>
					<div>
						<span>Vespertino</span>
						<v-checkbox
							hide-details
							density="compact"
							color="success"
							label="Manhã"
							v-for="i in 7"
							name="disponibilidade"
						/>
					</div>
					<div>
						<span>Noturno</span>
						<v-checkbox
							hide-details
							density="compact"
							color="success"
							label="Manhã"
							v-for="i in 7"
							name="disponibilidade"
						/>
					</div>
				</section>
			</div>
		</div>
	</v-form>
</template>

<style scoped>
.modal {
	text-align: center;
}
.main-title {
	font-size: 24px;
	font-weight: 700;
}
</style>
