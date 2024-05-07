<script setup lang="ts">
const props = defineProps({
	searchBarText: String,
});

const $emit = defineEmits(['edit']);

const { searchBarText } = toRefs(props);
const { disciplinas } = await useApiDisciplinasFindAll(searchBarText);
</script>

<template>
	<UIGrid :items="disciplinas">
		<template #item="{ item: disciplina }">
			<UICard
				variant="block"
				:src="`https://luna.sisgha.com/api/disciplinas/${disciplina.id}/imagem/capa`"
			>
				<template #title>
					{{ disciplina.nome }}
				</template>

				<template #actions>
					<SectionDisciplinasModal :editId="disciplina.id" />
				</template>

				<UICardLine>
					<span
						>Carga Horária:
						{{ disciplina.cargaHoraria }} horas.</span
					>
				</UICardLine>
				<UICardLine>
					<span>Abreviação: {{ disciplina.nomeAbreviado }}</span>
				</UICardLine>
			</UICard>
		</template>
	</UIGrid>
</template>
