<script lang="ts" setup defer>
import { useQueryClient } from '@tanstack/vue-query';
import { useForm } from 'vee-validate';
import { reactive } from 'vue';
import * as yup from 'yup';
import { useApiCampusFindAll } from '~/composables/api/campus';
import { useApiBlocosFindAll } from '~/composables/api/blocos';

const props = defineProps({
	id: String,
});

const { id } = toRefs(props);

const { ambiente } = await useApiAmbienteFindOne(id);

const queryClient = useQueryClient();
const apiClient = useApiClient();

let isActive = ref(false);

const initialFormValues = reactive({
	imagem: null,
	id: null as string | null,
	nome: '',
	descricao: '',
	codigo: '',
	capacidade: '',
	tipo: '',
	bloco: {
		id: undefined as undefined | string,
	},
});

const fillValuesFromExistent = () => {
	const valores = unref(ambiente);

	if (valores) {
		formValues.id = valores.id;
		formValues.nome = valores.nome;
		formValues.descricao = valores.descricao;
		formValues.codigo = valores.codigo;
		formValues.capacidade = valores.capacidade ?? '';
		formValues.tipo = valores.tipo ?? '';
		formValues.bloco.id = valores.bloco?.id;
	}
};

fillValuesFromExistent();

const schema = yup.object().shape({
	imagem: yup.mixed(),
	nome: yup.string().required('Nome é obrigatório!'),
	descricao: yup.string().required('Descrição é obrigatório!'),
	codigo: yup.string().required('Código é obrigatório!'),
	capacidade: yup.number().required('Capacidade é obrigatório!'),
	bloco: yup.object().shape({
		id: yup.string().required('Bloco é obrigatório!'),
	}),
});

const { blocos } = await useApiBlocosFindAll('');

const {
	resetForm,
	handleSubmit,
	values: formValues,
} = useForm({
	validationSchema: schema,
	initialValues: initialFormValues,
});

const onSubmit = handleSubmit(async ({ id, ...values }: any) => {
	if (id === null) {
		const { imagem, ...dados } = values;

		const ambienteCriado = await apiClient.ambientes.ambienteCreate({
			requestBody: dados,
		});

		await apiClient.ambientes.ambienteSetImagemCapa({
			id: ambienteCriado.id,
			formData: { file: imagem },
		});
	} else {
		const { imagem, ...dados } = values;

		const ambienteAlterado = await apiClient.ambientes.ambienteUpdate({
			id,
			...dados,
		});

		await apiClient.ambientes.ambienteSetImagemCapa({
			id: ambienteAlterado.id,
			formData: { file: imagem },
		});
	}

	resetForm();
	isActive.value = false;
	await queryClient.invalidateQueries({ queryKey: ['ambientes'] });
	window.location.reload();
});
</script>

<template>
	<v-dialog max-width="500" v-model="isActive">
		<template v-slot:activator="{ props: activatorProps }">
			<UIButtonAdd v-bind="activatorProps" />
		</template>

		<template v-slot:="{ isActive }">
			<v-card class="dialog-style">
				<v-form @submit.prevent="onSubmit" class="form">
					<div class="form-header">
						<h1 class="main-title">Cadastrar Novo Ambiente</h1>
					</div>

					<v-divider class="my-4" />

					<div class="form-body modal-form">
						<VVSelectImage name="imagem" />

						<VVTextField
							v-model="formValues.nome"
							type="text"
							label="Nome"
							placeholder="Digite aqui"
							name="nome"
						/>

						<VVTextField
							v-model="formValues.descricao"
							type="text"
							label="Descrição"
							placeholder="Digite aqui"
							name="descricao"
						/>

						<VVTextField
							v-model="formValues.codigo"
							type="text"
							label="Código"
							placeholder="Digite aqui"
							name="codigo"
						/>

						<VVTextField
							v-model="formValues.capacidade"
							type="number"
							label="Capacidade"
							placeholder="Digite aqui"
							name="capacidade"
						/>

						<VVTextField
							v-model="formValues.tipo"
							type="text"
							label="Tipo"
							placeholder="Digite aqui"
							name="tipo"
						/>

						<VVAutocomplete
							v-model="formValues.bloco.id"
							label="Bloco"
							placeholder="Selecione um bloco"
							name="bloco.id"
							:items="blocos"
							item-title="nome"
							item-value="id"
						/>
					</div>

					<v-divider />

					<div class="form-footer button-group">
						<UIButtonModalCancelButton
							@click="isActive.value = false"
						>
							<span>Cancelar</span>
						</UIButtonModalCancelButton>

						<UIButtonModalSaveButton>
							<span>Cadastrar</span>
						</UIButtonModalSaveButton>
					</div>
				</v-form>
			</v-card>
		</template>
	</v-dialog>
</template>

<style scoped>
.form {
	overflow: hidden;
}

.form-body {
	overflow: auto;
}

.modal-form {
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.main-title {
	font-size: 24px;
	font-weight: 700;
}

.dialog-style {
	border-radius: 14px !important;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border: solid 2px #9ab69e;
}

.form {
	display: flex;
	flex-direction: column;
	text-align: center;
	padding: 32px;
}

.button-group {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;

	margin-top: 20px;
	gap: 20px;
}

.button {
	font-weight: 700;
	margin-top: 20px;
	cursor: pointer;
	border: none;
}

.v-btn.buttonCancelar,
.v-btn.buttonCadastro {
	padding: 6px 20px;
	border-radius: 8px;
	height: auto;
	text-transform: none;
}

@media screen and (max-width: 450px) {
	.button-group {
		flex-direction: column;
		gap: 10px;
	}

	.v-btn.buttonCancelar,
	.v-btn.buttonCadastro {
		padding: 6px 20px;
	}
}
</style>
