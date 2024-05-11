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

const { blocosDebounced: blocos } = await useApiBlocosFindAll(search);
</script>

<template>
	<VVAutocomplete
		:name="name"
		item-value="id"
		label="Blocos"
		v-bind="$attrs"
		item-title="nome"
		:items="blocos"
		v-model:search="search"
		placeholder="Selecione um bloco"
	/>
</template>
