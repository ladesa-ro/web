<script setup lang="ts">
import SelectBase from '~/components/UI/SelectBase/SelectBase.vue';

const roles = [
	{ value: 'professor', label: 'Professor' },
	{ value: 'dape', label: 'DAPE' },
];
</script>

<template>
	<SelectBase
		multiple
		:items="roles"
		item-value="value"
		item-title="label"
		label="Função"
		placeholder="Selecione"
		:clearable="false"
	/>
</template>
