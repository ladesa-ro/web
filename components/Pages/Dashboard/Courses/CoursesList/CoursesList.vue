<script setup>
const $emit = defineEmits(['edit']);

const props = defineProps({
	searchBarText: String,
});

const { searchBarText } = toRefs(props);

const { cursos } = await useApiCursosFindAll(searchBarText);
</script>

<template>
	<UIGrid :items="cursos">
		<template #item="{ item: curso }">
			<UICard
				variant="block"
				:src="`https://luna.sisgha.com/api/cursos/${curso.id}/imagem/capa`"
			>
				<template #title>
					{{ curso.nome }}
				</template>

				<template #actions>
					<!-- deixa sem por enquanto, aqui vai o botão de edit -->
				</template>

				<UICardLine>
					<span>Abreviação: {{ curso.nomeAbreviado }}</span>
				</UICardLine>
				<UICardLine>
					<span>Modalidade: {{ curso.modalidade.nome }}</span>
				</UICardLine>
			</UICard>
		</template>
	</UIGrid>
</template>
