<script lang="ts" setup>
interface Props {
	type?: string;

	placeholder?: string;
	required?: boolean;
	disabled?: boolean;

	modelValue?: string;

	inputProps?: any;

	disableTogglePasswordVisibility?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits(['update:modelValue']);

const showPassword = ref(false);

const type = computed(() => {
	if (props.type === 'password') {
		return showPassword.value ? 'text' : 'password';
	}

	return props.type ?? 'text';
});

const isTogglePasswordEnabled = computed(
	() => props.type === 'password' && !props.disableTogglePasswordVisibility
);

const togglePasswordVisibility = () => {
	showPassword.value = !showPassword.value;
};

const value = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit('update:modelValue', value);
	},
});

const inputRef = ref<HTMLInputElement | null>(null);
const containerRef = ref<HTMLDivElement | null>(null);

const inputAttributes = computed(() => {
	return {
		...props.inputProps,
	};
});

const handleContainerClick = () => {
	const input = unref(inputRef);

	if (input) {
		input.focus();
	}
};
</script>

<template>
	<div
		ref="containerRef"
		role="textbox"
		class="ui-text-field"
		@click="handleContainerClick"
	>
		<input
			ref="inputRef"
			v-model="value"
			:placeholder="placeholder"
			:type="type"
			:disabled="disabled"
			:required="required"
			v-bind="inputAttributes"
		/>

		<div class="toggle-password-visibility" v-if="isTogglePasswordEnabled">
			<button
				:disabled="disabled"
				title="Alterar visibilidade deste campo."
				@click="togglePasswordVisibility"
				type="button"
			>
				<IconsEyesEyeOff
					v-if="showPassword"
					class="visibility-icon flex items-center"
				/>
				<IconsEyesEyeOn
					v-if="!showPassword"
					class="visibility-icon flex items-center"
				/>
			</button>
		</div>
	</div>
</template>

<style scoped>
.ui-text-field {
	display: flex;
	flex-direction: row;
	align-items: center;

	gap: 0.5rem;

	padding: 0 1.125rem;

	border-radius: 0.5625rem;
	border: 2px solid #adc5b1;

	cursor: text;

	transition:
		box-shadow 0.05s ease-in-out,
		border 0.085s ease-in-out;
}

.ui-text-field input {
	min-width: auto;
	width: 100%;

	padding: 0.875rem 0;
}

.ui-text-field input:focus {
	outline: none;
}

.ui-text-field:focus-within {
	border-color: #39a048;
	box-shadow: 0px 0px 0.5px 5px #39a0482e;
}

.toggle-password-visibility {
	flex-shrink: 0;

	display: flex;
	align-items: center;
	justify-content: center;
}

.toggle-password-visibility button {
	width: 100%;
	height: 100%;

	padding: 0.25rem;
}

.toggle-password-visibility button:focus {
	outline: 1px dotted;
}

.toggle-password-visibility button:disabled {
	opacity: 0.5;
}

.visibility-icon {
	width: 1.5rem;
	height: 1.5rem;
}
</style>
