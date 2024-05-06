<script setup lang="ts">
import { toRefs } from 'vue';

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
});

const { name } = toRefs(props);

const search = ref('');

const { ambientesDebounced: ambientes } = await useApiAmbientesFindAll(search);
</script>

<template>
	<VVAutocomplete
		:name="name"
		item-value="id"
		label="Ambiente"
		v-bind="$attrs"
		item-title="nome"
		:items="ambientes"
		v-model:search="search"
		placeholder="Selecione um ambiente"
	/>
</template>
