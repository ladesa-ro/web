<script lang="ts" setup>
import { ref } from 'vue';
import caminhoDaImagem from "~/assets/Foto.png";

const show = ref(false);

const mensagemDoPai = ref("Linguagem e Lógica de Programação");
const abre = "Abreviação: L. L. Prog.";
const niv = "Modalidade: Técnico Integrado";

const caminhoDaImagem2 = "https://tse1.mm.bing.net/th?id=OIP.lKoTmKPpWT-qSlTLmlIwwgHaEK&pid=Api&P=0&h=180";
const mensagemDoPai2 = ref("Matemática");
const abre2 = "Abreviação: Mat.";
const niv2 = "Modalidade: Técnico Integrado";

const caminhoDaImagem3 = "https://tse4.mm.bing.net/th?id=OIP.-eVHxNSXqiqHdFy8tlPlJAHaFj&pid=Api&P=0&h=180";
const mensagemDoPai3 = ref("Português");
const abre3 = "Abreviação: Port.";
const niv3 = "Modalidade: Técnico Integrado";

let searchBarText = ref('');
</script>

<template>
	<v-container>
		<div class="container mx-auto max-w-[89%]">
			<div>
				<div class="container-header mx-auto justify-between items-center flex mb-5 gap-4 px-3">
					<UISearchBar
						:value="searchBarText"
						@update:value="searchBarText = $event"
					/>

					<div class="flex items-center flex-shrink-0">
						<ModaisModalNewDiscipline/>
					</div>
				</div>
				<div class="-card-bloco-geral">
					<ContainersContainerDiscipline 
          :imagemSrc="caminhoDaImagem3"
          :mensagem="mensagemDoPai"
          :abreviacao="abre"
          :nivel="niv"  
          />
				</div>
			</div>
		</div>
	</v-container>
</template>

<style scoped>
.container-header {
	padding: 50px 0;
}
</style>
