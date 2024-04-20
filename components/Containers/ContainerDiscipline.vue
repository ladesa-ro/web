<script setup>
import { defineProps } from 'vue';
import IconEdit from '~/components/Icons/IconEdit.vue';

const props = defineProps({
	searchBarText: String,
  imagemSrc: String,
  mensagem: String,
  abreviacao: String,
  nivel: String,
});

const { searchBarText } = toRefs(props);
const { imagemSrc, mensagem, abreviacao, nivel } = props;
</script>

<template v-slot:search="{ value }">
	<v-container class="">
		<v-row>
			<v-col cols="12" sm="6" md="4" lg="4" class="px-2">
				<v-card class="-card-bloco mx-auto" max-width="100%">
					<v-img
            :src="imagemSrc"
						height="120px"
						width="100%"
						cover
					></v-img>
					<div class="flex justify-between items-center">
						<v-card-title class="-card-titulo">
              {{ mensagem }}
						</v-card-title>
						<IconEdit class="cursor-pointer z-10 mr-10" />
					</div>
					<v-card-subtitle class="">
            {{ abreviacao }}
					</v-card-subtitle>
					<v-card-subtitle class="">
            {{ nivel }}
					</v-card-subtitle>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<style scoped>

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
