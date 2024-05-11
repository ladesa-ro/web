<script setup lang="ts">
import { toRefs } from 'vue';

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
});

const search = ref('');

const { name } = toRefs(props);

const { modalidadeDebounced: modalidade } = await useApiModalitiesFindAll(search);
</script>

<template>
	<VVAutocomplete
		:name="name"
		label="Modalidades"
		:items="modalidade"
		v-bind="$attrs"
		item-value="id"
		item-title="nome"
		v-model:search="search"
		placeholder="Selecione uma modalidade"
	/>
</template>
