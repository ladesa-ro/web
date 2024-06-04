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

const { disciplinasDebounced: disciplinas } = await useApiDisciplinasFindAll(search);
</script>

<template>
	<VVAutocomplete
		:name="name"
		label="Disciplinas disponíveis"
		:items="disciplinas"
		v-bind="$attrs"
		item-value="id"
		item-title="nome"
		v-model:search="search"
		placeholder="Selecione uma disciplina"
	/>
</template> 
