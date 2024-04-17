<script setup>
import { defineProps } from 'vue';
import IconEdit from '~/components/Icons/IconEdit.vue';

const props = defineProps({
	searchBarText: String,
});

const { searchBarText } = toRefs(props);
</script>

<template v-slot:search="{ value }">
	<v-container class="">
		<v-row>
			<v-col cols="12" sm="6" md="4" lg="4" class="px-2">
				<v-card class="-card-bloco mx-auto" max-width="100%">
					<v-img
						src="https://picsum.photos/487/120"
						height="120px"
						width="100%"
						cover
					></v-img>
					<div class="-textos-e-botoes">
						<v-card-title class="-card-titulo">
							Bloco de Carros
						</v-card-title>
						<IconEdit class="-detalhes" />
					</div>
					<v-card-subtitle class="">
						Abreviação: Bl. Carros
					</v-card-subtitle>
					<v-card-subtitle class="">
						Curso: Téc. Bob.
					</v-card-subtitle>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<style scoped>
.courses {
	display: flex;
	flex-wrap: wrap;
	column-gap: 30px;
	row-gap: 25px;
}

.-textos-e-botoes {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.-detalhes {
	cursor: pointer;
	z-index: 10;
	margin-right: 10px;
}

.-card-bloco {
	border: 2px solid #9ab69e;
	border-radius: 8px;
	overflow: hidden;
	padding-bottom: 20px;
}

.-card-titulo {
	white-space: nowrap;
	font-weight: 600;
	color: black;
	text-decoration: none;
}
</style>
