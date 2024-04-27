<script setup>
import { defineProps } from 'vue';
import IconEdit from '~/components/Icons/IconEdit.vue';

const props = defineProps({
	searchBarText: String,
});

const { searchBarText } = toRefs(props)

const { disciplinas } = await useApiDisciplinasFindAll(searchBarText);
</script>

<template v-slot:search="{ value }">
	<v-container class="">
		<v-row v-if="disciplinas">
			<v-col v-for="disciplina in disciplinas" cols="12" sm="6" md="4" lg="4" class="px-2">
				<v-card class="-card-bloco border-2 divide-solid border-lime-500 rounded-lg overflow-hidden pb-5 mx-auto" max-width="100%">
					<v-img src="https://picsum.photos/487/120" height="120px" width="100%" cover></v-img>
					<div class="textAndButton flex justify-between items-center max-w-full">
						<v-card-title class="-card-titulo
						font-semibold text-black no-underline inline-block max-w-[90%] overflow-hidden">
              {{ disciplina.nome }}
						</v-card-title>
            <IconEdit class="detail" />
					</div>
					<v-card-subtitle class="edit-02 block font-medium !opacity-100">
            N/A
					</v-card-subtitle>
					<v-card-subtitle class="edit-02 block font-medium !opacity-100">
            N/A
					</v-card-subtitle>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<style scoped>
.-card-bloco {
	/* adicionado borda. */
	border: 2px solid #9ab69e;
}
.detail {
  cursor: pointer;
  z-index: 10;
  margin-right: 10px;
}
.-card-titulo {
	font-weight: 600;
}
.edit-02 {
  color: #9ab69e;
  font-weight: 500;
}
</style>
