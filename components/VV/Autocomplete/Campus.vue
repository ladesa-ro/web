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

const { campiDebounced: campi } = await useApiCampusFindAll(search);
</script>

<template>
	<VVAutocomplete
		:name="name"
		item-value="id"
		item-title="apelido"
		label="Campus"
		v-bind="$attrs"
		:items="campi"
		v-model:search="search"
		placeholder="Selecione um Campus"
	/>
</template>
