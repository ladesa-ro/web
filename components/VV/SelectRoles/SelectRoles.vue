<script setup lang="ts">
import { useField } from 'vee-validate';
import { toRefs } from 'vue';

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
});

const { name } = toRefs(props);

const {
	handleBlur,
	errorMessage,
	value: modelValue,
} = useField(name.value, undefined, {
	validateOnValueUpdate: true,
});
</script>

<template>
	<UISelectRoles
		:name="name"
		v-bind="$attrs"
		@blur="handleBlur"
		hide-details="auto"
		persistent-placeholder
		v-model:value="modelValue"
		:error-messages="errorMessage ? [errorMessage] : []"
	/>
</template>
