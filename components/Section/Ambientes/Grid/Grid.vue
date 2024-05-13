<script lang="ts" setup>
const props = defineProps({
	searchBarText: String,
});

const $emit = defineEmits(['edit']);

const { searchBarText } = toRefs(props);

const { ambientes } = await useApiAmbientesFindAll(searchBarText);
</script>

<template>
	<UIGrid :items="ambientes">
		<template #item="{ item: ambiente }">
			<UICard
				variant="block"
				:src="`https://luna.sisgha.com/api/ambientes/${ambiente.id}/imagem/capa?imgCapa=${ambiente.imagemCapa?.id}`"
			>
				<template #title>
					{{ ambiente.nome }}
				</template>	

				<template #actions>
          <SectionAmbientesModal :editId="ambiente.id" />
				</template>

				<UICardLine>
					{{ ambiente.bloco.nome }}
				</UICardLine>
				<UICardLine>
					Capacidade: {{ ambiente.capacidade }} pessoas
				</UICardLine>
			</UICard>
		</template>
	</UIGrid>
</template>
