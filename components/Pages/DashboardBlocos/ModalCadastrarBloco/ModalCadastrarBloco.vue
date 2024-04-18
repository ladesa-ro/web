<script lang="ts" setup>
import { useQueryClient } from '@tanstack/vue-query';
import { useForm } from 'vee-validate';
import { reactive } from 'vue';

let isActive = ref(false);

const formValues = reactive({
	nome: '',
	nomeAbreviado: '',
	campus: {
		id: undefined,
	},
	cursos: [
		{
			id: undefined,
		},
	],
});

const campiLista = '';
const cursosLista = '';
</script>

<template>
	<v-dialog max-width="500" v-model="isActive">
		<template v-slot:activator="{ props: activatorProps }">
			<UIButtonAdd v-bind="activatorProps" />
		</template>

		<!-- Form -->
		<template v-slot:="{ isActive }">
			<v-card class="-estilo-dialogo">
				<v-form class="flex text-center flex-col p-8 overflow-hidden">
					<div class="mb-6">
						<h1 class="font-bold text-lg sm:text-xl lg:text-2xl">Cadastrar Novo Bloco</h1>
					</div>

					<!-- Inputs -->
					<div class="flex flex-col gap-6 overflow-auto">
						<PagesDashboardCoursesFormsSelectCourseImage />

						<VVTextField
							v-model="formValues.nome"
							type="text"
							label="Nome"
							placeholder="Digite aqui"
							name="nome"
						/>

						<VVTextField
							v-model="formValues.nomeAbreviado"
							type="text"
							label="Nome Abreviado"
							placeholder="Digite aqui"
							name="nomeAbreviado"
						/>

						<VVAutocomplete
							v-model="formValues.campus.id"
							name="campus.id"
							label="Campus"
							placeholder="Selecione o campus"
							:items="campiLista"
							item-title="apelido"
							item-value="id"
						/>

						<VVAutocomplete
							multiple
							v-model="formValues.cursos[0].id"
							name="curso.id"
							label="Cursos"
							placeholder="Selecione o curso"
							:items="cursosLista"
							item-title="apelido"
							item-value="id"
						/>
					</div>

					<!-- Submits -->
					<div class="-form-submit-buttons mt-6 flex justify-between flex-wrap">
						<VBtn
							type="button"
							color="#e9001c"
							variant="outlined"
							@click="isActive.value = false"
							class="-button-submit"
						>
							<span>Cancelar</span>
							<v-icon class="ml-2" color="#e9001c" icon="mdi-close"></v-icon>
						</VBtn>
						
						<VBtn
						type="submit"
							color="#00d047"
							variant="outlined"
							class="-button-submit"
							>
							<span>Cadastrar</span>
							<v-icon class="ml-2" color="#00d047" icon="mdi-check"></v-icon>
						</VBtn>
					</div>
				</v-form>
			</v-card>
		</template>
	</v-dialog>
</template>

<style scoped>

.-estilo-dialogo {
	border-radius: 14px !important;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border: solid 2px #9ab69e;
}

.-form-submit-buttons {
	gap: 20px;
}

.button {
	font-weight: 700;
	margin-top: 20px;
	cursor: pointer;
	border: none;
}

.v-btn.-button-submit {
	padding: 6px 20px;
	border-radius: 8px;
	height: auto;
	text-transform: none;
}

@media screen and (max-width: 450px) {
	.-form-submit-buttons {
		flex-direction: column;
		gap: 10px;
	}

	.v-btn.-button-submit {
		padding: 6px 20px;
	}
}
</style>
