<script setup lang="ts">
const props = defineProps({
	searchBarText: String,
});

const $emit = defineEmits(['edit']);

const { searchBarText } = toRefs(props);

const { blocos } = await useApiBlocosFindAll(searchBarText);
</script>

<template>
	<UIGrid :items="blocos">
		<template #item="{ item: bloco }">
			<UICard
				variant="block"
				:src="`https://luna.sisgha.com/api/blocos/${bloco.id}/imagem/capa?imgCapa=${bloco.imagemCapa?.id}`"
			>
				<template #title>
					{{ bloco.nome }}
				</template>

				<template #actions>
					<SectionBlocosModal :editId="bloco.id" />
				</template>

				<UICardLine>
					<span>{{ bloco.nome }} - {{ bloco.codigo }}</span>
				</UICardLine>

				<UICardLine>
					<span>{{ bloco.campus.apelido }} </span>
				</UICardLine>
			</UICard>
		</template>
	</UIGrid>
</template>
