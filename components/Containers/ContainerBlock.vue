<script setup>
import IconEdit from '~/components/Icons/IconEdit.vue';

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
			<UICard variant="block" :src="`https://luna.sisgha.com/api/blocos/${bloco.id}/imagem/capa`">
				<template #title>
					{{ bloco.nome }}
				</template>

				<template #actions>
					<!-- deixa sem por enquanto, aqui vai o botão de edit -->
				</template>

				<UICardLine>
					<span>{{  bloco.campus.apelido }} horas.</span>
				</UICardLine>
			</UICard>
		</template>
	</UIGrid>
</template>
