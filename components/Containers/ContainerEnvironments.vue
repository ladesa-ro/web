<script lang="ts" setup>
import IconEdit from '~/components/Icons/IconEdit.vue';

const props = defineProps({
	searchBarText: String,
});

const { searchBarText } = toRefs(props)

const { ambientes } = await useApiAmbientesFindAll(searchBarText);

const $emit = defineEmits(['edit']);

const edicaoAmbiente = ref(null);

const editarAmbiente = (id: string) => {

}

</script>

<template>
	<UIGrid :items="ambientes">
		<template #item="{ item:  ambiente}">
			<UICard variant="block" :src="`https://luna.sisgha.com/api/ambientes/${ambiente.id}/imagem/capa`">
				<template #title>
					{{ ambiente.nome }}
				</template>

				<template #actions>
					<!-- deixa sem por enquanto, aqui vai o botão de edit -->
				</template>

				<UICardLine>
					{{ ambiente.bloco.nome }}
				</UICardLine>
				<UICardLine>
					Capacidade: {{ ambiente.capacidade + " pessoas"}}
				</UICardLine>
			</UICard>
		</template>
	</UIGrid>
</template>
