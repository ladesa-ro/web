<script setup lang="ts">
const props = defineProps({
	searchBarText: String,
});

const $emit = defineEmits(['edit']);

const { searchBarText } = toRefs(props);
const { turmas } = await useApiTurmasFindAll(searchBarText);
</script>

<template>
	<UIGrid :items="turmas">
		<template #item="{ item: turma }">
			<UICard
				variant="block"
				@edit="$emit('edit', turmas.id)"
				src="https://picsum.photos/487/120"
			>
				<template #title>
					{{ turma.periodo }} - {{ turma.curso.modalidade.nome }}
				</template>

				<template #actions>
					<SectionTurmasModal :editId="turma.id" />
				</template>

				<UICardLine>
					<span>Curso: {{ turma.curso.nomeAbreviado }}</span>
				</UICardLine>
				<UICardLine>
					<span>Turno: Matutino e Vespertino</span>
				</UICardLine>
			</UICard>
		</template>
	</UIGrid>
</template>
