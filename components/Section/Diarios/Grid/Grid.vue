<script setup lang="ts">
const props = defineProps({
	searchBarText: String,
});

const $emit = defineEmits(['edit']);

const { searchBarText } = toRefs(props);
const { diarios } = await useApiDiariosFindAll(searchBarText);
</script>

<template>
	<UIGrid :items="diarios">
		<template #item="{ item: diario}">
			<UICard
				variant="block"
				:src="`https://luna.sisgha.com/api/disciplinas/${diario.id}/imagem/capa?imgCapa=${diario.imagemCapa?.id}`"
			>
				<template #title>
					{{ diario.disciplina.nome}}
				</template>

				<template #actions>
					<SectionDisciplinasModal :editId="diario.id" />
				</template>

				<UICardLine>
					<span
						>Turmas: 
						{{ diario.turma.periodo }} - {{ diario.turma.curso.modalidade.nome }}</span
					>
				</UICardLine>
				<UICardLine>
					<span>Professor: {{  }}</span>
				</UICardLine>
			</UICard>
		</template>
	</UIGrid>
</template>
