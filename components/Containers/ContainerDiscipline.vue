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
				<v-card class="-card-bloco border-2 divide-solid border-lime-500 rounded-lg overflow-hidden pb-5 mx-auto" max-width="100%">
					<v-img
            :src="imagemSrc"
						height="120px"
						width="100%"
						cover
					></v-img>
					<div class="flex justify-between items-center">
						<v-card-title class="-card-titulo whitespace-nowrap text-black no-underline">
              {{ mensagem }}
						</v-card-title>
						<IconEdit class="cursor-pointer z-10 mr-10" />
					</div>
					<v-card-subtitle class="edit-02 block font-medium">
            {{ abreviacao }}
					</v-card-subtitle>
					<v-card-subtitle class="edit-02 font-medium">
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
}

.-card-titulo {
	font-weight: 600;
}
.edit-02 {
  color: #9ab69e;
  font-weight: 500;
  opacity: 1 !important;
}
</style>
