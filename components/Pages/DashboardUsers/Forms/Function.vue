<template v-slot:search>
	<div class="form-container" @click="handleFormClick">
		<form action="./">
			<label
				id="label"
				class="label"
				for="pesquisar"
				:class="{ 'label-focus': isFormFocused }"
			>
				Função
			</label>
			<div
				class="selected-options"
				:class="{ 'selected-options-active': isSelectOpen }"
				@click="toggleSelect"
			>
				<span class="input" v-if="!selectedOptions.length"
					>Escolha uma opção</span
				>
				<span v-else>{{ selectedOptions.join(', ') }}</span>
				<IconsArrowIconArrow
					class="arrow-icon -icon-black"
					:style="{
						transform: isSelectOpen
							? 'rotate(180deg)'
							: 'rotate(0deg)',
						fill: isFormFocused ? '#00d047' : '#c8dccb',
					}"
				/>
			</div>
			<div v-if="isSelectOpen" class="modal" @click.stop>
				<div
					v-for="option in options"
					:key="option.value"
					@click="handleOptionClick(option)"
				>
					<span>{{ option.label }}</span>
				</div>
			</div>
		</form>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const isSelectOpen = ref(false);
const selectedOptions = ref([]);
const isFormFocused = ref(false);

const options = [
	{ value: 'Dape', label: 'Dape' },
	{ value: 'Professor', label: 'Professor' },
];

const isSelected = (option) => {
	return selectedOptions.value.includes(option.value);
};

const handleOptionClick = (option) => {
	if (selectedOptions.value.includes(option.value)) {
		selectedOptions.value = selectedOptions.value.filter(
			(value) => value !== option.value
		);
	} else {
		selectedOptions.value.push(option.value);
	}
	toggleSelect();
	isFormFocused.value = false;
};

const toggleSelect = () => {
	isSelectOpen.value = !isSelectOpen.value;
};

const handleFormClick = () => {
	isFormFocused.value = !isFormFocused.value;
};
</script>

<style scoped>
.form-container {
	display: flex;
	flex-direction: column;
	position: relative;
	margin-left: 180px;
	margin-top: -81px;
}

.form {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-top: 90px;
	margin-left: 150px;
	width: 490px;
}

.input {
	padding: 3px;
	margin: 3px;
	color: #9ab69e;
	font-size: 12px;
}

.input {
	outline: none;
	border-color: #00d047;
}

.label {
	padding: 4px;
	font-size: 12px;
	font-weight: 600;
	border: 1px solid white;
	background-color: white;
	color: #9ab69e;
	position: absolute;
	width: 60px;
	margin-top: -13px;
	transition:
		border-color 0.3s,
		color 0.3s;
}

.label-focus {
	color: #00d047;
}

.selected-options {
	display: flex;
	gap: 5px;
	align-items: center;
	cursor: pointer;
	border: 3px solid #9ab69e;
	border-radius: 8px;
	padding: 16px;
	width: 190px;
	height: 49px;
	margin-top: 0px;
	transition: border-color 0.3s;
}

.selected-options.active {
	border-color: #00d047;
}

.selected-options-active {
	border-color: #00d047;
}

.icon {
	fill: #c8dccb;
	transition: fill 0.3s;
	cursor: pointer;
}

.icon:hover {
	fill: #00d047;
}

.modal {
	position: absolute;
	top: 100%;
	left: 0;
	background-color: white;
	border: 3px solid #c8dccb;
	border-radius: 8px;
	z-index: 2;
	width: 220px;
	overflow: hidden;
	transition: max-height 0.3s ease-in-out;
}

.modal div {
	display: flex;
	gap: 5px;
	align-items: center;
	cursor: pointer;
	padding: 8px;
}

.arrow-icon {
	position: absolute;
	right: 10px;
}

.arrow-icon:focus {
	fill: #00d047;
	stroke: #00d047;
}
</style>
